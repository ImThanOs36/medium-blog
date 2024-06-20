import Appbar from "../components/Appbar"


import fetchBlogs from "../hooks/useProfile"
import { useQuery } from "@tanstack/react-query";
import Dates from "../ui/Dates";
import { Link } from "react-router-dom";
import Loader from "../ui/Loader";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Avatar from "../ui/Avatar";

// import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState } from "react";



function Profile() {

    const { data, isLoading, status, error, refetch } = useQuery({

        queryKey: ['MyBlogs'],
        queryFn: fetchBlogs,



    })
    console.log(data, isLoading, status, "error" + error + " in profile route")
    console.log(data + "blogsss")


    async function changeStatus({ id, published }: { id: number, published: boolean }) {
        await axios.put(`${BACKEND_URL}/api/v1/blog/${id}`, { published }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(() => {
            refetch()
        })
        console.log(published, id + "in change Status Fn")

    }

    console.log("name:" + name)

    return <div>

        <Appbar isThat={true} />

        {isLoading ? <Loader /> : <div>


            <div className="my-10 flex justify-center  ">

                <div className="w-auto sm:w-auto  ">
                    <div className=" sticky top-[76px] p-2 bg-white border-b-4   w-full ">
                        <div className="flex items-center justify-center -z-10 ">

                            <h1 className=" text-xl font-clash_display font-semibold text-center">All blogs</h1>
                        </div>
                    </div>

                    {data?.map((blog) => (
                        <div className="" key={blog.id}>


                            <div className="font-clash_display  px-5 py-0  border-t-2 sm:min-w-96 sm:w-96 border-gray-200 h-36  max-h-36 sm:max-h-36 sm:min-h-36 oerflow-hidden" key={blog.id || 1}>
                                <button className="flex  font-satoshi text-xs gap-3 mt-3 hover:scale-105 border-blue-600" onClick={() => {

                                    changeStatus({ id: blog.id, published: blog.published });



                                }}>
                                    {blog.published ?
                                        <div className="flex gap-2 items-center bg-yellow-400 rounded-md px-1">
                                            <div className="rounded-full">

                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p><b>Published</b></p>
                                        </div>


                                        : <div className="flex gap-2 items-center bg-red-500 rounded-md px-1 text-white">
                                            <div className="bg-red-500 rounded-full">

                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                                </svg>
                                            </div>
                                            <p><b>Hidden</b></p>
                                        </div>
                                    }


                                </button>

                                <Link to={`/blog/${blog.id}`} >


                                    <div className="flex flex-col justify-between  gap-5  ">

                                        <div>

                                            <h2 className=" capitalize text-lg font-semibold">{blog.title || "title"}</h2>
                                            <p className={"font-satoshi text-xs font-medium text-gray-900 min-h-10 max-h-10 h-10 "}>{blog.content.slice(0, 100).split('\n').map((line, index) => (
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
                    <div className="h-[70vh] sticky top-28 p-5 bg-slate-100 rounded-lg w-60 border-x-2 gap-5">
                        <div className="flex items-center justify-center gap-4">

                            <Avatar img={false} />
                            {/* <p className="font-semibold text-lg font-clash_display">{name}</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </div>
}

export default Profile 
