import express from "express";
import { createWebinar, getAllWebinars, getWebinarById } from "../controllers/webinarController.js";

const router = express.Router();

// Create a webinar
router.route("/create").post(createWebinar);
// Get all webinars


router.route("/").get(getAllWebinars);
// Get a webinar by ID


router.route("/:id").post(getWebinarById);
export default router;
