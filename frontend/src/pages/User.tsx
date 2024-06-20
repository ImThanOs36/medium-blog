import Appbar from "../components/Appbar"


import fetchBlogs from "../hooks/useUser"
import { useQuery } from "@tanstack/react-query";
import Dates from "../ui/Dates";
import { Link, useParams } from "react-router-dom";
import Loader from "../ui/Loader";
import Avatar from "../ui/Avatar";
import { Key } from "react";

// import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState } from "react";



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

                <div className="w-auto sm:w-auto  ">
                    <div className=" sticky top-[76px] p-2 bg-white border-b-2   w-full ">
                        <div className="flex items-center justify-center -z-10 ">

                            <h1 className=" text-xl font-clash_display font-semibold text-center">All blogs</h1>
                        </div>
                    </div>

                    {data?.map((blog: { id: Key | null | undefined; title: any; content: string; createAt: any; }) => (
                        <div className="" key={blog.id}>


                            <div className="font-clash_display  px-5 py-0  border-b-2 sm:min-w-96 sm:w-96 border-gray-200 h-36  max-h-36 sm:max-h-36 sm:min-h-36 oerflow-hidden" key={blog.id || 1}>



                                <Link to={`/blog/${blog.id}`} >


                                    <div className="flex flex-col justify-between  gap-5  ">

                                        <div>

                                            <h2 className=" capitalize text-lg font-semibold">{blog.title || "title"}</h2>
                                            <p className={"font-satoshi text-xs font-medium text-gray-900 min-h-10 max-h-10 h-10 "}>{blog.content.slice(0, 100).split('\n').map((line: any, index: Key | null | undefined) => (
                                                <span key={index}>
                                                    {line || "content"}
                                                    <br />
                                                </span>
                                            ))} </p>
                                        </div>

                                        <Dates date={blog.createAt || "27-20-3"} />
                                    </div>



                                </Link>
                            </div>



                        </div>
                    ))}

                </div>
                <div className=" hidden md:block">
                    <div className="h-screen fixed  -z-10   p-5   w-80 border-x-2 gap-5 flex justify-center ">
                        <div className="flex items-center justify-center gap-4">

                            <Avatar img={false} />
                            <p className="font-semibold text-lg font-clash_display">author</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </div>
}

export default User 
