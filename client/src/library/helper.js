import axios from "axios";

// default api request handler created with base url
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// convert title in Slug format
const titleToSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

export const getAuthHeader=()=>{
    const token=localStorage.getItem("admin_token");
    return{
        headers:{
            Authorization:`Bearer ${token}`,
        },
    };
};

export {apiClient,titleToSlug,getAuthHeader};