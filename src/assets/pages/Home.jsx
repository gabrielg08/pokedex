import React from 'react'
import { setTrainerName } from '../../store/slices/trainerName.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setTrainerName(e.target.trainerName.value))
    navigate("/pokedex")
  }

  return (
    <main className='h-screen grid grid-rows-[1fr_auto]'>
      <section className='grid place-content-center text-center'>
        <div className='grid justify-center text-center gap-3'>
          <div className=''>
            <img src="/img/home-pok.png" alt="" />
          </div>
          <h3 className='text-red-500 font-bold text-5xl'>Hi Coach!</h3>
          <p className='text-lg'>To start give me your name:</p>
          <form onSubmit={handleSubmit}>
            <input className='border-b-2 p-2' type="text" name='trainerName' placeholder='Your name...' />
            <button className='border bg-red-500 text-white w-20 p-2 '>Start</button>
          </form>
        </div>
      </section>
      <footer className=''>
        <div className='w-[100%] h-16 bg-red-500'></div>
        <div className='w-[100%] h-12 bg-black relative'>
          <div className='h-16 w-16 bg-white border-8 border-black rounded-full absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center'>
            <div className='w-9 h-9 rounded-full bg-black border-[6px] border-black'></div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Home
