const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: String,
    username: String,
    email: {
      type: String,
      require: true,
    },
    phone: String,
    aviator: String,
    password: {
      type: String,
      require: true,
    },
    token: String,
    verification_code: String,
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // enum should be an array
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
