const DesktopSlider = require("../models/DesktopSlider");

module.exports.createSliderImage = async (req, res) => {
  try {
    const image = req.file ? req.file.path.split("\\")[2] : null;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newSliderImage = new DesktopSlider({ image });
    await newSliderImage.save();

    res
      .status(201)
      .json({ message: "Slider image added successfully", newSliderImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding slider image", error });
  }
};

module.exports.getAllSliderImages = async (req, res) => {
  try {
    const images = await DesktopSlider.find();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching slider images", error });
  }
};

module.exports.getSliderImageById = async (req, res) => {
  try {
    const image = await DesktopSlider.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Slider image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching slider image", error });
  }
};

module.exports.updateSliderImage = async (req, res) => {
  try {
    const updatedData = req.file ? { image: req.file.path.split("\\")[2] } : {};
    const updatedSliderImage = await DesktopSlider.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedSliderImage) {
      return res.status(404).json({ message: "Slider image not found" });
    }

    res.status(200).json({
      message: "Slider image updated successfully",
      updatedSliderImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating slider image", error });
  }
};

module.exports.deleteSliderImage = async (req, res) => {
  try {
    const deletedSliderImage = await DesktopSlider.findByIdAndDelete(
      req.params.id
    );
    if (!deletedSliderImage) {
      return res.status(404).json({ message: "Slider image not found" });
    }

    res.status(200).json({ message: "Slider image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting slider image", error });
  }
};
