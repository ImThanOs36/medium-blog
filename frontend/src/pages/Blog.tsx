
import { useParams } from "react-router-dom"
import BlogCard from "../components/BlogCard"
import fetchBlogs from "../hooks/useBlog"
import Appbar from "../components/Appbar";
import Loader from "../ui/Loader";
import { useQuery } from "@tanstack/react-query";


function Blog() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['blog', Number(id)],
    queryFn: fetchBlogs,
    // refetchInterval: 1000
  })
  console.log(data, isLoading, error)

  return (
    <>
      <div >
        <Appbar isThat={true} />
        <div className="fixed inset-0 -z-10 h-full w-full bg-black [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7776B3_100%)]"></div>
        <div className="flex justify-center py-20 h-full ">

          {isLoading ? <Loader /> :
            <div className="w-full max-w-2xl  ">

              <BlogCard
                key={data.id}
                id={data.id}
                author={data.author.name || "Anonymous"}
                title={data.title}
                content={data.content}
                createAt={data.createAt || "123"}
              />
            </div>
          }

        </div>
      </div>
    </>
  )
}

export default Blog
