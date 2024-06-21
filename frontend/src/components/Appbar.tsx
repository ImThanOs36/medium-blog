import { Link } from "react-router-dom"
import Dropdown from "./Dropdown"

interface isThatType {
    isThat: boolean;
}

function Appbar({ isThat }: isThatType) {
    return (
        <div className="sticky top-0  z-10">

            <nav className="backdrop-blur-xl  bg-black border-b-4 border-indigo-600 ">
                <div className="max-w-screen-xl flex flex-wrap items-center gap-5 sm:gap-0 mx-auto p-4 justify-between sm:justify-between">
                    <Link to={"/"}> <h1 className="font-clash_display text-3xl font-bold text-white">  BLOG  It</h1></Link>

                    <div className="flex items-center sm:gap-5 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {isThat ? <nav>

                            <div className="font-bold text-white bg-indigo-500 px-5 py-2 rounded-full hover:scale-105">

                                <Link to={"/publish"}>New</Link>
                            </div>

                        </nav>
                            : null

                        }
                        <div>
                            <Dropdown />

                        </div>




                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Appbar