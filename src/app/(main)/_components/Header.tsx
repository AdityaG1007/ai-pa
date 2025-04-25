"use client"
import Image from 'next/image'
import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'

function Header() {

  const {user} = useContext(AuthContext)

  return (
    <div className="p-3 fixed shadow-sm flex justify-between items-center px-14">
      <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
      {user?.picture && (
        <Image
          src={user?.picture}
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        />
      )}
    </div>
  );
}

export default Header
