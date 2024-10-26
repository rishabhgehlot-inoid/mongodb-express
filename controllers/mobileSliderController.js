const MobileSlider = require("../models/MobileSlider");

module.exports.createMobileSliderImage = async (req, res) => {
  try {
    const image = req.file ? req.file.path.split("\\")[2] : null;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newSliderImage = new MobileSlider({ image });
    await newSliderImage.save();

    res
      .status(201)
      .json({
        message: "Mobile slider image added successfully",
        newSliderImage,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding mobile slider image", error });
  }
};

module.exports.getAllMobileSliderImages = async (req, res) => {
  try {
    const images = await MobileSlider.find();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching mobile slider images", error });
  }
};

module.exports.getMobileSliderImageById = async (req, res) => {
  try {
    const image = await MobileSlider.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Mobile slider image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching mobile slider image", error });
  }
};

module.exports.updateMobileSliderImage = async (req, res) => {
  try {
    const updatedData = req.file ? { image: req.file.path.split("\\")[2] } : {};
    const updatedSliderImage = await MobileSlider.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedSliderImage) {
      return res.status(404).json({ message: "Mobile slider image not found" });
    }

    res
      .status(200)
      .json({
        message: "Mobile slider image updated successfully",
        updatedSliderImage,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating mobile slider image", error });
  }
};

module.exports.deleteMobileSliderImage = async (req, res) => {
  try {
    const deletedSliderImage = await MobileSlider.findByIdAndDelete(
      req.params.id
    );
    if (!deletedSliderImage) {
      return res.status(404).json({ message: "Mobile slider image not found" });
    }

    res
      .status(200)
      .json({ message: "Mobile slider image deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting mobile slider image", error });
  }
};
