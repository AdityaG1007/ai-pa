"use client"
import React, { useContext, useEffect, useState } from 'react'
import AiAssistantsList from '../../../../services/AiAssistantsList'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { BlurFade } from '@/components/magicui/blur-fade'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { useConvex, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { AuthContext } from '../../../../context/AuthContext'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export type ASSISTANT = {
        id: number,
        name: string,
        title: string,
        image: string,
        instruction: string,
        userInstruction: string,
        sampleQuestions: string[],
        aiModelId?: string,
}

function AIAssistants() {

  const [selectedAssistant,setSelectedAssistant] = useState<ASSISTANT[]>([])
  const insertAssistant = useMutation(api.userAiAssistants.InsertSelectedAssistants)
  const {user} = useContext(AuthContext)
  const [loading,setLoading] = useState(false)
  const convex = useConvex()
  const router = useRouter()

  useEffect(() => {
    user && GetUserAssistants()
  },[user])

  const GetUserAssistants = async() => {
    const result = await convex.query(api.userAiAssistants.GetAllUserAssistants,{
      uid : user._id
    })
    console.log(result)
  }

  const onSelect = (assistant:ASSISTANT) => {
    const item = selectedAssistant.find((item:ASSISTANT)=> item.id==assistant.id)
    if(item){
      setSelectedAssistant(selectedAssistant.filter((item:ASSISTANT) => item.id!==assistant.id))
      return
    }
    setSelectedAssistant(prev => [...prev,assistant])
  }

  const IsAssistantSelected = (assistant:ASSISTANT) => {
    const item = selectedAssistant.find((item:ASSISTANT)=> item.id==assistant.id)
    return item?true:false
  }

  const OnClickContinue = async() => {
    
    setLoading(true)

    const result = await insertAssistant({
      records : selectedAssistant,
      uid : user?._id
    })

    setLoading(false)
    console.log(result)
  }

  return (
    <div className='px-10 mt-20 md:px-20 lg:px-36 xl:px-48'>
      <div className='flex justify-between items-center'>
        <div>
        <BlurFade delay = {0.25} inView>
          <h2 className='text-3xl font-bold'>Welcome to the world of AI Assistants🤖</h2>
        </BlurFade>
        <BlurFade delay = {0.25 * 2 } inView>
          <p className='text-xl mt-2'>Choose your AI Compnanion to simplify your Task🚀</p>
        </BlurFade>
        </div>
        <ShimmerButton disabled = {selectedAssistant?.length == 0 || loading} onClick={() => router.push('/workspace')}> 
          {loading && <Loader2Icon className='animate-spin'/>}
           Continue
        </ShimmerButton>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5 mt-5'>
        {AiAssistantsList.map((assistant,index) => (
          <BlurFade key = {assistant.image} delay = {0.25 + index * 0.05} inView>

          <div key= {index} className='hover:border p-3 rounded-xl hover:scale-105 transform-all ease-in-out cursor-pointer relative'
          onClick={() => onSelect(assistant)}>
            <Checkbox className='absolute m-2'checked = {IsAssistantSelected(assistant)} />
            <Image src={assistant.image} alt = {assistant.title} width={600} height={600} 
            className='rounded-xl w-full h-[200px] object-cover'/>
            <h2 className='text-center font-bold text-lg' >{assistant.name}</h2>
            <h2 className='text-center text-gray-500 dark:text-gray'>{assistant.title}</h2>
          </div>

          </BlurFade>
        ))}
      </div>
    </div>
  )
}

export default AIAssistants
