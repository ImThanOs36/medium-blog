
import { useParams } from "react-router-dom"
import BlogCard from "../components/BlogCard"
import { useBlog } from "../hooks/useBlog"


function Blog() {
  const { id } = useParams()
  const { loading, blog } = useBlog({ id: id || "1" });

  console.log(blog)
  if (loading) {
    return <div>
      loading
    </div>
  }
  return (
    <>
      <BlogCard
        key={blog.id}
        id={blog.id}
        author={blog.author.name || "Anonymous"}
        title={blog.title}
        content={blog.content}
        publishedDate={blog.publishedDate || "Unknown"}
      />
    </>
  )
}

export default Blog
