import axios from "axios"
import { Dispatch, SetStateAction, useState } from "react"
import { BACKEND_URL } from "../config"


async function like(id: number, isClicked: boolean, setLikeCount: Dispatch<SetStateAction<number>>) {
    let like;
    if (isClicked) {
        like = false
    } else {
        like = true
    }
    const res = await axios.put(`${BACKEND_URL}/api/v1/blog/likes/${id}`, { like }, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
    setLikeCount(res.data.likes)

}

function LikeButton({ id, count, onClick }: { id: number, count: number, onClick: VoidFunction }) {
    const [isClicked, setIsclicked] = useState(false)
    const [likeCount, setLikeCount] = useState(count)
    return (
        <button onClick={() => {
            setIsclicked(!isClicked)
            like(id, isClicked, setLikeCount)
            onClick()

        }} className="flex gap-2 items-center" disabled={isClicked}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={isClicked ? "#e11d48" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <div>
                <span className="text-lg">{likeCount}</span>
            </div>

        </button>
    )
}

export default LikeButton
