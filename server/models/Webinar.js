import mongoose from "mongoose";

const webinarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  meetingLink: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Webinar = mongoose.model("Webinar", webinarSchema);

export default Webinar;
