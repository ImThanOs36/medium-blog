import axios from "axios";
// import { BACKEND_URL } from "../config";
interface FetchBlogsParams {
  queryKey: [string, string];
}
async function fetchBlogs({ queryKey }: FetchBlogsParams) {
  const [_, username]: [string, string] = queryKey;
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/author/${username}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
  return response.data.data;
}

export default fetchBlogs;
