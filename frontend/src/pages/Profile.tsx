import Appbar from "../components/Appbar"


import fetchBlogs from "../hooks/useProfile"
import { useQuery } from "@tanstack/react-query";


import axios from "axios";
import { BACKEND_URL } from "../config";

import CardSkeleton from "../components/BlogCards/CardSkeleton";
import ProfileBlogCard from "../components/BlogCards/ProfileBlogCard";


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
        //   changeStatus({ id: blog.id, published: blog.published });
    }



    return <div>

        <Appbar isThat={true} />
        <div className="fixed top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

        {isLoading ? <div className="sm:min-w-80 w-full "> <CardSkeleton type={"blogs"} /> </div>: <div className="mb-5 flex justify-center p-4 ">


            <div className="flex flex-col items-center gap-2 ">

                {data?.map((blog) => (

                    <ProfileBlogCard key={blog.id} id={blog.id} title={blog.title} content={blog.content} published={blog.published} createAt={blog.createAt} onclick={() => {


                        changeStatus({ id: blog.id, published: blog.published });


                    }} />

                ))}
            </div>

        </div>
        }
    </div>


}
export default Profile 
