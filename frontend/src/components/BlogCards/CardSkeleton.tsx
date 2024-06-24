
function CardSkeleton({ type }: { type: string }) {
    return (
        <div className="flex justify-center w-full z-30">

            {type === 'blogs' ? (<div className="w-full pt-7  px-4 flex flex-col gap-2 md:w-3/4 lg:w-2/4 animate-pulse md:overflow-hidden ">
                <div className="h-40 bg-gray-300 rounded-2xl w-auto  md:h-screen"></div>
                <div className="h-40 bg-gray-300 rounded-2xl w-auto md:hidden"></div>
                <div className="h-40 bg-gray-300 rounded-2xl w-auto md:hidden"></div>
                <div className="h-40 bg-gray-300 rounded-2xl w-auto md:hidden"></div>
                <div className="h-40 bg-gray-300 rounded-2xl w-auto md:hidden"></div>
                <div className="h-40 bg-gray-300 rounded-2xl w-auto md:hidden"></div>
                <div className="h-40 bg-gray-300 rounded-2xl w-auto md:hidden"></div>
                <div className="h-40 bg-gray-300 rounded-2xl w-auto md:hidden"></div>
                <div className="h-40 bg-gray-300 rounded-2xl w-auto md:hidden"></div>

            </div>) : <div className="w-full h-full px-1">
                <div className="h-[80vh] bg-gray-100 rounded-2xl  my-0 p-4 flex flex-col gap-1 animate-pulse">


                </div>

            </div>
            }


        </div>
    )
}

export default CardSkeleton
