const Image = require('../model/image-model')
const {uploadToCloudinary} = require('../helper/cloudinary-helper')

const uploadImage = async (req,res) => {
    try {
        
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file Uploaded"
            })
        }

        //upload to cloudinary
        // console.log(req.file)
        const {url, publicId} = await uploadToCloudinary(req.file.path)

        //store this in database
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.user.userId
        })

        await newlyUploadedImage.save()

        res.status(201).json({
            success: true,
            message:"Image uploaded successfully",
            image: newlyUploadedImage
        })

    } catch (err) {
        console.error(err);        
    }
}

module.exports = uploadImage