import { Link } from "react-router-dom"
import Avatar from "../ui/Avatar"
import Tick from "../ui/Tick"

interface Author {
    author: string,
    authorId: number
}
function Author({ authorId, author }: Author) {
    return <div className="w-2/4">
        <Link
            to={`/user/${authorId}`} className="flex gap-2">

            <Avatar img={false} />


            <div>
                <div className=" font-semibold  font-satoshi flex items-center text-md">{author || "anyonumos"} <Tick /></div>

            </div>


        </Link>
    </div>

}

export default Author
