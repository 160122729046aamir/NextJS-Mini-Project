"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const UserProfile = () => {
  const params = useParams();
  return (
    <>
    <h1>UserID:</h1>
    <div>{params.id}</div>
    </>
  )
}

export default UserProfile