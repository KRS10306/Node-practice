const Image = require('../model/image-model')
const {uploadToCloudinary} = require('../helper/cloudinary-helper')
const fs = require('fs');

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

        //delete the file
        // fs.unlinkSync(req.file.path) //-->To delete image

        res.status(201).json({
            success: true,
            message:"Image uploaded successfully",
            image: newlyUploadedImage
        })

    } catch (err) {
        console.error(err);        
    }
}

const fetchImages = async (req,res) => {
    
    try {
        
        const images = await Image.find({})

        // console.log(images)

        if (images) {
            res.status(200).json({
                images
            })
        } else{
            res.status(400).json({
                message:"No images found",
                success:false
            })
        }

    } catch (err) {
        console.error(err);   
        res.status(500).json({
            message:"Internal server error"
        })     
    }

}

module.exports = {uploadImage, fetchImages}