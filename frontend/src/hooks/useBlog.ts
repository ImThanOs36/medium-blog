import axios from "axios";
import { BACKEND_URL } from "../config";

async function fetchBlogs({ queryKey }) {
  const [_, id] = queryKey;
  const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export default fetchBlogs;
