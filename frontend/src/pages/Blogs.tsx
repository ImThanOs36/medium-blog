
import BlogCard from "../components/BlogCard"
import Appbar from "../components/Appbar";
import Loader from "../ui/Loader";
import { useBlogs } from "../hooks/useBlogs";


function Blogs() {

  const { loading, blogs } = useBlogs();


  // console.log(blog)
  return (
    <>
      <div>
        <Appbar isThat={false}/>

        <div className="flex justify-center py-20 h-full ">
          {loading ? <Loader /> :
            <div className="w-full max-w-screen-md  ">
              <BlogCard
                key={blogs.id}
                id={blogs.id}
                author={blogs.author.name || "Anonymous"}
                title={blogs.title}
                content={blogs.content}
                createAt={blogs.createAt || "123"}
              />
            </div>
          }

        </div>
      </div>
    </>
  )
}

export default Blogs
