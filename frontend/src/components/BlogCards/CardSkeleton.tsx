
function CardSkeleton({ type }: { type: string }) {
    return (
        <div className="flex justify-center">

            <div className="lg:w-2/4 flex flex-col items-baseline gap-12 sm:gap-12 h-full w-full  animate-pulse">
                {type === 'blogs' ? <div className="w-full  pt-7 sm:px-12 px-4 ">
                    <div className="h-40 bg-gray-200 rounded w-auto "></div>
                   
                </div> :
                    <div className="w-full">
                        <div className="h-5 bg-gray-200 rounded w-1/2 my-2"></div>
                        <hr />
                        <div className="h-14 bg-gray-200 rounded"></div>
                        <div className="h-5 bg-gray-200 rounded w-full my-2"></div>
                        <div className="h-5 bg-gray-200 rounded w-full my-2"></div>
                        <div className="h-5 bg-gray-200 rounded w-full my-2"></div>
                        <div className="h-5 bg-gray-200 rounded w-full my-2"></div>
                    </div>

                }

            </div>
        </div>
    )
}

export default CardSkeleton
