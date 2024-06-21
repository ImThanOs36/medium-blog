
import { Link } from "react-router-dom"
import Dates from "../../ui/Dates"
import StatusTag from "../../ui/StatusTag"





interface BlogCardProps {

    id: number
    title: string,
    content: string,
    createAt: string,
    authorId?: number
    published: boolean
    onclick: VoidFunction

}




function ProfileBlogCard({
    title,
    content,
    createAt,
    published,
    onclick,
    id


}: BlogCardProps) {
    return (

        <div className="w-full md:max-w-xl  p-4 flex flex-col   bg-white lg:w-2/4 border-2 border-gray-200  rounded-2xl">


            <div className="font-clash_display  py-0  border-b-2  border-gray-200 h-36  oerflow-hidden" >

                <button className="flex  font-satoshi text-xs gap-3 mt-3 hover:scale-105 border-blue-600" onClick={onclick} >


                    <StatusTag published={published} />

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
