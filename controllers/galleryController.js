const Gallery = require("../models/Gallery");

// Create a new gallery image
module.exports.createGalleryImage = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.path.split("\\")[2] : null;

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const newGalleryImage = new Gallery({ image, title, description });
    await newGalleryImage.save();

    res
      .status(201)
      .json({ message: "Gallery image added successfully", newGalleryImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding gallery image", error });
  }
};

// Get all gallery images
module.exports.getAllGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching gallery images", error });
  }
};

// Get a gallery image by ID
module.exports.getGalleryImageById = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Gallery image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching gallery image", error });
  }
};

// Update a gallery image by ID
module.exports.updateGalleryImage = async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
    };
    if (req.file) {
      updatedData.image = req.file.path.split("\\")[2];
    }

    const updatedGalleryImage = await Gallery.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updatedGalleryImage) {
      return res.status(404).json({ message: "Gallery image not found" });
    }

    res
      .status(200)
      .json({
        message: "Gallery image updated successfully",
        updatedGalleryImage,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating gallery image", error });
  }
};

// Delete a gallery image by ID
module.exports.deleteGalleryImage = async (req, res) => {
  try {
    const deletedGalleryImage = await Gallery.findByIdAndDelete(req.params.id);
    if (!deletedGalleryImage) {
      return res.status(404).json({ message: "Gallery image not found" });
    }

    res.status(200).json({ message: "Gallery image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting gallery image", error });
  }
};
