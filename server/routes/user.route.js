import express from "express"
import { login, logout, register, resetPassword } from "../controllers/user.controllers.js"

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/resetPassword").post(resetPassword)




export default router;