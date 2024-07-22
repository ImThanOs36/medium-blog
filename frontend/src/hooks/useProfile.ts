import axios from "axios";
// import { BACKEND_URL } from "../config";

interface Blog {
  author: { name: string };
  id: number;
  publishedDate: string;
  content: string;
  title: string;
  name: string;
  createAt: string;
  published: boolean;
}
let userName: string = "My";
async function fetchBlogs(): Promise<Blog[]> {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/me`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  userName = response.data.name;
  console.log(userName, response.data)
  return response.data.data;
}

export { fetchBlogs, userName };
