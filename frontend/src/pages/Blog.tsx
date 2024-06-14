
import { useParams } from "react-router-dom"
import BlogCard from "../components/BlogCard"
import { useBlog } from "../hooks/useBlog"
import Appbar from "../components/Appbar";
import Loader from "../ui/Loader";


function Blog() {
  const { id } = useParams()
  const { loading, blog } = useBlog({ id: id || "1" });


  // console.log(blog)
  return (
    <>
      <div>
        <Appbar isThat={false}/>

        <div className="flex justify-center py-20 h-full ">
          {loading ? <Loader /> :
            <div className="w-full max-w-screen-md  ">
              <BlogCard
                key={blog.id}
                id={blog.id}
                author={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                createAt={blog.createAt || "123"}
              />
            </div>
          }

        </div>
      </div>
    </>
  )
}

export default Blog
