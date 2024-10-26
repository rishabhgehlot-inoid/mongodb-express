// controllers/contactUsController.js
const ContactUs = require("../models/ContactUs");

// Create a new Contact Message
module.exports.createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newMessage = new ContactUs({ name, email, subject, message });
    await newMessage.save();
    res
      .status(201)
      .json({ message: "Message submitted successfully", newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting message", error });
  }
};

// Get all Messages
module.exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactUs.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

// Get a Message by ID
module.exports.getMessageById = async (req, res) => {
  try {
    const message = await ContactUs.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching message", error });
  }
};

// Delete a Message
module.exports.deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await ContactUs.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting message", error });
  }
};
