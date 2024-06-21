import { Link } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useQuery } from "@tanstack/react-query";
import fetchBlogs from "../hooks/useBlogs";
import BlogCard from "../components/BlogCards/BlogsCard";

import CardSkeleton from "../components/BlogCards/CardSkeleton";




function Blogs() {
  const { data, isLoading } = useQuery({


    queryKey: ['Allblogs'],
    queryFn: fetchBlogs,

  })


  return (
    <div>
      <Appbar isThat={true} />
      <div className="fixed inset-0 -z-10 h-screen w-full bg-black [background:radial-gradient(125%_125%_at_50%_10%,#fff_50%,#7776B3_100%)]"></div>



      {isLoading ? <div className="flex flex-col gap-0"> <CardSkeleton type={"blogs"} /><CardSkeleton type={"blogs"} /><CardSkeleton type={"blogs"} /><CardSkeleton type={"blogs"} /><CardSkeleton type={"blogs"} /></div> : <div className="flex justify-center w-full ">

        <div className=" mt-4 md:max-w-2xl ">


          {data.map((blog: {
            authorId: number; id: number; title: string; content: string; author: { name: any; }; createAt: string;
          }) => (
            <div className="flex md:flex-row justify-between gap-0 flex-col-reverse md:gap-10 p-4" key={blog.id}>



              <div className="sm:min-w-80 w-full  sm:min-h-36 overflow-hidden" >
                <Link to={`/blog/${blog.id || 1}`}>
                  <BlogCard
                    key={blog.id}
                    title={blog.title}
                    content={blog.content}
                    id={blog.id}
                    author={blog.author.name || "anyonumos"}
                    createAt={blog.createAt}
                    authorId={blog.authorId}

                  />
                </Link>

              </div>

            </div>

          ))}


        </div>
      </div>
      }
    </div>

  );
}

export default Blogs