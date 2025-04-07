import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  description: String,
  image: String,
  resume: String,
});

const About = mongoose.model("About", aboutSchema);

export default About;
