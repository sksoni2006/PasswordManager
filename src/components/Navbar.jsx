import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-500'> &lt;</span>

          <span>Pass</span><span className='text-green-500'>OP/&gt;</span>


        </div>
        {/* <ul>
        <li className='flex gap-4'>
            <a className="hover:font-bold"href="#">Home</a>
            <a href="#">about</a>
            <a href="#">contact</a>
           
        </li>
      </ul> */}


        {/* logo */}
        <a href="https://github.com/">
        <button className='bg-green-700 my-5 mx-2  rounded-full
      flex justify-between items-center ring-white ring-1'>    {/*ring css */}
          <img className="invert p-1" width={40} src="/icon/github.svg" alt="github logo" />
          <span className='font-bold px-2'>GitHub</span>
        </button>
        </a>
      </div>
    </nav>
  )
}

export default Navbar