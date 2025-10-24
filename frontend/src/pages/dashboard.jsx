import { useEffect } from "react"
import { AppBar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { User } from "../components/User"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const Dashboard = ()=>{
    const [firstname,setName] = useState()
    const Navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token){
            Navigate("/signin")
        }
        async function get(){
            const response = await axios.get(`${BACKEND_URL}${"/api/v1/user/me"}`,
            {
                headers:{
                    "Authorization": `${"Bearer "}${localStorage.getItem("token")}`
                }
            })
        setName(response.data.firstname)
        }
    get()
    },[])
    return <div className="p-10">
        <AppBar name={firstname ? firstname : ""} />
        <div className="flex flex-col p-5 space-y-4">
            <Balance/>
            <User/>
        </div>
    </div>
}