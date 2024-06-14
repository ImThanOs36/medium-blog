import { blogInput } from "@imthanos/common-app"
import axios from "axios"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import Appbar from "../components/Appbar"


function Publish() {
  const [loading, setLoading]= useState(false)
  const [post, setPostInputs] = useState<blogInput>({
    title: '',
    content: '',
  })
  function checkInputs(post: any) {

    if (post.title === "" || post.content == "") {
      return false
    } else {
      return true
    }
  }
  const Navigate = useNavigate()
  return (
    <div>
      <Appbar isThat={false} />
      <div className="pt-40 p-3">
        <form className="max-w-sm mx-auto flex flex-col  gap-2">
          <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-900">Title</label>
          <input type="text" name="title" id="title" className="text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Enter title ..." onChange={(e) => {
            setPostInputs(c => ({
              ...c,
              title: e.target.value,
            }))
          }} />
          <label htmlFor="message" className="block mb-2 text-sm font-semibold text-gray-900 ">Your message</label>
          <textarea id="message" rows={7} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Lets write what you feel ...." onChange={(e) => {
            setPostInputs(c => ({
              ...c,
              content: e.target.value
            }))
          }}></textarea>



          <button type="button" className="text-white bg-[#050708] hover:bg-[#050708]/90  max-w-25 font-medium rounded-lg text-sm  py-2 px-3 text-center flex justify-center " onClick={() => {
            
            if (checkInputs(post)) {
              setLoading(true)
              axios.post(`${BACKEND_URL}/api/v1/blog/blog`, post, {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
                

              }
              
            )
                .then(() => {
                  Navigate("/blogs")
                  setLoading(false)
                })
            } else {
              alert("inputs are empty")
            }

          }}>{loading? <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin  fill-purple-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            <span className="sr-only">Loading...</span>
          </div>: "Publish"}</button>

        </form>
      </div>
    </div>
  )
}

export default Publish