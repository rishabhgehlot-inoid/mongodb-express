// controllers/serviceController.js
const Service = require("../models/Services");

module.exports.createService = async (req, res) => {
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
    const newService = new Service({
      title,
      description,
      shortVideo,
      longVideo,
      images,
      category,
    });

    await newService.save();

    res
      .status(201)
      .json({ message: "Service created successfully", newService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating service", error });
  }
};

module.exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching services", error });
  }
};

module.exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching service", error });
  }
};

module.exports.updateService = async (req, res) => {
  try {
    const updatedData = req.body;

    if (req.files.shortVideo) {
      updatedData.shortVideo = req.files.shortVideo[0].path;
    }
    if (req.files.longVideo) {
      updatedData.longVideo = req.files.longVideo[0].path;
    }
    if (req.files.images) {
      updatedData.images = req.files.images.map((file) => file.path);
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res
      .status(200)
      .json({ message: "Service updated successfully", updatedService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating service", error });
  }
};

module.exports.deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting service", error });
  }
};
