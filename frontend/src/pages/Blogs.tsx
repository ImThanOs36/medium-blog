
import Appbar from "../components/Appbar";
import { useQuery } from "@tanstack/react-query";
import fetchBlogs from "../hooks/useBlogs";
import CardSkeleton from "../components/BlogCards/CardSkeleton";
import BlogsCard from "../components/BlogCards/BlogsCard";




function Blogs() {
  const { data, isLoading } = useQuery({


    queryKey: ['Allblogs'],
    queryFn: fetchBlogs,

  })


  return (
    <div className="bg-black scroll-smooth ">
      <Appbar isThat={true} />
      {/* <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div> */}



      {isLoading ? <div className="flex flex-col gap-0"> <CardSkeleton type={'blogs'} /><CardSkeleton type={'blogs'} /><CardSkeleton type={'blogs'} /><CardSkeleton type={'blogs'} /><CardSkeleton type={'blogs'} /></div> : <div className="flex justify-center w-full ">

        <div className="  md:max-w-2xl ">


          {data.map((blog: {
            authorId: number; id: number; title: string; content: string; author: { name: any; }; createAt: string;
          }) => (
            <div className="flex md:flex-row justify-between gap-0 flex-col-reverse md:gap-10 p-4" key={blog.id}>



              <div className="sm:min-w-80 w-full  sm:min-h-36 overflow-hidden rounded-2xl hover:scale-[1.01] shadow-inner hover:shadow-sm transition-all ease-in-out duration-200 hover:shadow-indigo-600 " >

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
      </div>
      }
    </div>

  );
}

export default Blogs