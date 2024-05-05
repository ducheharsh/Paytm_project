import { useEffect, useMemo, useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";

import { BalanceComp } from "../components/BalanceComp";
import { UsersComp } from "../components/UsersComp";


function useGetData(){
    const [username, setUsername] = useState("")
    const [balance, setBalance] = useState("")
   


    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                });
                setUsername(res.data.username);
                setBalance(res.data.balance);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return {username, balance}
}

export function Dashboard(){
    document.body.className = 'bg-white-900'
    const {username, balance} = useGetData();
    return <div >
    <Appbar firstName={username}/>
    <BalanceComp balance={balance}/>
    <UsersComp />
    </div>
}