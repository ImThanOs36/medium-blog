import axios from "axios"
import { useEffect, useState } from "react"



async function like(id: string, type: string, onClick: VoidFunction) {
    console.log(type + "type")
    try {
        const res = type === 'update'
            ? await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/likes/${id}`, {}, {
                headers: { Authorization: localStorage.getItem('token') }
            })
            : await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/likes/${id}`, { id }, {
                headers: { Authorization: localStorage.getItem('token') }
            });
        onClick()
        return res;
    } catch (error) {
        console.error("Error liking the post:", error);
    }
}


function LikeButton({ id, count, onClick }: { id: number, count: number, onClick: VoidFunction }) {
    const [type, setType] = useState("")
    const [isLiked, setIsLicked] = useState(false)
    useEffect(() => {
        async function run() {
            setType(count ? 'update' : 'like');
            const isLikedFr = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/likes/${id}`, {}, {
                headers: { Authorization: localStorage.getItem('token') }
            })
            { isLikedFr.data.msg == "liked" ? setIsLicked(true) : setIsLicked(false) }

        }
        run()
    }, [count]);
    console.log(count)
    return (
        <button onClick={() => {
            {
                count < 0 ? console.log("already clicked")
                    :
                    like(String(id), type, onClick)

            }




        }} className="flex gap-2 items-center" >
            <svg xmlns="http://www.w3.org/2000/svg" fill={isLiked ? "#e11d48" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <div>
                <span className="text-lg">{count}</span>
            </div>

        </button>
    )
}

export default LikeButton