import { BACKEND_URL } from "../config"
import { Button } from "./Button"
import{ useNavigate } from "react-router-dom"

export const Users=({Initial,Name,Id})=>{
    const Naviagte = useNavigate()

return <div className="flex justify-between w-full items-baseline">
            <div className="space-x-2 flex">
                <div className="w-7 h-7 rounded-full bg-slate-500 text-center">
                    {Initial}
                </div>
                <div>{Name}</div>
            </div>
            <div>
                <Button onclick={()=>{
                    Naviagte(`${"/transfer?id="}${Id}${"&name="}${Name}`)
                }} text={"Send money"}/>
            </div>
        </div>
}