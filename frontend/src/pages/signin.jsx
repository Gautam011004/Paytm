import { useRef } from "react"
import { Button } from "../components/Button"
import { ErrorButton } from "../components/ErrorButton"
import { Heading } from "../components/heading"
import { InputBox } from "../components/Inputbox"
import { Subheader } from "../components/Subhead"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom" 

export const Signin = ()=>{
    const usernameref = useRef(null)
    const passwordref = useRef(null)
    const Navigate = useNavigate()

    async function Signin(){
        const username = usernameref.current?.value
        const password = passwordref.current?.value
        const response = await axios.post(`${BACKEND_URL}${"/api/v1/user/signin"}`,{
            username,
            password
        })
        localStorage.setItem("token",response.data.token)
        Navigate("/dashboard")
    }
    return <div className="h-screen flex justify-center bg-gray-500">
        <div className="flex flex-col justify-center">
            <div className="bg-white p-10 rounded-md">
                <Heading label={"Sign in"}></Heading>
                <Subheader text={"Enter your credentials to access your account"}></Subheader>
                <InputBox reference={usernameref} title={"Username"} placeholder={""}></InputBox>
                <InputBox reference={passwordref} title={"Password"} placeholder={""}></InputBox>
                <Button onclick={Signin} text={"Sign in"}/>
                <ErrorButton what={"Don't have an account?"} whereText={"Sign up"} where={"/signup"}></ErrorButton>
            </div>
        </div>
    </div>
}