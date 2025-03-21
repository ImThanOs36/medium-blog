import Appbar from "../components/Appbar";
import { useQuery } from "@tanstack/react-query";
import fetchBlogs from "../hooks/useBlogs";
import CardSkeleton from "../components/BlogCards/CardSkeleton";
import BlogsCard from "../components/BlogCards/BlogsCard";
import { useEffect, useState } from "react";
import isLoggedIn from "../hooks/isLoggedIn";





function Blogs() {

  if (isLoggedIn()) {
    console.log("loggedIn")
  } else {
    console.log("logged Out")
  }
  const { data, isLoading } = useQuery({


    queryKey: ['Allblogs'],
    queryFn: fetchBlogs,

  })
  console.log("FROR ENV : " + import.meta.env.VITE_BACKEND_URL
  )
  const [firstRow, setFirstRow] = useState([]);
  const [secondRow, setSecondRow] = useState([]);


  useEffect(() => {
    if (data) {
      const n = data.length;
      const equal = Math.floor(n / 2);

      setFirstRow(data.slice(0, equal + 1));
      setSecondRow(data.slice(equal + 1));

    }
  }, [data]);


  return (
    <div className={`scroll-smooth `}>
      <Appbar isThat={true} />
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <div className="text-center font-satoshi text-2xl mt-10 font-semibold "><h1 className=" underline underline-offset-4">

        Story, Thoughts, Feelings Just BLOG It </h1></div>

      {isLoading ? <div className="flex flex-col gap-0"> <CardSkeleton type={'blogs'} /></div> : <div className="flex justify-center  px-2 py-8">

        <div className="flex flex-col md:flex-row justify-center gap-4  md:max-w-3xl max-w-lg w-full  ">

          <div className={`w-full md:w-1/2 flex flex-col gap-4 `}>
            {firstRow.map((blog: {
              updated: boolean;
              authorId: number; id: number; title: string; content: string; author: { name: string; }; createAt: string;
            }) => (


              <div key={blog.id} className="w-full overflow-hidden rounded-2xl hover:scale-[1.01] hover:shadow-lg transition-all ease-in-out duration-200 hover:shadow-gray-400" >

                <BlogsCard
                  key={blog.id}
                  title={blog.title}
                  content={blog.content}
                  id={blog.id}
                  author={blog.author.name || "anyonumos"}
                  createAt={blog.createAt}
                  authorId={blog.authorId}
                  disableLink={false}
                  updated={blog.updated}


                />

              </div>



            ))}
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            {secondRow.map((blog: {
              authorId: number; id: number; title: string; content: string; author: { name: string; }; createAt: string;
            }) => (


              <div key={blog.id} className="w-full overflow-hidden rounded-2xl hover:scale-[1.01] hover:shadow-lg transition-all ease-in-out duration-200 hover:shadow-gray-400" >

                <BlogsCard
                  key={blog.id}
                  title={blog.title}
                  content={blog.content}
                  id={blog.id}
                  author={blog.author.name || "anyonumos"}
                  createAt={blog.createAt}
                  authorId={blog.authorId}
                  disableLink={false}
                  updated={false}

                />

              </div>



            ))}
          </div>


        </div>
      </div>
      }
    </div >

  );
}

export default Blogs