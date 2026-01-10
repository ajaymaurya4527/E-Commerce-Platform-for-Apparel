import { contactData } from "../controllers/contact.controllers.js";
import {Router} from "express";
import verifyJWT from "../middlewares/userAuth.middleware.js";

const contactRouter=Router();

contactRouter.route("/contact-us").post(verifyJWT,contactData)

export default contactRouter;