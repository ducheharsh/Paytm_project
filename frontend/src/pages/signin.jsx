import { Heading } from "../components/Heading";
import { InputComp } from "../components/InputComp";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorMessage } from "../components/ErrorMessage";


export function SignIn(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const[issues, setIssues] = useState([])

    const navigate = useNavigate()


    return <div className='flex justify-center pt-32'>
     <div className=" w-1/4 bg-white flex flex-col rounded-xl p-6 shadow-2xl">
        <div className="text-center">
            <Heading label="Sign In"/>
            <SubHeading label="Enter your credentials to log in" />
        </div>
        <div className="mt-6">
            <InputComp onChange={(e)=>{
                setUsername(e.target.value)
            }} placeholder="ducheharsh@gmail.com" label="Email"/>
            <InputComp onChange={(e)=>{
                setPassword(e.target.value)
            }} placeholder="Enter your password" label="Password"/>
        </div>
        <div className="flex flex-col">
        <div className=" justify-center pt-3">      
            <Button label="Log in" onClick={async()=>{
            try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
            })
            if(response.data.token){
            const pretoken = "Bearer" + " " + response.data.token
            localStorage.setItem("token", pretoken)
            setIssues([])
            navigate('/dashboard')
        }else{
            console.log("response.msg")
            setIssues([{
                message:"Invalid Credentials",
                path:["username"]
            }])
        }
        
        }
            catch(error){
                console.log(response.msg)
                setIssues(error.response.data.error.issues)
            }
            
        }} />

        <div className="py-3">
            
        {issues.map((x) => <ErrorMessage message={x.message} code={x.path[0]}/>)}
            
        </div>
        </div>

        </div>
        <div className="flex justify-center">
            <BottomWarning warning="Forgot Password" hl="Sign in" route="/"/>
        </div>
    
        </div>
        </div>
    }