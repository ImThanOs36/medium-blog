import { Link, useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard"
import { useBlogs } from "../hooks/useBlogs";
import Loader from "../ui/Loader";



function Blogs() {
  const { loading, blogs, authError } = useBlogs();
  const navigate = useNavigate()
  const reverseBlogs = [...blogs].reverse()
  console.log(reverseBlogs)
  if (authError) {
    navigate("/signin")
  }

  return (
    <div>
         <Appbar isThat={true} />
         <div className="fixed inset-0 -z-10 h-full w-full bg-black [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7776B3_100%)]"></div>
   


      {loading ? <Loader /> :
        <div className="flex justify-center py-20 h-full " onClick={() => {

        }}>
          <div className="w-auto max-w-4xl flex flex-col gap-10 ">


            {reverseBlogs.map(blog => (

              <Link to={`/blog/${blog.id}`} key={blog.id}>

                <BlogCard

                  key={blog.id}
                  id={blog.id}
                  author={blog.author.name || "anonymous"}
                  title={blog.title}
                  content={blog.content.slice(0, 200) + "..."}
                  createAt={blog.createAt || "123"}
                  line={true}

                />

              </Link>

            ))}
          </div>
        </div>
      }
    </div>

  );
}

export default Blogs