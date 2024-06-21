
import { Link } from "react-router-dom"
import Dates from "../../ui/Dates"
import StatusTag from "../../ui/StatusTag"
import { useState } from "react"





interface BlogCardProps {

    id: number
    title: string,
    content: string,
    createAt: string,
    authorId?: number
    published: boolean
    onclick: VoidFunction,
    updatingId:number | null

}




function ProfileBlogCard({
    title,
    content,
    createAt,
    published,
    onclick,
    id,
    updatingId,


}: BlogCardProps) {
   
   
    return (

        <div className="w-full   p-4 flex flex-col   bg-white  border-2 border-gray-200  rounded-2xl">


            <div className="font-clash_display  py-0  border-b-2  border-gray-200 h-36  oerflow-hidden" >

                <button className="flex font-satoshi text-xs gap-3 mt-3 border-blue-600"  onClick={onclick} onClickCapture={()=>{
                  
                }} >


                    <StatusTag published={published} />
                    
                  <span className="font-semibold bg-gray-50 border-2  border-gray-200 px-1.5 py-0.5 rounded-md hover:border-gray-300"> {updatingId == id ? "wait" :( published ? <p>Change To <span className="text-red-600">Hidden </span></p>: <p>Change To <span className="text-yellow-500">Publish </span></p>)}</span>

                </button>
                <hr />
                <Link to={`/blog/${id}`} >
                    <h2 className="text-2xl l capitalize font-extrabold font-satoshi">{title}</h2>
                    <p className={`font-satoshi h-12 font-medium text-md text-gray-900 overflow-hidden w-full flex flex-wrap`}>{content.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}<span> ...</span></p>
                </Link>

            </div>
            <div className="flex  gap-2">

                <Dates date={createAt} />

            </div>

        </div >



    )
}

export default ProfileBlogCard
