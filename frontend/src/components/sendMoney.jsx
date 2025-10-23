import { Heading } from "./heading"

export const SendMoney=({name})=>{
    return <div className="space-y-2 w-80">
        <div className="pb-20">
            <Heading label={"Send Money"}/>
        </div>
        <div className="flex space-x-2 items-center">
            <div className="w-10 h-10 rounded-full bg-green-600 flex justify-center items-center text-white text-xl">{name[0]}</div>
            <div className="font-bold text-xl">{name}</div>
        </div>
        <div>Amount (in Rs)</div>
        <input className="border border-gray-400 rounded p-2 w-full" placeholder="Enter Amount"/>
        <button className="bg-green-600 text-center rounded w-full h-10">Initiate transfer</button>
    </div>
}