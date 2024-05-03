import { useNavigate } from "react-router-dom"

export function BottomWarning({warning, hl, route}){
    const navigate = useNavigate()
    return <div>
     <div >
        {warning}  
        <a className="ml-2 underline hover:text-blue-700 cursor-pointer" onClick={()=>{
            navigate(route)
        }}>
        {hl}
    </a>
    </div>

    </div>
}