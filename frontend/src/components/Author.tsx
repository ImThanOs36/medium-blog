import { useNavigate } from "react-router-dom"
import Avatar from "../ui/Avatar"
import Tick from "../ui/Tick"

interface Author {
    author: string,
    authorId: number
}

function Author({ authorId, author }: Author) {
    const navigate = useNavigate()
    return <button className="w-2/4 flex gap-2" onClick={() => {
        navigate(`/user/${authorId}`)
    }}>
        <Avatar img={false} />
        <div className=" font-semibold  font-satoshi flex items-center text-md">{author || "anyonumos"} <Tick /></div>
    </button>

}

export default Author
