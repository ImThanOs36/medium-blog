
import Dates from "../../ui/Dates"
import Author from "../Author"




interface BlogCardProps {
    id: number,
    author: string
    title: string,
    content: string,
    createAt: string,
    authorId: number

}


function BlogsCard({

    title,
    content,
    createAt,
    author,
    authorId



}: BlogCardProps) {
    return (



        <div className=" flex flex-col  w-full border-2 border-gray-200 p-4 rounded-md ">

            <div className="w-full flex flex-col gap-1 ">
                <div>
                <Author author={author} authorId={authorId} />
                </div>
                <hr />
                <h2 className="text-xl l capitalize font-extrabold font-satoshi">{title}</h2>
                <p className={`font-satoshi h-12 font-medium text-md text-gray-900 overflow-hidden w-full flex flex-wrap`}>{content.split('\n').map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}<span> ...</span></p>
            </div>
            <div className="flex  gap-2">

                <Dates date={createAt} />

            </div>
        </div>



    )
}

export default BlogsCard
