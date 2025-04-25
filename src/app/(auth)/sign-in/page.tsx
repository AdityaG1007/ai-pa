"use client"
import { Button } from '@/components/ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image'
import React, { useContext } from 'react'
import { GetAuthUserData } from '../../../../services/GlobalApi';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { AuthContext } from '../../../../context/AuthContext';
import { useRouter } from 'next/navigation';

function SignIn() {

const CreateUser = useMutation(api.users.CreateUser)

const {user, setUser} = useContext(AuthContext)
const router = useRouter()

const googleLogin = useGoogleLogin({

    onSuccess: async (tokenResponse) => {
      if(typeof window !== undefined){
      localStorage.setItem('user_token',tokenResponse.access_token)
    }

      const user = await GetAuthUserData(tokenResponse.access_token)
      // console.log(user);

      //Save User Info
      const result = await CreateUser({
        name : user?.name,
        email : user?.email,
        picture : user?.picture
      })
      // console.log("--",result)
      router.replace('/ai-assistants')
      setUser(result)
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <div className='flex items-center flex-col justify-center h-screen '>
    <div className='flex flex-col items-center gap-10 border roudned-2xl p-10 shadow-md'>
      <Image src={'/logo.svg'} alt = 'logo'
      width={50}
      height={50} />
      <h2 className='text-2xl'>Sign In to AI Personal Assistant</h2>
      <Button onClick={() => googleLogin()}>Sign In with Gmail</Button>
    </div>
    </div>
  )
}

export default SignIn
