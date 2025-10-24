import { useEffect, useRef, useState } from "react"
import { Button } from "./Button"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Users } from "./UserAll"

export const User=()=>{
    const [filter , setFilter] = useState("")
    const [User ,setusers] = useState([])


    useEffect(()=>{
        axios.get(`${BACKEND_URL}${"/api/v1/user/bulk?filter="}${filter}`,{
        }).then((res)=>{
            setusers(res.data.users)
        })
    },[filter])

    return <div className="space-y-2">
        <div>
            Users
        </div>
        <input className="border border-gray-500 rounded p-2 w-full" onChange={(e)=>{
            setFilter(e.target.value)
        }} placeholder="Search users..."/>
        <div className="flex-col">
                {User.map(user=><Users Initial={user.username[0]} Name={user.username} Id={user.userId}/>)}
        </div>
    </div>
}