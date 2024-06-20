function Avatar({ img }: { img: string | false }) {
    return (
        <div className="relative w-6 sm:w-10 h-6 sm:h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 -z-10">
            {img ? img :
                <svg className="absolute w-8 sm:w-12 h-8 sm:h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/200.svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd">
                    </path></svg>
            }
        </div>
    )
}

export default Avatar