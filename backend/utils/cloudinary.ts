import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    // console.log(localFilePath);

    if (!localFilePath) return null;

    const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",
      public_id: `assignments/${Date.now()}`,
      use_filename: false,
      unique_filename: true,
    });

    // console.log("Uploaded to Cloudinary!", uploadResponse.secure_url);

    if (fs.existsSync(localFilePath)) {
      // console.log("Deleting local file:", localFilePath);
      fs.unlinkSync(localFilePath);
    }

    return uploadResponse;
  } catch (error) {
    // console.error("Cloudinary upload error:", error);

    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

// deletes files from cloudinary after update
const deleteFromCloudinary = async (publicId: string) => {
  try {
    if (!publicId) return null;

    const deleteResponse = await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });

    // console.log("Deleted from Cloudinary:", deleteResponse);

    return deleteResponse;
  } catch (error) {
    console.error("Cloudinary delete error:", error);

    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
