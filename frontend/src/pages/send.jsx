import axios from "axios";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputComp } from "../components/InputComp";
import { SubHeading } from "../components/SubHeading";

import { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";




export function Send(){

    const[issues, setIssues] = useState([])
    
    const [amount, setAmount] = useState("")
    const username = localStorage.getItem('toAccountName')
    const userId = localStorage.getItem('toAccountId')

    return<div className="flex items-center justify-center h-screen p-3 ">
        <div className="bg-white rounded-lg w-96 flex flex-col justify-center items-center p-1 shadow-lg">
            <div className="flex justify-center pb-4"><Heading label="Send Money"/></div>

            <div className="flex justify-center">

            <div className="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-green-500 rounded-full ">
    <span className="font-md text-3xl text-white ">{username[0]}</span>
            </div>

    </div>
    <div className="pt-4">
        <SubHeading label={username}/>
    </div>
    <div className="pt-4 w-3/4 px-1">
        <InputComp onChange={(e)=>{
            setAmount(e.target.value)
        }} label="Amount in Rs" placeholder="Enter Amount"/>
    </div>
    <div className="pt-1 pb-3 w-3/4 px-1">
        <Button onClick={async()=>{
            const sendAmount = Number(amount)
            console.log(typeof sendAmount)
            console.log(localStorage.getItem('token'))
            const data = {
                userId:userId,
                amount: sendAmount
            }
            const headers={
                authorization: localStorage.getItem("token")
            }
            try{
                await axios.post("http://localhost:3000/api/v1/account/transfer", data, {
                    headers:headers
                }).then((response) => {
                    console.log(response)
                    alert("Money Sent Successfully")
                }
            )
        }catch(error){
            setIssues(error.response.data.error.issues)
            console.error(error)
            alert("Money Transfer Failed")
        }
        }} label="Send Money"/>
    </div>

    <div className="py-3">
            
            {issues.map((x) => <ErrorMessage message={x.message} code={x.path[0]}/>)}
                
    </div>

    </div>

    </div>
}