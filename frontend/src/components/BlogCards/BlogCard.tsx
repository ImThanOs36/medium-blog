
import CommentButton from "../../ui/CommentButton"
import Dates from "../../ui/CreatedDate"
import LikeButton from "../../ui/LikeButton"
import Author from "../Author"




interface BlogCardProps {
    id: number
    author: string
    title: string,
    content: string,
    createAt: string,
    authorId: number,
    disableLink: boolean,
    updated: boolean,
    onClickComment: VoidFunction
    likes: number
    onClickLike: VoidFunction

}


function BlogCard({
    title,
    content,
    createAt,
    author,
    disableLink,
    updated,
    onClickComment,
    onClickLike,
    likes,
    id,


}: BlogCardProps) {


    return (

        <div className={`md:w-3/4 lg:w-2/4 h-min p-4 flex flex-col  gap-12 sm:gap-12 bg-[#F5F7F8] w-full border-2 border-gray-200  rounded-2xl shadow-md `}>

            <div className="w-full flex flex-col gap-1">
                <div className="flex justify-between ">

                    <Author author={author} disable={disableLink} />
                    {updated ? <div className="text-xs font-medium">Updated</div> : ""}
                </div>
                <hr className="border-gray-300 " />
                <h2 className="text-2xl  capitalize font-extrabold font-satoshi">{title}</h2>
                <p className={`font-satoshi font-medium text-md text-gray-900 overflow-hidden w-full`}>{content.split('\n').map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}</p>
            </div>
            <div className="flex justify-between items-center ">

                <Dates date={createAt} />
                <div className="flex gap-10 items-center ">

                    <LikeButton id={id} count={likes} onClick={onClickLike} />
                    <CommentButton onClick={onClickComment} />

                </div>


            </div>
        </div>



    )
}

export default BlogCard
