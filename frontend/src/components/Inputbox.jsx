export const InputBox=({title,placeholder,reference})=>{
    return <div className="space-y-2">
        <div className="text-sm text-black text-left pt-2">
            {title}
        </div>
        <input ref={reference} placeholder={placeholder} className="text-gray-500 border border-slate-500 w-full rounded p-2"/>
    </div>
}