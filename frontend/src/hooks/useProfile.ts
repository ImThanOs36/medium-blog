import axios from "axios";
import { BACKEND_URL } from "../config";
interface Blog {
  author:{name:string},
  id: number;
  publishedDate: string;
  content: string;
  title: string;
  name: string;
  createAt: string;
  published: boolean;
}
async function fetchBlogs(): Promise<Blog[]> {
  const response = await axios.get(`${BACKEND_URL}/api/v1/blog/me`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return response.data.data;
}
export default fetchBlogs;
