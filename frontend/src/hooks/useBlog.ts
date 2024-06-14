import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Blog {
  id: number;
  publishedDate: string;
  content: string;
  title: string;
  author: {
    name: string;
  };
  createAt: string;
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>({
    id: 0,
    publishedDate: "",
    content: "",
    title: "",
    author: { name: "" },
    createAt: "",
  });
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("API Response:", response.data); // Log the response to check its structure
        const responseData = response.data;
        setBlog(responseData);
        setLoading(false);
      })
      
  }, [id]);

  return {
    loading,
    blog,
  };
};
