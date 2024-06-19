import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

function Dropdown() {
  const navigate = useNavigate()
  const [isOpen, setOpen] = useState(false)
  function handleclick() {
    setOpen(!isOpen)
  }
  return (
    <>
      <div className="relative flex justify-center flex-col ">


        <button type="button" onClick={handleclick}> <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full  dark:bg-gray-600 hover:scale-105">

          <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/200.svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd">
            </path></svg>

        </div></button>
        <div className="transition-all">


          {!isOpen ? null : <div id="dropdown" className="z-10 absolute top-16 -right-0 lg:-right-14   bg-black divide-y divide-gray-100 rounded-lg shadow  w-40 text-center">
            <ul className="py-2 px-2 text-base  text-gray-700 dark:text-gray-200 font-satoshi  " aria-labelledby="dropdownDefaultButton ">
              <li className="cursor-pointer hover:bg-indigo-500 rounded-lg p-2 hover:font-medium" onClick={() => {
                localStorage.removeItem('token');
                navigate("/signin")
              }}>
                Log Out
              </li>
              <li className="hover:bg-indigo-500 rounded-lg p-2 hover:font-medium">
                <Link to={"/profile"}>Profile</Link>
              </li>
            </ul>
          </div>
          }
        </div>
      </div>
    </>
  )
}

export default Dropdown