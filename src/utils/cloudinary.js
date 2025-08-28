import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });


    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if(!localFilePath) return null;

            // upload the file on cloudinary
            const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto",
            });
            // file has been uploaded sucessfully
            console.log("File uploaded successfully:", response.url);
            return response;
        } catch (error) {
            fs.unlinkSync(localFilePath); // delete the file if upload fails
            // console.error("Error uploading to Cloudinary:", error);
            // throw error;
            return null; // return null if upload fails
        }
    };


    export { uploadOnCloudinary };