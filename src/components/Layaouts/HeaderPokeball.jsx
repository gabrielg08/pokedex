import React from 'react'

const HeaderPokeball = () => {
  return (
    <header className=''>
    <div className='w-[100%] h-16 bg-red-500'>
        <img className='h-[40px] sm:h-full w-auto pl-4 translate-y-3 relative z-10' src="/img/home-pok.png" alt="" />
    </div>
    <div className='w-[100%] h-12 bg-black relative'>
      <div className='h-16 w-16 bg-white border-8 border-black rounded-full absolute right-0 -translate-x-1/2 -translate-y-[20%] grid place-content-center'>
        <div className='w-9 h-9 rounded-full bg-black border-[6px] border-black'></div>
      </div>
    </div>
  </header>
  )
}

export default HeaderPokeball
