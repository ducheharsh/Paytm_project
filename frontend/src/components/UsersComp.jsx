
import { useEffect, useState } from "react";
import { InputComp } from "./InputComp";
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function UsersComp(){

    const [filteredUsers, setFilteredUsers] = useState([])


    useEffect(() => {
        ( async() => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/user/bulk/", {
                    headers:{
                        authorization:localStorage.getItem('token')
                    }
                });
                console.log(res.data)
                setFilteredUsers(res.data.user);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);



    return <div className="m-4">
        <InputComp onChange={async(e) => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/user/bulk/", {
                    headers:{
                        authorization:localStorage.getItem('token')
                    },
                    params:{
                        filter:e.target.value
                    }
                });
                console.log(res.data)
                setFilteredUsers(res.data.user);
            } catch (error) {
                console.error(error);
            }
        }

        } label="Users"/>

        <div>{filteredUsers.map((user) => <EachUserTile user={user}/>)}</div>
        

    </div>
}

function EachUserTile({user}){
    const navigate = useNavigate();

    return <div className="grid grid-cols-2 px-2 py-1">
        
    <div className="justify-self-start text-md flex">
     <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-slate-300 rounded-full ">
    <span className="font-medium text-black ">{user.firstName[0]}</span>
    </div>
    <div className="pt-2 pl-2">
   {user.firstName} {user.lastName} 
   </div>

        </div>
        <div className="justify-self-end w-25 h-25">
            <Button onClick={()=>{
                localStorage.setItem('toAccountId', user._id)
                localStorage.setItem('toAccountName', user.firstName + " " + user.lastName)
                navigate('/send')
            }} label="Send Money"/>
        </div>
    </div>

}