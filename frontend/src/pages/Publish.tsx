import { blogInput } from "@imthanos/common-app";
import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useQuery } from "@tanstack/react-query";
import fetchBlogs from "../hooks/useBlog";
import Loader from "../ui/Loader";



function Publish() {
  const { id } = useParams<{ id: string }>();
  const isEdit = id !== undefined;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [post, setPostInputs] = useState<blogInput>({
    title: '',
    content: '',
  });

  const { data } = useQuery({
    queryKey: ['blog', Number(id)],
    queryFn: fetchBlogs,
    enabled: isEdit, // Only run this query if it's in edit mode
  });

  useEffect(() => {
    if (data && isEdit) {
      setPostInputs({
        title: data.title,
        content: data.content,
      });
    }
  }, [data, isEdit]);

  function checkInputs(post: any) {
    return post.title !== "" && post.content !== "";
  }

  const handleSubmit = async () => {
    if (checkInputs(post)) {
      setLoading(true);
      try {
        const url = isEdit
          ? `${BACKEND_URL}/api/v1/blog/${id}`
          : `${BACKEND_URL}/api/v1/blog/blog`;
        const method = isEdit ? 'put' : 'post';
        await axios({
          method,
          url,
          data: post,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        navigate(-1);
      } catch (error) {
        console.error("Error submitting the blog post", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Inputs are empty");
    }
  };

  return (
    <div className="min-h-screen">
      <Appbar isThat={false} />
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="w-full p-4 flex justify-center flex-col items-center gap-4">
        <div className="bg-white w-full max-w-2xl flex justify-center p-4 rounded-xl font-clash_display font-semibold">
          {isEdit ? "Edit Your Blog Here" : "Publish Your Blog Here"}
        </div>
        <form className="w-full max-w-2xl flex flex-col shadow-lg p-4 font-satoshi bg-white border-2 border-black rounded-2xl">
          <div>
            <textarea
              name="title"
              rows={0}
              id="title"
              className="w-full text-black text-2xl capitalize font-extrabold font-satoshi border-none outline-none resize-none p-2"
              placeholder="Enter title ..."
              value={post.title}
              onChange={(e) => setPostInputs({ ...post, title: e.target.value })}
            />
            <hr className="border-gray-300" />
          </div>
          <textarea
            id="message"
            rows={10}
            className="font-medium text-xl text-gray-900 font-satoshi border-none outline-none resize-none p-2"
            placeholder="Let's write what you feel ...."
            value={post.content}
            onChange={(e) => setPostInputs({ ...post, content: e.target.value })}
          />
          <button
            type="button"
            className="text-white bg-[#050708] hover:bg-[#050708]/90 max-w-25 font-medium rounded-lg text-base py-2 px-3 text-center flex justify-center"
            onClick={handleSubmit}
          >
            {loading ? (
              <Loader />
            ) : (
              "Publish"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Publish;
