const cloudinary = require('../config/cloudinary')


const uploadToCloudinary = async (filePath) => {
    try {
        
        const result = await cloudinary.uploader.upload(filePath)

        return {
            url: result.secure_url,
            publicId: result.public_id
        }

    } catch (err) {
        console.error(err);
        throw new Error('Some error occured')        
    }
}

module.exports = {
        uploadToCloudinary
}