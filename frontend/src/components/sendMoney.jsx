import axios from "axios"
import { Heading } from "./heading"
import { BACKEND_URL } from "../config"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"


export const SendMoney=({name,Id})=>{
    const AmountRef = useRef(null)
    const Navigate = useNavigate()
    async function Transfer(){
        const response = await axios.post(`${BACKEND_URL}${"/api/v1/account/transfer"}`,{
            to: Id,
            amount: Number(AmountRef.current?.value)
        },
        {
            headers:{
                "Authorization": `${"Bearer "}${localStorage.getItem("token")}`
            }
        }
    )
        alert(response.data.message)
        Navigate("/dashboard")
    }
    return <div className="space-y-2 w-80">
        <div className="pb-20">
            <Heading label={"Send Money"}/>
        </div>
        <div className="flex space-x-2 items-center">
            <div className="w-10 h-10 rounded-full bg-green-600 flex justify-center items-center text-white text-xl">{name[0]}</div>
            <div className="font-bold text-xl">{name}</div>
        </div>
        <div>Amount (in Rs)</div>
        <input ref={AmountRef} className="border border-gray-400 rounded p-2 w-full" placeholder="Enter Amount"/>
        <button onClick={Transfer} className="bg-green-600 text-center rounded w-full h-10">Initiate transfer</button>
    </div>
}