import Appbar from "../components/Appbar"


import fetchBlogs from "../hooks/useUser"

import { useParams } from "react-router-dom";
import Loader from "../ui/Loader";

import BlogsCard from "../components/BlogCards/BlogsCard";
import { useQuery } from "@tanstack/react-query";





function User() {
    const { id } = useParams()
    const { data, isLoading } = useQuery({

        queryKey: ['useBlogs', Number(id)],
        queryFn: fetchBlogs,



    })


    console.log(typeof (data))
    console.log(data)



    return <div>

        <Appbar isThat={true} />

        {isLoading ? <Loader /> : <div>


            <div className="mb-5 flex justify-center gap-10 ">

                <div className="w-full md:max-w-xl">
                    <div className=" sticky top-[76px] p-2 bg-white border-b-2   w-full ">
                        <div className="flex items-center justify-center -z-10 ">

                            <h1 className=" text-xl font-clash_display font-semibold text-center">All blogs</h1>
                        </div>
                    </div>


                    <div className=" w-full">


                        {data.map((blog: {
                            authorId: number; id: number; title: string; content: string; author: { name: any; }; createAt: string;
                        }) => (
                            <div className="flex md:flex-row justify-between gap-0 flex-col-reverse md:gap-10 p-4" key={blog.id}>



                                <div className="sm:min-w-80 w-full  sm:min-h-36 overflow-hidden" >

                                    <BlogsCard
                                        key={blog.id}
                                        title={blog.title}
                                        content={blog.content}
                                        id={blog.id}
                                        // author={blog.author.name || "anyonumos"}
                                        createAt={blog.createAt}
                                        authorId={blog.authorId}
                                        author="ThanOs"
                                    />


                                </div>

                            </div>

                        ))}


                    </div>

                </div>
            </div>
        </div>}
    </div>
}

export default User 
