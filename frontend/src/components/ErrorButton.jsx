import { Link } from "react-router-dom"

export const ErrorButton=({what,whereText,where})=>{
    return <div className="flex justify-center space-x-1">
        <div className="text-black">{what}</div>
        <div>
            <Link to={where} className="cursor-pointer underline">
                {whereText}
            </Link>
        </div>
    </div>
}