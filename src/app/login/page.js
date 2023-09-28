"use client"

import Image from "next/image"
import loginimage from "@/images/login.jpg"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { PlayCircleOutlined,Search, VideocamOffOutlined} from '@mui/icons-material';

export default function login(){
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const {push} = useRouter()

    function login(e){
        e.preventDefault()
        if (email === "pedrobeco97@gmail.com" && senha === "aaa"){
            push("/")
        }else{
            toast.error("Credenciais Invalidas",)
    }
}

    return (
        <div className="flex h-screen">
            <aside className="hidden md:flex">
                <Image className="h-full w-full object-cover "src={loginimage} alt=""></Image>
            </aside>

            <main className="container m-auto max-w-md p-6 text-zinc-100">
                <div className="flex">
                    <PlayCircleOutlined className='text-3xl' style={{ color:'#FF5964' }}/>
                    <h1 className="text-xl font-bold">FSDB</h1>
                </div>
                <form onSubmit={login} className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input className="bg-slate-600 p-1 rounded" 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    />

                    <label htmlFor="senha">Senha</label>
                    <input className="bg-slate-600 p-1 rounded" 
                    type="password" 
                    id="senha" 
                    value={senha} 
                    onChange={e => setSenha(e.target.value)}
                    />

                    <button className="bg-[#FF5964] p-2 mt-5 rounded">Entrar</button>
                </form>
            </main>
        </div>
    )
}