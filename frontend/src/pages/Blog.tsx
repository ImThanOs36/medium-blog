
import { useParams } from "react-router-dom"
import BlogCard from "../components/BlogCards/BlogCard"
import fetchBlogs from "../hooks/useBlog"
import Appbar from "../components/Appbar";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../components/BlogCards/CardSkeleton";


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
        {/* <div className="fixed inset-0 -z-10 h-full w-full bg-black [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7776B3_100%)]"></div> */}
        <div className="flex justify-center p-4 h-full ">

          {isLoading ? <CardSkeleton type={'blog'} /> :
            <div className="w-full flex  justify-center ">

              <BlogCard

                key={data.id}
                id={data.id}
                title={data.title}
                content={data.content}
                createAt={data.createAt || "123"}
                author={data.author.name}
                authorId={data.authorId}
              />
            </div>
          }

        </div>
      </div>
    </>
  )
}

export default Blog
