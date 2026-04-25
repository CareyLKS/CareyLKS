import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async(imageFile)=>{
    const formData= new FormData();
    formData.append('image', imageFile);
    try {
        const res = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMG, formData,{
            headers:{
                'Content-Type':'multipart/form-data',
            },
        });
        return res.data;
    } catch (err) {
        console.error('Error uploading image',err);
        throw err;
    }
};
export default uploadImage;