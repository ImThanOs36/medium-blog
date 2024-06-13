import { Link, useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard"
import { useBlogs } from "../hooks/useBlogs";

function Blogs() {
  const { loading, blogs } = useBlogs();
  const navigate = useNavigate()
  if (loading) {
    return <div>  <Appbar />Loading...</div>;
  }

  return (
    <div>

      <Appbar />
      <div className="flex justify-center py-7" onClick={() => {

      }}>
        <div className="w-2/4 flex flex-col gap-10">

        
        {blogs.map(blog => (

          <Link to={`/blog/${blog.id}`}>

            <BlogCard

              key={blog.id}
              id={blog.id}
              author={blog.author.name || "anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.publishedDate || "123"}

            />

          </Link>

        ))}
        </div>
      </div>
    </div>

  );



}

export default Blogs