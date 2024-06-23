import Appbar from "../components/Appbar";
import { useQuery } from "@tanstack/react-query";
import fetchBlogs from "../hooks/useBlogs";
import CardSkeleton from "../components/BlogCards/CardSkeleton";
import BlogsCard from "../components/BlogCards/BlogsCard";
import { useState } from "react";





function Blogs() {
  const { data, isLoading } = useQuery({


    queryKey: ['Allblogs'],
    queryFn: fetchBlogs,

  })

  const [firstRow, setFirstRow] = useState([]);
  const [secondRow, setSecondRow] = useState([]);
  const [thirdRow, setThirdRow] = useState([]);

  async function setData() {
    const Row = await data;
    const n = data.length
    let equal = n / 3;

    setFirstRow(Row.slice(0, equal+1))
    setSecondRow(Row.slice(equal+1, ((equal*2))+2))
    setThirdRow(Row.slice((equal*2)+2))
  }
  setData()
  return (
    <div className="bg-black scroll-smooth md:bg-slate-300">
      <Appbar isThat={true} />
      {/* <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div> */}


      {isLoading ? <div className="flex flex-col gap-0"> <CardSkeleton type={'blogs'} /></div> : <div className="flex justify-center w-full ">

        <div className="   flex  md:max-w-6xl">

          <div >
            {firstRow.map((blog: {
              authorId: number; id: number; title: string; content: string; author: { name: string; }; createAt: string;
            }) => (
              <div className="flex flex-col justify-between gap-0 md:gap-10 p-4" key={blog.id}>



                <div className=" w-full min-w-80 max-w-80 overflow-hidden rounded-2xl hover:scale-[1.01] hover:shadow-lg transition-all ease-in-out duration-200 hover:shadow-gray-600 " >

                  <BlogsCard
                    key={blog.id}
                    title={blog.title}
                    content={blog.content}
                    id={blog.id}
                    author={blog.author.name || "anyonumos"}
                    createAt={blog.createAt}
                    authorId={blog.authorId}
                    disableLink={false}


                  />


                </div>

              </div>

            ))}
          </div>
          <div className="pt-4">
            <h1 className="font-clash_display text-center font-semibold text-lg" > BLOGIt Blogs</h1>
            {secondRow.map((blog: {
              authorId: number; id: number; title: string; content: string; author: { name: string; }; createAt: string;
            }) => (
              <div className="flex  justify-between gap-0 flex-col md:gap-10 p-4" key={blog.id}>


                <div className=" w-full min-w-80 overflow-hidden rounded-2xl hover:scale-[1.01] hover:shadow-lg transition-all ease-in-out duration-200 hover:shadow-gray-600 " >

                  <BlogsCard
                    key={blog.id}
                    title={blog.title}
                    content={blog.content}
                    id={blog.id}
                    author={blog.author.name || "anyonumos"}
                    createAt={blog.createAt}
                    authorId={blog.authorId}
                    disableLink={false}


                  />


                </div>

              </div>

            ))}

          </div>


          <div>

            {thirdRow.map((blog: {
              authorId: number; id: number; title: string; content: string; author: { name: string; }; createAt: string;
            }) => (
              <div className="flex justify-between gap-0 flex-col md:gap-10 p-4" key={blog.id}>



                <div className=" w-full min-w-80 max-w-80 overflow-hidden rounded-2xl hover:scale-[1.01] hover:shadow-lg transition-all ease-in-out duration-200 hover:shadow-gray-600 " >
                  <BlogsCard
                    key={blog.id}
                    title={blog.title}
                    content={blog.content}
                    id={blog.id}
                    author={blog.author.name || "anyonumos"}
                    createAt={blog.createAt}
                    authorId={blog.authorId}
                    disableLink={false}


                  />


                </div>

              </div>

            ))}

          </div>
          {/* <div className="fixed bottom-12 shadow-xl shadow-indigo-600 right-10 md:hidden font-bold text-white bg-indigo-500 p-5 rounded-full hover:scale-105">

            <Link to={"/publish"}>New</Link>
          </div> */}

        </div>
      </div>
      }
    </div >

  );
}

export default Blogs