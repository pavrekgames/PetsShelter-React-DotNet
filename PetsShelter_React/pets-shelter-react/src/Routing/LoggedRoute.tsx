import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../App/hooks';

type Props = {children: React.ReactNode}

const LoggedRoute = ({children}: Props) => {

    const location = useLocation();
    const isLoggedIn = useAppSelector(state => state.isLoggedIn.value);

  return (
    <>
    {isLoggedIn ? children : <Navigate to="/login" state={{from: location}} replace /> }
    </>
  )
}

export default LoggedRoute