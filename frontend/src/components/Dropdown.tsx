import { useNavigate } from "react-router-dom";
import Avatar from "../ui/Avatar"
import { useState } from "react";

function Dropdown() {
  const navigate = useNavigate()
  const [isOpen, setOpen] = useState(false)
  function handleclick() {
    setOpen(!isOpen)
  }
  return (
    <>
      <div className="relative flex justify-center flex-col">


        <button type="button" onClick={handleclick}><Avatar img={false} /></button>

        {!isOpen ? null : <div id="dropdown" className="z-10 absolute top-16 -right-14   bg-black divide-y divide-gray-100 rounded-lg shadow px-1 w-40 text-center">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li className="cursor-pointer" onClick={() => {
              localStorage.removeItem('token');
              navigate("/signin")
            }}>
              LOGOUT
            </li>
          </ul>
        </div>
        }
      </div>
    </>
  )
}

export default Dropdown