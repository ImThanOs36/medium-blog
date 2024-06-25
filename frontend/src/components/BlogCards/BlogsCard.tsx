
import { Link } from "react-router-dom"
import Dates from "../../ui/Dates"
import Author from "../Author"




interface BlogCardProps {
    id: number,
    author: string,
    title: string,
    content: string,
    createAt: string,
    authorId: number,
    disableLink: boolean,
    updated: boolean


}


function BlogsCard({

    title,
    content,
    createAt,
    author,
    id,
    disableLink,
    updated




}: BlogCardProps) {
    const accentColors = [
        'bg-[#F5F7F8]',
        'bg-purple-100',
        'bg-indigo-100',
        'bg-violet-100',
        'bg-pink-100',
        'bg-violet-100',
        'bg-[#FFEFEF]'


    ];
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const DivBgColor = accentColors[getRandomInt(accentColors.length)]

    return (



        <div className={` w-full flex flex-col  ${DivBgColor} border-2  border-gray-200 p-4 rounded-2xl `}>

            <div className="w-full flex flex-col gap-1 text-ellipsis  ">
                <div className="flex justify-between">
                    <Author author={author} disable={disableLink} />
                    {updated ? <div className="text-xs font-medium">Updated</div> : ""}
                </div>
                <hr className="border-gray-300 " />
                <Link to={`/blog/${id}`}>
                    <h2 className="text-xl  capitalize font-extrabold font-satoshi">{title}</h2>
                    <div className="overflow-hidden max-h-36">

                        <p className={`font-satoshi  font-medium text-md text-gray-900  w-full flex flex-wrap`}>{content.split('\n').map((line, index) => (
                            <p key={index}>
                                {line}
                                <br />
                            </p>
                        ))}<span> ...</span></p>
                    </div>
                </Link>
            </div>
            <div className="flex  pt-2">

                <Dates date={createAt} />

            </div>
        </div>



    )
}

export default BlogsCard