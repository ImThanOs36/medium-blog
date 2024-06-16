import { Link } from "react-router-dom"
import Dropdown from "./Dropdown"

interface isThatType {
    isThat: boolean;
  }

function Appbar({ isThat }: isThatType) {
    return (
        <div>

            <nav className="backdrop-blur-xl bg-black/90  fixed top-0 left-0 right-0 border-b-4 border-indigo-500 z-10 ">
                <div className="max-w-screen-xl flex flex-wrap items-center  mx-auto p-4 justify-around sm:justify-between">
                    <Link to={"/"}> <h1 className="font-clash_display text-3xl font-bold text-white">  BLOG  It</h1></Link>

                    <div className="flex items-center gap-5 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {isThat ? <nav>

                            <div className="font-bold text-white bg-indigo-500 px-5 py-2 rounded-full hover:scale-105">

                                <Link to={"/publish"}>New</Link>
                            </div>

                        </nav>
                            : null

                        }

                        <Dropdown />




                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Appbar