import Appbar from "../components/Appbar"


import fetchBlogs from "../hooks/useProfile"
import { useQuery } from "@tanstack/react-query";


import axios from "axios";
import { BACKEND_URL } from "../config";

import CardSkeleton from "../components/BlogCards/CardSkeleton";
import ProfileBlogCard from "../components/BlogCards/ProfileBlogCard";
import { useEffect, useState } from "react";


function Profile() {

    const { data, isLoading, status, error, refetch, isSuccess } = useQuery({

        queryKey: ['MyBlogs'],
        queryFn: fetchBlogs,



    })
    console.log(data, isLoading, status, "error" + error + " in profile route")

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
        console.log(published, id + "in change Status Fn")
    }



    return <div className="scroll-smooth bg-black pb-6">

        <Appbar isThat={true} />
        {/* <div className="fixed top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div> */}

        {isLoading ? <div className="sm:min-w-80 w-full "> <CardSkeleton type={"blogs"} /> </div> : <div className="mb-5 flex justify-center p-4 ">


            <div className="flex flex-col items-center gap-2 md:max-w-2xl ">
                <div className=" sticky top-[76px] p-2 text-white border-b-2  z-40 w-full bg-black">
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
