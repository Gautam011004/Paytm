export const AppBar=({name})=>{
    return <div className="flex justify-between border-b border-b-slate-300 border-t-2 border-t-black">
        <div className="p-2">
            Paytm App
        </div>
        <div className="flex space-x-2 p-2">
            <div>
                Hello {name}
            </div>
            <div className="rounded-full bg-slate-500 h-7 w-7 text-center">
                U
            </div>
        </div>
    </div>
}