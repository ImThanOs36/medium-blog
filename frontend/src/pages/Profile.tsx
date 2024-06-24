import Appbar from "../components/Appbar"


import fetchBlogs from "../hooks/useProfile"
import { useQuery } from "@tanstack/react-query";


import axios from "axios";
import { BACKEND_URL } from "../config";

import CardSkeleton from "../components/BlogCards/CardSkeleton";
import ProfileBlogCard from "../components/BlogCards/ProfileBlogCard";
import { useEffect, useState } from "react";


function Profile() {

    const { data, isLoading, refetch, isSuccess } = useQuery({

        queryKey: ['MyBlogs'],
        queryFn: fetchBlogs,



    })
  

    const [updatingId, setUpdatingId] = useState<number | null>(null)
    const [username, setUsername] = useState("")

    useEffect(() => {
        if (isSuccess && data) {
            const name = data[0]?.author?.name || "Unknown";
            setUsername(name)
        }
    }, [isSuccess, data])


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

        {isLoading ? <div className="sm:min-w-80 w-full "> <CardSkeleton type={"blogs"} /> </div> : <div className="mb-5 flex justify-center p-4 ">


            <div className="flex flex-col items-center gap-2 md:max-w-2xl ">
                <div className=" sticky top-[76px] p-2 text-black border-b-2  z-40 w-full bg-white">
                    <div className="flex items-center justify-center -z-10 ">

                        <h1 className=" text-lg font-clash_display font-semibold text-center whitespace-pre">{username}'s Dashboard</h1>
                    </div>
                </div>

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
