import { blogInput } from "@imthanos/common-app";
import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useQuery } from "@tanstack/react-query";
import fetchBlogs from "../hooks/useBlog";



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
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin fill-purple-800"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
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
