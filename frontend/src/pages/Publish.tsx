import { blogInput } from "@imthanos/common-app"
import axios from "axios"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import Appbar from "../components/Appbar"

function Publish() {
  const [post, setPostInputs] = useState<blogInput>({
    title: '',
    content: '',
  })
  const Navigate = useNavigate()
  return (
    <div>
      <Appbar />
      <div className="pt-10 ">
        <form className="max-w-sm mx-auto flex flex-col gap-2">
          <input type="text" name="title" id="title" className="text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " onChange={(e) => {
            setPostInputs(c => ({
              ...c,
              title: e.target.value,
            }))
          }} />
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label>
          <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Leave a comment..." onChange={(e) => {
            setPostInputs(c => ({
              ...c,
              content: e.target.value
            }))
          }}></textarea>
          <button type="button" className="text-white bg-[#050708] hover:bg-[#050708]/90   font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center" onClick={() => {
            axios.post(`${BACKEND_URL}/api/v1/blog/blog`, post, {
              headers: {
                Authorization: localStorage.getItem("token"),
              },

            })
              .then(() => {
                Navigate("/blogs")
              })
          }}>Publish</button>
        </form>
      </div>
    </div>
  )
}

export default Publish