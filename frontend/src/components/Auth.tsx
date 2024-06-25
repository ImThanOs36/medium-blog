import { ChangeEvent, useState } from 'react'
import { signupInput } from '@imthanos/common-app'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'






function Auth({ type }: { type: "signup" | "signin" }) {
    const navigate = useNavigate()
    const [isError, setisError] = useState()
    const [postInput, setPostInputs] = useState<signupInput>({
        name: '',
        email: '',
        password: '',

    })
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == 'signup' ? 'signup' : 'signin'}`, postInput);
            const token = response.data.token;
            localStorage.setItem('token', "Bareer " + token);
            navigate("/blogs")
        }
        catch (e: any) {

            setisError(e.response.data.message)
        }


    }
    return (
        <div className='font-satoshi'>
            <div className='flex flex-col items-center pb-12 '>
               <span> For Testing <Link className='underline' to={"/signin"}> Signin</Link></span>
               <span> Email: testing@gmail.com</span>
               <span> Password: password</span>
            </div>
            <div className="mx-auto border bg-gray-50 px-4 py-4 rounded-md flex flex-col  ">
                <div className='text-base text-red-600 text-center font-bold' >
                    {isError ? <p>Login or Password Invalid</p> : ""}
                </div>


                {type === 'signup' ? <LabelInput label='Name' placeholder='ThanOs' onChange={(e) => {
                    setPostInputs(c => ({
                        ...c,
                        name: e.target.value
                    }))

                }} /> : null}
                <LabelInput label='Email' placeholder='Me@gmail.com' type='email' onChange={(e) => {
                    setPostInputs(c => ({
                        ...c,
                        email: e.target.value
                    }))

                }} />
                <LabelInput label='Password' placeholder='password' type='password' onChange={(e) => {
                    setPostInputs(c => ({
                        ...c,
                        password: e.target.value
                    }))

                }} />
                <button type="submit" onClick={sendRequest} className="text-center text-white bg-black font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 capitalize">{type}</button>
                <div>
                    <p className='text-base pb-1 text-center'> {type == 'signup' ? " Already have an account ," : "dont have an account, "}
                        <Link to={type === "signin" ? "/signup" : "/signin"}>
                            <b className='capitalize'>{type == 'signin' ? "signup" : "signin"}</b>
                        </Link>
                    </p>
                </div>

            </div>

        </div>
    )
}
interface LabelInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function LabelInput({ label, placeholder, onChange, type }: LabelInputType) {
    return <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-base font-semibold text-gray-900 ">{label}</label>
        <input onChange={onChange} type={type} id={label} className=" border border-gray-300 text-gray-900 text-base font-bold rounded-lg  focus:ring-black focus:border-neutral-950 block w-full sm:min-w-80  py-2 px-3 " placeholder={placeholder} required />
    </div>

}



export default Auth
