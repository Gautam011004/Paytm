import { AppBar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { User } from "../components/User"

export const Dashboard = ()=>{
    return <div className="p-10">
        <AppBar></AppBar>
        <div className="flex flex-col p-5 space-y-4">
            <Balance/>
            <User/>
        </div>
    </div>
}