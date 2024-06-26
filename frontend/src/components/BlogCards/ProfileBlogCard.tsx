
import { Link, useNavigate } from "react-router-dom"
import Dates from "../../ui/CreatedDate"
import StatusTag from "../../ui/StatusTag"
import DeleteButton from "../../ui/DeleteButton"
import EditButton from "../../ui/EditButton"






interface BlogCardProps {

    id: number
    title: string,
    content: string,
    createAt: string,
    authorId?: number
    published: boolean
    onclick: VoidFunction,
    updatingId: number | null
    refetch: VoidFunction

}




function ProfileBlogCard({
    title,
    content,
    createAt,
    published,
    onclick,
    id,
    updatingId,
    refetch



}: BlogCardProps) {
    const navigate = useNavigate()

    return (

        <div className="w-full   p-4 flex flex-col   bg-[#F9F9F9]  border-2 border-gray-200  rounded-2xl">


            <div className="font-clash_display  py-0  border-b-2  border-gray-200 h-36  oerflow-hidden" >

                <div className="flex font-satoshi text-xs  justify-between items-center border-blue-600" >
                    <div className="flex gap-2 items-center p-2">



                        <StatusTag published={published} />

                        <button className="font-semibold bg-gray-50 border-2 flex items-center border-gray-200 h-6 p-2 rounded-md hover:border-gray-300" onClick={onclick} > {updatingId == id ? "wait" : (published ? <p>Change To <span className="text-red-600">Hidden </span></p> : <p>Change To <span className="text-yellow-500">Publish </span></p>)}</button>

                    </div>
                    <div className="flex gap-2">
                        <EditButton onclick={() => navigate(`/publish/${id}`)}>
        
                        </EditButton>

                        <DeleteButton id={id} refetch={refetch} />
                    </div>
                </div>

                <hr />
                <Link to={`/blog/${id}`} >
                    <h2 className="text-2xl l capitalize font-extrabold font-satoshi max-h-9 overflow-hidden">{title}</h2>
                    <p className={` font-satoshi h-12 font-medium text-md text-gray-900 overflow-hidden sm:max-w-md md:max-w-lg flex flex-wrap`}>{content.split('\n').map((line, index) => (
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
