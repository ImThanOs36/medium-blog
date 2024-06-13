import { ChangeEvent, useState } from 'react'
import { signupInput } from '@imthanos/common-app'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'






function Auth({ type }: { type: "signup" | "signin" }) {
    const navigate = useNavigate()
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
        catch (e) {
            console.log(e)
        }


    }
    return (
        <div>
            <div className="max-w-sm mx-auto w-60 bg-slate-50 ">

                <div>
                    {type == 'signup' ? " Already have an account" : "dont have an account"}
                    <Link to={type === "signin" ? "/signup" : "/signin"}>
                        {type == 'signin' ? "signup" : "signin"}
                    </Link>
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


                {JSON.stringify(postInput)}

                <button type="submit" onClick={sendRequest} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
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
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
        <input onChange={onChange} type={type} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>

}



export default Auth
