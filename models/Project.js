const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortVideo: {
      type: String,
      default: null,
    },
    longVideo: {
      type: String,
      default: null,
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Project", ProjectSchema);
