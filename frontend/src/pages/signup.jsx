import { Heading } from "../components/Heading";
import { InputComp } from "../components/InputComp";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios"
import { ErrorMessage } from "../components/ErrorMessage";
import { errorSelector } from "recoil";
import { useNavigate } from "react-router-dom";


export function SignUp(){

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const[issues, setIssues] = useState([])


    const navigate = useNavigate()


return <div className='flex justify-center pt-32'>
    
<div className=" bg-white flex flex-col rounded-xl p-6 shadow-2xl">
    <div className="text-center ">
        <Heading label="Sign Up"/>
        <SubHeading label="Enter your information to create an account" />
    </div>
    <div className="mt-6">
        <InputComp type="text" onChange={(e) =>{
            setFirstName(e.target.value)
        }} placeholder="John" label="First Name"/>
        <InputComp type="text" onChange={(e) =>{
            setLastName(e.target.value)
        }} placeholder="Doe" label="Last Name"/>
        <InputComp type="text" onChange={(e) =>{
            setUsername(e.target.value)
        }} placeholder="ducheharsh@gmail.com" label="Email"/>
        <InputComp type="password" onChange={(e) =>{
            setPassword(e.target.value)
        }} placeholder="Enter your password" label="Password"/>
    </div>
    <div className="flex flex-col justify-center pt-3">
        <Button label="Submit" onClick={async()=>{
            try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                firstName,
                lastName,
                password
            })
            if(response.data.token){
            const pretoken = "Bearer" + " " + response.data.token
            localStorage.setItem("token", pretoken)
            setIssues([])
            navigate('/dashboard')
            }
        }
            catch(error){
              
                setIssues(error.response.data.error.issues)
            }
            
        }} />

        
        <div className="py-3">

        {issues.map((x) => <ErrorMessage message={x.message} code={x.path[0]}/>)}


        </div>
      
        
    </div>
    <div className="flex justify-center">
        <BottomWarning warning="Already have an account?" hl="Sign in" route={"/signin"}/>
    </div>

    </div>
    </div>
}