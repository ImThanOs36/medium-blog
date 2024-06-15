
import Avatar from "../ui/Avatar"
import Dates from "../ui/Dates"

interface BlogCardProps {
    id: number,
    author: string,
    title: string,
    content: string,
    createAt: string,
    line: boolean
}


function BlogCard({
    id,
    author,
    title,
    content,
    createAt,
    line


}: BlogCardProps) {



    return (
        <div className="font-clash_display border-b-2 border-gray-200 px-5 py-2 w-full " key={id}>
            <div className=" gap-3 sm:gap-5 justify-between flex flex-col-reverse sm:flex-row">

                <div className="w-3/4 flex flex-col gap-6 ">
                    <h2 className="text-2xl capitalize font-semibold">{title}</h2>
                    <p className={`font-satoshi font-medium text-gray-900 min-h-20 ${line ? "max-h-20 overflow-hidden" : ""}`}>{content.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}</p>

                    <Dates date={createAt} />
                </div>
                <div className=" sm:w-1/4 w-3/4 ">
                    <span className="text-xs font-semibold">Author</span>
                    <div className="flex sm:gap-3 gap-1  items-center">
                        <Avatar img={false} />
                        <div>
                            <div className="sm:font-semibold font-medium ">{author}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BlogCard