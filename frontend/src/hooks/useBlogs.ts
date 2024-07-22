import axios from "axios";




async function fetchBlogs() {
 
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`, {
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
  return response.data.blogs;
}

export default fetchBlogs;
