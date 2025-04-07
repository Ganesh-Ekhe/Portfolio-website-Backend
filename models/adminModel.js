import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  profileImage: { type: String, default: "" },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
