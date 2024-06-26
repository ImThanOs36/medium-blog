import Appbar from "../components/Appbar"


import { fetchBlogs, userName } from "../hooks/useProfile"
import { useQuery } from "@tanstack/react-query";


import axios from "axios";
import { BACKEND_URL } from "../config";

import CardSkeleton from "../components/BlogCards/CardSkeleton";
import ProfileBlogCard from "../components/BlogCards/ProfileBlogCard";
import { useState } from "react";
import { Link } from "react-router-dom";


function Profile() {

    const { data, isLoading, refetch} = useQuery({

        queryKey: ['MyBlogs'],
        queryFn: fetchBlogs,



    })


    const [updatingId, setUpdatingId] = useState<number | null>(null)





    async function changeStatus({ id, published }: { id: number, published: boolean }) {
        setUpdatingId(id)
        try {

            await axios.put(`${BACKEND_URL}/api/v1/blog/${id}`, { published }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }

            })
            await refetch()

        } catch (error) {

            console.log(error)
        } finally {

            setUpdatingId(null)

        }

    }



    return <div className="scroll-smooth  pb-6">

        <Appbar isThat={true} />
        <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className=" sticky top-[76px] p-2 text-black border-b-2  z-40 w-full bg-white">
            <div className="flex items-center justify-center flex-col -z-10 ">

                <h1 className=" text-lg font-clash_display font-semibold text-center whitespace-pre">{isLoading ? "My" : userName}'s Dashboard</h1>
                <span className="font-satoshi font-medium">Total Blgs :{data?.length}</span>
            </div>
        </div>

        {isLoading ? <div className="sm:min-w-80 w-full "> <CardSkeleton type={"blogs"} /> </div> : <div className="mb-5 flex justify-center p-4 ">


            <div className="flex flex-col items-center gap-2 md:max-w-2xl ">
                {data?.length === 0 ? <div className="flex flex-col gap-2 text-center text-xl font-medium">

                    <span className="font-satoshi ">It Looks Like You Dont Any Blog ,</span>  <span className="font-satoshi  ">Dont Worry You Can Write One,  <Link className="underline text-indigo-600" to={"/publish"}>Here</Link></span>  </div> : ""}


                {data?.map((blog) => (

                    <ProfileBlogCard updatingId={updatingId} key={blog.id} id={blog.id} title={blog.title} content={blog.content} published={blog.published} createAt={blog.createAt} refetch={refetch} onclick={() => {

                        changeStatus({ id: blog.id, published: blog.published });


                    }} />

                ))}

            </div>

        </div>
        }
    </div>


}
export default Profile 
