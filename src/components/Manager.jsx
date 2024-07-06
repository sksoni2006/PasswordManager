import { useRef, useState, useEffect } from "react"
import React from 'react'

// install
//npm install uuid
import { v4 as uuidv4 } from 'uuid';
//Install
// npm install --save react-toastify     install in terminal

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//Access to fetch at 'http://localhost:3000/' from origin 'http://localhost:5173' has been blocked by CORS policy
// due to cors erroe we have install
// npm install cors  this reuires if error from after getPasswords function
// and also wite in your server .js :const cors = require('cors')  and  app.use(cors())


const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })  //show password
    const [passwordArray, setpasswordArray] = useState([])  //save password

    //Get request from backend mongodb
    const getpasswords = async () => {
        let req = await fetch("http://localhost:3000")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)  //doesnot reqire json.parse because it already comes from json
        

    }


    useEffect(() => {
        //let passwords = localStorage.getItem("passwords")  it removes due to save in mongodb
        getpasswords()
        // if (passwords) {
        //     setpasswordArray(JSON.parse(passwords))
        // }
    }, [])



    //showpassword
    const showpassword = () => {
        passwordref.current.type = "text"
        if (ref.current.src.includes("icon/eyecross1.png")) {
            ref.current.src = "icon/eye.png"
            passwordref.current.type = "password"
        }
        else {
            ref.current.src = "icon/eyecross1.png"
        }
    }

    //savepassword

    const savepassword = async() => {  //async due to await api from mongodb

        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
           
           //if such id exixts in the db,delete it ,afteredit
           await fetch("http://localhost:3000/",{ method:"DELETE",headers:{"Content-Type":"application/json" }
            ,body:JSON.stringify({id:form.id})})

           
           
            // setpasswordArray([...passwordArray, form])
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])  //open form and giving id 
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
            await fetch("http://localhost:3000/",{ method:"POST",headers:{"Content-Type":"application/json" }
                ,body:JSON.stringify({...form,id:uuidv4()})})

            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))  no save done from postmethod
            
            
            setform({ site: "", username: "", password: "" })  //clearing all text after delete

            toast('Successfully saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast('Input must be more than 3')
        }

    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }



    const editPassword = (id) => {
        console.log("editing password with id:", id)
       // setform(passwordArray.filter(i => i.id === id)[0])  //after click edit its data show in input box
       setform({...passwordArray.filter(i => i.id === id)[0],id:id})  //this tell us set id which is edited so that this will delted after edited
       
        setpasswordArray(passwordArray.filter(item => {    //it deletes the original one 
            return item.id !== id
        }))
    }

    const deletePassword = async (id) => {
        console.log("deleting password with id", id)
        let c = confirm("Do you really want to delete this password")   //confirm method
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
           

            
            await fetch("http://localhost:3000/",{ method:"DELETE",headers:{"Content-Type":"application/json" }
                ,body:JSON.stringify({id})})

            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))

            toast('Successfully Deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }



    }
    







    return (
        <>


            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />



            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>



            {/* this container below is used for responsive design */}
            <div className="p-2 md:p-0 md:mycontainer ">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>


                {/* Enter URL */}
                <div className=" flex flex-col p-4 text-black gap-8 items-center" >
                    <input value={form.site} onChange={handlechange} placeholder="Enter website URL" className="rounded-full border  border-green-500 w-full p-4 py-1 " type="text" name="site" id="site" />

                    {/* Enter Username */}
                    <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
                        <input value={form.username} onChange={handlechange} placeholder="Enter Username" className="rounded-full border  border-green-500 w-full p-4 py-1" type="text" name="username" id="username" />


                        {/* Enter password */}
                        <div className='relative'>
                            <input ref={passwordref} value={form.password} onChange={handlechange} placeholder="Enter Password" className="rounded-full border  border-green-500 w-full p-4 py-1" type="password" name="password" id="password" />
                            <span className='absolute right-[12px] top-[12px] cursor-pointer'
                                onClick={showpassword}>
                                <img ref={ref} className=" " width={20} src="icon/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    {/* Add passwordbutton */}
                    <button onClick={savepassword} className='flex justify-center items-center gap-2 bg-green-500 
                     hover:bg-green-600  rounded-full  w-fit px-8 py-2 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password</button>
                </div>
                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && <div className="font-bol">No password to show</div>}
                    {passwordArray.length != 0 &&

                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">  {/* to change vorder radius of table overflow hidden is must */}
                            <thead className="bg-green-600 text-white">    {/* column name    */}
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">

                                {/* Mapping item */}
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center '>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center '>
                                                <span>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center '>
                                                {/* <span >{item.password}</span> */} 
                                                <span >{"*".repeat(item.password.length)}</span>

                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className=' flex items-center justify-center py-2 border border-white text-center'>
                                            <span onClick={() => { editPassword(item.id) }} className="cursor-pointer mx-2">
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", }}
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </span>
                                        </td>

                                        <td className=' flex items-center justify-center py-2 border border-white text-center'>
                                            <span onClick={() => { deletePassword(item.id) }} className="cursor-pointer mx-2">
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", }}
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </span>
                                        </td>

                                    </tr>
                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div >


        </>
    )
}

export default Manager
