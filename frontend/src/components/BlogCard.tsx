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
        <div className="font-clash_display border-b-2  border-r-gray-950 px-5 py-2 w-full  min-h-60 sm:min-h-40 h-40" key={id}>
            <div className=" gap-3 sm:gap-6 justify-between flex flex-col-reverse sm:flex-row ">

                <div className="sm:w-3/4 flex flex-col items-baseline gap-16 sm:gap-12 h-full">
                    <div>


                        <h2 className="text-lg l capitalize font-extrabold font-satoshi">{title}</h2>
                        <p className={`font-satoshi font-medium text-xs text-gray-900 max-h-11 min-h-11 overflow-hidden `}>{content.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}</p>
                    </div>

                    <Dates date={createAt} />
                </div>
                <div className=" sm:w-1/4 w-3/4 ">
                    <span className="text-xs font-semibold ">Author</span>
                    <div className="flex sm:gap-3 gap-1  items-center">
                        <Avatar img={false} />
                        <div>
                            <div className="sm:font-medium font-medium font-satoshi">{author}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BlogCard