import { useNavigate } from "react-router-dom"
import Avatar from "../ui/Avatar"
import Tick from "../ui/Tick"
// import Tick from "../ui/Tick"

interface Author {
    author: string,
    disable:boolean,
}

function Author({ author ,disable}: Author) {
    const navigate = useNavigate()
    return <button className="w-auto sm:w-2/4 flex gap-2" disabled={disable} onClick={() => {
        navigate(`/blog/author/${author}`)
    }}>
        <Avatar img={false} />
        <div className=" font-semibold  font-satoshi flex items-center text-md">{author || "anyonumos"} <Tick/></div>
    </button>

}

export default Author
