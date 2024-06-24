
import Dates from "../../ui/Dates"
import Author from "../Author"




interface BlogCardProps {
    id?:number
    author: string
    title: string,
    content: string,
    createAt: string,
    authorId: number,
    disableLink:boolean
    updated:boolean

}


function BlogCard({
    title,
    content,
    createAt,
    author,
    disableLink,
    updated
   



}: BlogCardProps) {
    const accentColors = [
        'bg-[#F5F7F8]',
        'bg-purple-100',
        'bg-indigo-100',
        'bg-blue-100',
        'bg-green-100',
      
    ];
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const DivBgColor = accentColors[getRandomInt(accentColors.length)]
    return (

        <div className={`md:w-3/4 lg:w-2/4  p-4 flex flex-col  gap-12 sm:gap-12 ${DivBgColor} w-full border-2 border-gray-200  rounded-2xl shadow-md `}>

            <div className="w-full flex flex-col gap-1">
                <div className="flex justify-between ">

                <Author author={author} disable={disableLink} />
                {updated ? <div className="text-xs font-medium">Updated</div> : ""}
                </div>
                <hr className="border-gray-300 "/>
                <h2 className="text-2xl l capitalize font-extrabold font-satoshi">{title}</h2>
                <p className={`indent-2 font-satoshi font-medium text-md text-gray-900 overflow-hidden w-full`}>{content.split('\n').map((line, index) => (
                    <p key={index}>
                        {line}
                        <br />
                    </p>
                ))}</p>
            </div>
            <div className="flex  gap-2">

                <Dates date={createAt} />

            </div>
        </div>



    )
}

export default BlogCard
