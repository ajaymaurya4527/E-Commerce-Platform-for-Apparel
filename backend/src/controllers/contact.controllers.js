import { asyncHandler } from "../utils/asyncHandler.js"
import { Contact } from "../models/contact.model.js"

const contactData = asyncHandler(async (req, res) => {

    try {
        const { fullName, email, phone, message } = req.body

        if ([fullName, email, phone, message].some((field) => field?.trim() === "")) {
            return res.json({ success: false, message: "All Fields are required" })
        }

        const contact=await Contact.create({
            fullName,
            email,
            Phone_no:phone,
            message
        })

        if(!contact){
            return res.json({success:false,messages:"some thing went wrong while creating contact"})
        }

        return res.json({success:true,messages:"Your Request Submited We will Contact You soon"})

        


    } catch (error) {
        console.log(error.message)


    }

})

export {contactData};