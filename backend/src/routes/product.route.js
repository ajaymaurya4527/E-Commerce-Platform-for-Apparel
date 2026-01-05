import {Router} from "express";
import { addProduct, listProduct, removeProduct, singleProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";
import addminAuth from "../middlewares/adminAuth.middleware.js";

const productRouter=Router();

productRouter.route("/add").post(addminAuth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct)
productRouter.route("/list").get(listProduct)
productRouter.route("/remove").post(addminAuth,removeProduct)
productRouter.route("/single").post(singleProduct)


export default productRouter;