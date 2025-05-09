import Message from "../models/messageModel.js"

export const sendMessage = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        res.status(201).json({ message: "Message saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save message." });
    }
};


