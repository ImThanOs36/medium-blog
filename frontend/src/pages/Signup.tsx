import Auth from '../components/Auth'
import Quote from '../components/Quote'

function Signup() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className='flex items-center h-screen w-full justify-center text-xl'>
                <Auth type='signup' />
            </div>
            <Quote />
        </div>
    )
}

export default Signup
