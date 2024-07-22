
import { useParams } from "react-router-dom"
import BlogCard from "../components/BlogCards/BlogCard"
import fetchBlogs from "../hooks/useBlog"
import Appbar from "../components/Appbar";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../components/BlogCards/CardSkeleton";
import { useEffect, useState } from "react";
import Comment from "../ui/Comment";
import axios from "axios";
import CloseButton from "../ui/CloseButton";
import Loader from "../ui/Loader";



function Blog() {
  const { id } = useParams();
  const blogId = Number(id)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['blog', Number(id)],
    queryFn: fetchBlogs,

  })

  const [isComments, setIsComments] = useState(false)
  const [comments, setComments] = useState([])
  const [Loading, setLoading] = useState(false)
  const [comment, setComment] = useState("")

  useEffect(() => {
    getComments(id)
  }, [])

  async function getComments(id?: string) {
    console.log("reached Function")
    console.log(Loading)
    setLoading(true)
    const blogs = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/comment/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    const response = await blogs.data.comments;
    console.log(response)
    setComments(response)

    setLoading(false)
    console.log(Loading)
  }
  async function putComments(id: string, comment: string) {
    if (comment === "") {
      alert("inputs are empty")
      return false
    }
    console.log("reached Function")
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/comment/${id}`, { comment }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })

    getComments(id)
  }

  return (
    <>
      <div >
        <Appbar isThat={true} />
        <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        <div className="h-full">
          {isError ? (
            <div>Error</div>
          ) : (
            <div className="flex justify-center p-4 w-full ">
              {isLoading ? (
                <div className="w-full  md:w-3/4 lg:w-2/4 ">
                  <CardSkeleton type={'blog'} />
                </div>
              ) : (
                <div className="w-full flex justify-center  gap-2 ">

                  <BlogCard
                    key={data.id}
                    id={data.id}
                    title={data.title}
                    content={data.content}
                    createAt={data.createAt || "123"}
                    author={data.author.name}
                    authorId={data.authorId}
                    disableLink={false}
                    updated={data.updated}
                    onClickComment={() => {
                      setIsComments(!isComments)
                      getComments(String(blogId))
                    }}
                    count={data.count}
                    onClickLike={() => {
                      refetch();
                    }}
                  />
                  {<div className={`p-4  ${isComments ? "block" : "hidden"} md:block md:max-w-72  md:relative fixed bottom-0 w-screen h-[70vh]  bg-gray-50 rounded-xl shadow-sm shadow-gray-600 md:h-auto`}>
                    <div className="w-full flex justify-center">

                      <span className=" font-clash_display font-semibold">  Comments</span>


                      <div className="absolute right-4">

                        <CloseButton onClick={() => setIsComments(!isComments)} />
                      </div>
                    </div>
                    <hr />


                    <div className="flex flex-col items-start font-satoshi gap-2">
                      <div className="pt-2 rounded-xl w-full flex flex-col gap-2 items-end h-full">
                        <textarea className="w-full outline-none  rounded-md border-2 p-2 bg-transparent overflow-auto " rows={2} onChange={(e) => {
                          setComment(e.target.value)
                        }} />
                        <button type="submit" className=" bg-[#745ec5]  text-white px-2 rounded-md " onClick={() => {
                          putComments(String(id), comment)
                        }}>Comment</button>
                      </div>
                      {Loading ? <div className="w-full h-full flex items-center justify-center"><Loader /></div> :
                        <div className="flex flex-col gap-2"> {comments.map((comment: {
                          author: any;
                          id: number; title: string; content: string;
                        }) => (


                          <div key={comment.id} className="w-full " >

                            <Comment
                              key={comment.id}
                              name={comment.author.name}

                              content={comment.content}



                            />

                          </div>



                        ))}</div>
                      }

                    </div>
                  </div>

                  }
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default Blog

