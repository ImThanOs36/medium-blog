
import { useParams } from "react-router-dom"
import BlogCard from "../components/BlogCards/BlogCard"
import fetchBlogs from "../hooks/useBlog"
import Appbar from "../components/Appbar";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../components/BlogCards/CardSkeleton";


function Blog() {
  const { id } = useParams();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['blog', Number(id)],
    queryFn: fetchBlogs,

  })
  console.log(data, isLoading, error)

  return (
    <>
      <div className=" min-h-screen ">
        <Appbar isThat={true} />
        <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="h-full">
          {isError ? (
            <div>Error</div>
          ) : (
            <div className="flex justify-center p-4 w-full ">
              {isLoading ? (
                <div className="w-full  md:w-3/4 lg:w-2/4 ">
                  <CardSkeleton type={'blog'} />
                </div>
              ) : (
                <div className="w-full flex justify-center  ">
                  <BlogCard
                    key={data.id}
                    id={data.id}
                    title={data.title}
                    content={data.content}
                    createAt={data.createAt || "123"}
                    author={data.author.name}
                    authorId={data.authorId}
                    disableLink={false}
                    updated={data.updated}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default Blog

