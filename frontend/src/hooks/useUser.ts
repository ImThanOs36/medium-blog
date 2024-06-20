import axios from "axios";
import { BACKEND_URL } from "../config";
interface FetchBlogsParams {
  queryKey: [string, number];
}
async function fetchBlogs({ queryKey }: FetchBlogsParams) {
  const [_, id]: [string, number] = queryKey;
  const response = await axios.get(`${BACKEND_URL}/api/v1/blog/user/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
  return response.data.data;
}

export default fetchBlogs;
