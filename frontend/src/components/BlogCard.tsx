
import { Link } from "react-router-dom"
import Dates from "../ui/Dates"
import Avatar from "../ui/Avatar"

interface BlogCardProps {
    id: number,
    author: string
    title: string,
    content: string,
    createAt: string,
    authorId?: number

}


function BlogCard({
    id,
    title,
    content,
    createAt,
    author,
    authorId



}: BlogCardProps) {



    return (
        <div className="font-clash_display border-b-2  border-r-gray-950 md:px-5 md:py-2     sm:min-h-40 h-40 w-full" key={id}>


            <div className="sm:w-3/4 flex flex-col items-baseline gap-12 sm:gap-12 h-full w-full">

                <div className="w-full">

                    <Link
                        to={`/user/${authorId}`}>
                        <div className="flex sm:gap-3 gap-1  items-center">
                            <Avatar img={false} />


                            <div>
                                <div className="sm:font-medium font-medium font-satoshi flex items-center text-xs">{author || "anyonumos"}<span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 rounded-full">
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
                    </Link>
                    <h2 className="text-lg l capitalize font-extrabold font-satoshi">{title}</h2>
                    <p className={`font-satoshi font-medium text-xs text-gray-900 max-h-6 min-h-6 overflow-hidden w-full`}>{content.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}</p>
                </div>
                <div>

                    <span className="inline-flex items-center gap-x-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">Badge</span>
                    <span className="inline-flex items-center gap-x-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">Badge</span>
                    <Dates date={createAt} />
                </div>
            </div>


        </div >
    )
}

export default BlogCard