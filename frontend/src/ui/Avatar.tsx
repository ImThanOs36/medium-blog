import image from '../assets/Avatar_svg.svg'

function Avatar({ img }: { img: string | false }) {
    return (
        <div className="relative w-6  h-6  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
            {img ? img :
                <img src={image} alt='avatar'/>
            }
        </div>
    )
}

export default Avatar