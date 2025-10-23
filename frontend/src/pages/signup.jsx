import { useRef } from "react"
import { Button } from "../components/Button"
import { ErrorButton } from "../components/ErrorButton"
import { Heading } from "../components/heading"
import { InputBox } from "../components/Inputbox"
import { Subheader } from "../components/Subhead"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const Signup = () =>{
    const usernameref = useRef(null)
    const firstnameref = useRef(null)
    const lastnameref = useRef(null)
    const passwordref = useRef(null)
    const Navigate = useNavigate()

    async function Signup(){
        const username = usernameref.current?.value
        const firstname = firstnameref.current?.value
        const lastname = lastnameref.current?.value
        const password = passwordref.current?.value
        const response = await axios.post(`${BACKEND_URL}${"/api/v1/user/signup"}`,{
            username,
            firstname,
            lastname,
            password
        })
        localStorage.setItem("token", response.data.token)
        Navigate("/dashboard")
    }
    return <div className="h-screen flex justify-center bg-gray-500">
        <div className="flex flex-col justify-center">
            <div className="h-max bg-white rounded-md p-10">
                <Heading label={"Sign up"}></Heading>
                <Subheader text={"Enter your information to create an account"}></Subheader>
                <InputBox reference={usernameref} title={"Username"} placeholder={"Jhon"}></InputBox>
                <InputBox reference={firstnameref} title={"Firstname"} placeholder={"Doe"}></InputBox>
                <InputBox reference={lastnameref} title={"Lastname"} placeholder={"Jhonedoe@gmail.com"}></InputBox>
                <InputBox reference={passwordref} title={"Password"} placeholder={""}></InputBox>
                <Button onclick={Signup} text={"Sign up"}></Button>
                <ErrorButton what={"Already have an account?"} whereText={"Sign in"} where={"/signin"}></ErrorButton>
            </div>    
        </div>
    </div>
}