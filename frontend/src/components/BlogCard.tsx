import Avatar from "../ui/Avatar"
import Dates from "../ui/Dates"

interface BlogCardProps {
    id: number,
    author: string,
    title: string,
    content: string,
    createAt: string,
}


function BlogCard({
    id,
    author,
    title,
    content,
    createAt,


}: BlogCardProps) {
    return (
        <div className="font-clash_display border-b-2 border-gray-200 p-2 w-full" key={id}>
            <div className=" gap-5 justify-between flex flex-col-reverse sm:flex-row">

                <div className="w-3/4 flex flex-col gap-6 ">
                    <h2 className="text-2xl capitalize font-semibold">{title}</h2>
                    <p className="font-satoshi font-medium text-gray-900 ">{content}</p>

                    <Dates date={createAt} />
                </div>
                <div className=" sm:w-1/4 w-2/4">
                    <span className="text-xs font-semibold">Author</span>
                    <div className="flex gap-3">
                        <Avatar img={false} />
                        <div>
                            <div>{author}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard