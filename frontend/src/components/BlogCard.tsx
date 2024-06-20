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
                            <div className="sm:font-medium font-medium font-satoshi flex items-center text-xs">{author}<span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 rounded-full">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 20 20">
                                    <path fill="yellow" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z" />
                                    <path fill="black" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z" />
                                </svg>
                                <span className="sr-only">Icon description</span>
                            </span></div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BlogCard