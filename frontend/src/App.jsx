import { useState } from 'react'
import './App.css'
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom"
import { SignUp } from './pages/signup'
import { SignIn } from './pages/signin'
import { Send } from './pages/send'
import { Dashboard } from './pages/dashboard'
import { RecoilRoot } from 'recoil'

function App() {
 

  return (
      <>
      <RecoilRoot>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
        </Routes>
      </BrowserRouter>
      </RecoilRoot>
      </>
  )
}

export default App
