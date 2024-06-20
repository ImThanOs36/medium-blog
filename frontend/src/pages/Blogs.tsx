import { Link } from "react-router-dom";
import Appbar from "../components/Appbar";

import Loader from "../ui/Loader";
import { useQuery } from "@tanstack/react-query";
import fetchBlogs from "../hooks/useBlogs";
import BlogCard from "../components/BlogCard";




function Blogs() {
  const { data, isLoading } = useQuery({


    queryKey: ['Allblogs'],
    queryFn: fetchBlogs,

  })


  return (
    <div>
      <Appbar isThat={true} />
      {/* <div className="fixed inset-0 -z-10 h-screen w-full bg-black [background:radial-gradient(125%_125%_at_50%_10%,#fff_50%,#7776B3_100%)]"></div> */}



      {isLoading ? <Loader /> :
        <div className="flex justify-center sm:py-20 h-full ">
          <div className="w-auto max-w-2xl flex flex-col mt-6 ">


            {data.map((blog: { id: number; title: string; content: string; author: { name: any; }; createAt: string; }) => (

              <Link to={`/blog/${blog.id || 1}`} key={blog.id || 1}>
                <BlogCard
                  key={blog.id}
                  title={blog.title}
                  content={blog.content}
                  id={blog.id}
                  author={blog.author.name || "anyonumos"}
                  createAt={blog.createAt}


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