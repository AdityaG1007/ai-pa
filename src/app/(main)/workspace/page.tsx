"use client"
import React from 'react'
import AssistantList from './_components/AssistantList'
import AssistantSettings from './_components/AssistantSettings'
import ChatUi from './_components/ChatUi'

function workspace() {

  return (
    <div className='h-screen fixed w-full'>
      <div className='grid grid-cols-5'>
        <div className='hidden md:block'>
            <AssistantList/>
        </div>
        <div className='md:col-span-4 lg:col-span-3'>
            <ChatUi/>
        </div>
        <div className='hidden lg:block'>
            <AssistantSettings/>
        </div>
      </div>
    </div>
  )
}

export default workspace
