"use client"

import React, {Suspense} from 'react'
import View from '@/components/View';


export default function ViewCharacterPage() {
  
  return (
    <section id='ViewCharacterPage' className='bg-background w-full min-h-screen text-text primary-text flex flex-col'>
      <Suspense>
        <View/>
      </Suspense>
    </section>
  )
}
