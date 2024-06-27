import { useNavigate } from "react-router-dom"
import Avatar from "../ui/Avatar"


interface Author {
    author: string,
    disable:boolean,
}

function Author({ author ,disable}: Author) {
    const navigate = useNavigate()
    return <button className="w-auto  flex gap-2" disabled={disable} onClick={() => {
        navigate(`/blog/author/${author}`)
    }}>
        <Avatar img={false} />
        <div className=" font-semibold  font-satoshi flex items-center text-md">{author || "anyonumos"}</div>
    </button>

}

export default Author
