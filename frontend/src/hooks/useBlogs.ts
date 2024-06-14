import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Blogs {
  publishedDate: string;
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
  createAt: string;
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [authError, setauthError] = useState(false);
  const [blogs, setBlogs] = useState<Blogs[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("API Response:", response.data); // Log the response to check its structure
        const responseData = response.data;
        setBlogs(responseData.blogs);
        setLoading(false);
      })
      .catch((e) => {
        if (e.response.status == 401) {
          setauthError(true);
        }
      });
  }, []);
  
  return {
    loading,
    blogs,
    authError,
  };
};
