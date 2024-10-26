const Blog = require("../models/Blog");

module.exports.createBlog = async (req, res) => {
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
    const newBlog = new Blog({
      title,
      description,
      shortVideo,
      longVideo,
      images,
      category,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating blog", error });
  }
};

module.exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

module.exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

module.exports.updateBlog = async (req, res) => {
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

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating blog", error });
  }
};

module.exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting blog", error });
  }
};
