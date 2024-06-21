import Appbar from "../components/Appbar"
import fetchBlogs from "../hooks/useUser"
import { useParams } from "react-router-dom";
import BlogsCard from "../components/BlogCards/BlogsCard";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../components/BlogCards/CardSkeleton";





function User() {
    const { username } = useParams()
    const { data, isLoading } = useQuery({

        queryKey: ['useBlogs', String(username)],
        queryFn: fetchBlogs,



    })


    console.log(typeof (data))
    console.log(data)



    return <div className="bg-black min-h-screen">

        <Appbar isThat={true} />

        {isLoading ? <CardSkeleton type={'blogs'} /> : <div>


            <div className="mb-5 flex justify-center gap-10 ">

                <div className="w-full md:max-w-xl">
                    <div className=" sticky top-[76px] p-2 text-white border-b-2   w-full ">
                        <div className="flex items-center justify-center -z-10 ">

                            <h1 className=" text-lg font-clash_display font-semibold text-center whitespace-pre">@{username}  on BLOGIt</h1>
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
                                        author={blog.author.name}
                                        createAt={blog.createAt}
                                        authorId={blog.authorId}
                                        disableLink={true}
                                
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
