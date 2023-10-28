"use strict";

const { hash } = require("bcrypt");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 100 },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  next();
});

userSchema.pre("updateOne", async function (next) {
  const password = this.getUpdate()["$set"].password;
  if (password !== undefined) {
    this.getUpdate()["$set"].password = await hash(password, 10);
  }
  next();
});

module.exports = model("user", userSchema);
