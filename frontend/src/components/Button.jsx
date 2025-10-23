export const Button = ({text,onclick})=>{
    return <div>
        <button onClick={onclick} className="bg-black text-white mt-2 rounded w-full p-2">
            {text}
        </button>
    </div>
}