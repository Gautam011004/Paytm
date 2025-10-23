import { useSearchParams } from "react-router-dom"
import { SendMoney } from "../components/sendMoney"

export const Transfer = ()=>{
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const name = searchParams.get("name")
    return <div className="h-screen flex justify-center bg-gray-200">
        <div className="flex flex-col justify-center">
            <div className="bg-white p-10 rounded shadow-md">
                <SendMoney name={name}></SendMoney>
            </div>
        </div>
    </div>
}