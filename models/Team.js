const { Schema, model } = require("mongoose");

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    joining_date: {
      type: String,
      default: null,
    },
    profile_photo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    linkedIn: {
      type: String,
      default: null,
    },
    twitter: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Team", TeamSchema);
