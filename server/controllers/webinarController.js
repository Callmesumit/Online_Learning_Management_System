import Webinar from "../models/Webinar.js";

// Create a new Webinar
export const createWebinar = async (req, res) => {
  try {
    const { title, description, date, time, teacherName, meetingLink } = req.body;

    const newWebinar = new Webinar({
      title,
      description,
      date,
      time,
      teacherName,
      meetingLink,
    });

    await newWebinar.save();
    res.status(201).json({ message: "Webinar created successfully", webinar: newWebinar });
  } catch (error) {
    res.status(500).json({ message: "Error creating webinar", error: error.message });
  }
};

// Get all Webinars
// Get all Webinars
export const getAllWebinars = async (req, res) => {
    try {
      const webinars = await Webinar.find().sort({ date: 1 });
  -    res.status(200).json(webinars);
  +    res.status(200).json({ webinars }); // ✅ Wrap inside object
    } catch (error) {
      res.status(500).json({ message: "Error fetching webinars", error: error.message });
    }
  };

// Get single Webinar by ID
export const getWebinarById = async (req, res) => {
  try {
    const webinar = await Webinar.findById(req.params.id);
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }
    res.status(200).json(webinar);
  } catch (error) {
    res.status(500).json({ message: "Error fetching webinar", error: error.message });
  }
};
