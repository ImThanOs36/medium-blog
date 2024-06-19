import axios from "axios";
import { BACKEND_URL } from "../config";



async function fetchBlogs() {
 
  const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
  return response.data.blogs;
}

export default fetchBlogs;
