
import Dates from "../../ui/Dates"
import Author from "../Author"




interface BlogCardProps {
    id?:number
    author: string
    title: string,
    content: string,
    createAt: string,
    authorId: number

}


function BlogCard({
    title,
    content,
    createAt,
    author,
    authorId



}: BlogCardProps) {
    return (



        <div className="md:w-3/4 lg:w-2/4  p-4 flex flex-col  gap-12 sm:gap-12 h-full w-full border-2 border-gray-200  rounded-md">

            <div className="w-full flex flex-col gap-1">

                <Author author={author} authorId={authorId} />
                <hr />
                <h2 className="text-2xl l capitalize font-extrabold font-satoshi">{title}</h2>
                <p className={`font-satoshi font-medium text-md text-gray-900 overflow-hidden w-full`}>{content.split('\n').map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}</p>
            </div>
            <div className="flex  gap-2">

                <Dates date={createAt} />

            </div>
        </div>



    )
}

export default BlogCard
