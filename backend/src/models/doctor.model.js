import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const doctorschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    speciality: {
      type: String,
      required: true,
    },

    degree: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      required: true,
    },

    avaliable: {
      type: Boolean,
      default: true,
    },

    fees: {
      type: Number,
      required: true,
    },

    address: {
      type: Object,
      default: {
        line1: "",
        line2: "",
      },
    },

    date: {
      type: Number,
      required: true,
    },

    slots_booked: {
      type: Object,
      default: {},
    },
  },
  { minimized: false }
);

doctorschema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

doctorschema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Doctor = mongoose.model("doctors", doctorschema);

export { Doctor };
