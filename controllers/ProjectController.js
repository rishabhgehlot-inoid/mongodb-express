const Project = require("../models/Project");

// Create a new Project
module.exports.createProject = async (req, res) => {
  const { title, description, category } = req.body;
  const shortVideo = req.files.shortVideo
    ? req.files.shortVideo[0].path.split("\\")[2]
    : null;
  const longVideo = req.files.longVideo
    ? req.files.longVideo[0].path.split("\\")[2]
    : null;
  const images = req.files.images
    ? req.files.images.map((file) => file.path.split("\\")[2])
    : [];

  try {
    const newProject = new Project({
      title,
      description,
      shortVideo,
      longVideo,
      images,
      category,
    });

    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully", newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating project", error });
  }
};

// Get all Projects
module.exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

// Get a Project by ID
module.exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching project", error });
  }
};

// Update a Project
module.exports.updateProject = async (req, res) => {
  try {
    const updatedData = req.body;

    if (req.files.shortVideo) {
      updatedData.shortVideo = req.files.shortVideo[0].path.split("\\")[2];
    }
    if (req.files.longVideo) {
      updatedData.longVideo = req.files.longVideo[0].path.split("\\")[2];
    }
    if (req.files.images) {
      updatedData.images = req.files.images.map(
        (file) => file.path.split("\\")[2]
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res
      .status(200)
      .json({ message: "Project updated successfully", updatedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating project", error });
  }
};

// Delete a Project
module.exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting project", error });
  }
};
