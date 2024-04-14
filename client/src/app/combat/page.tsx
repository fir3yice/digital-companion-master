"use client"

import React, {Suspense} from 'react';
import Combat from '@/components/combat';

export default function CombatPage() {
  
  return (
    <section id="CombatPage" className='bg-background w-full min-h-screen text-text primary-text flex flex-col'>
      <Suspense>
        <Combat/>
      </Suspense>
    </section>
  )
}
