import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Private = () => {

    const trainerName = useSelector((store) => store.trainerName)

    if(trainerName)
    {
       return <Outlet />
    }else{
        return <Navigate to="/" />
    }
  return (
    <div>
      
    </div>
  )
}

export default Private
