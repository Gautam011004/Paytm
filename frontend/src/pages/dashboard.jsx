import { useEffect } from "react"
import { AppBar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { User } from "../components/User"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import axios from "axios"


export const Dashboard = ()=>{
    const [name,setName] = useState()
    useEffect(()=>{
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
        <AppBar name={name}></AppBar>
        <div className="flex flex-col p-5 space-y-4">
            <Balance/>
            <User/>
        </div>
    </div>
}