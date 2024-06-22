import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState } from "react"

import DeletionSuccess from "./DeletionSuccess"


interface DeleteButtonProps {
    id: number
    refetch: VoidFunction
}

async function deletePost(id: number, refetch: VoidFunction) {
    await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${id}`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then((response) => {
        console.log(response.data)
        refetch();
    })
    console.log(id, refetch)

}
function DeleteButton({ id, refetch }: DeleteButtonProps) {
    const [showAlet, setShowAlert] = useState(false)
    const [showSucess, setShowSucess] = useState(false)
    console.log(showAlet)
    return (
        <>
            <button onClick={() => {
                setShowAlert(!showAlet)

            }} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

            </button>
            {showAlet ? <div className="h-screen w-screen fixed bottom-0 top-0 left-0 right-0 bg-black bg-opacity-40 flex justify-center items-center z-40 backdrop-blur-sm">
                <div className="flex flex-col rounded-2xl  text-lg bg-white font-clash_display justify-between w-3/4 p-4 w-2/4 h-48 lg:w-1/4">
                    <div className=" font-semibold">
                        Confirm Deletion
                        <hr />

                    </div>
                    <p className="font-satoshi">     Are you sure you want to delete this post?</p>
                    <div className="flex justify-end gap-4 font-satoshi"> <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded" onClick={() => {
                        setShowAlert(!showAlet)

                    }}>
                        Cancel
                    </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded" onClick={() => {
                            deletePost(id, refetch)
                            setShowAlert(!showAlet)
                            setShowSucess(!showSucess)
                        }}>
                            Delete
                        </button></div>

                </div>
            </div> : null}
            {showSucess ? <DeletionSuccess onclick={() => {
                setShowSucess(!showSucess)
            }} /> : null}


        </>
    )
}

export default DeleteButton
