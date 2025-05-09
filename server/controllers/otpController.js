import Otp from "../models/otp.models.js";

// helper to generate numeric OTP
function generateOtp(length = 6) {
  return Math.floor(100000 + Math.random() * 900000).toString().substring(0, length);
}

// Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email is required (email or phone)"
      });
    }

    const otpCode = generateOtp();
    await Otp.create({ email, otp: otpCode });

    // Simulate sending OTP via console
    console.log(`OTP for ${email}: ${otpCode}`);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP"
    });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "email and OTP are required"
      });
    }

    const record = await Otp.findOne({ email, otp });
    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP"
      });
    }

    // Delete OTP after successful verification
    await Otp.deleteOne({ _id: record._id });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP"
    });
  }
};
