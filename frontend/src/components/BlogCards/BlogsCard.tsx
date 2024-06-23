
import { Link } from "react-router-dom"
import Dates from "../../ui/Dates"
import Author from "../Author"




interface BlogCardProps {
    id: number,
    author:string,
    title: string,
    content: string,
    createAt: string,
    authorId: number,
    disableLink:boolean

}


function BlogsCard({

    title,
    content,
    createAt,
    author,
    id,
    disableLink
    


}: BlogCardProps) {
    return (



        <div className=" flex flex-col  w-full border-2 bg-white border-gray-200 p-4 rounded-2xl">

            <div className="w-full flex flex-col gap-1 ">
                <div>
                    <Author author={author} disable={disableLink} />

                </div>
                <hr />
                <Link to={`/blog/${id}`}>
                    <h2 className="text-xl l capitalize font-extrabold font-satoshi">{title}</h2>
                    <p className={`font-satoshi  font-medium text-md text-gray-900 overflow-hidden w-full flex flex-wrap`}>{content.split('\n').map((line, index) => (
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
        </div>



    )
}

export default BlogsCard
