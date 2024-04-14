"use client"

import React from 'react'
import LimbContainer from './LimbContainer';
import { useState, useEffect } from 'react'
import { Spinner } from 'flowbite-react'


export default function LimbTracker({ playerView, fetchData, data }) {

  const [limbs, setLimbs] = useState([]);
  const [numLimb, setNumLimb] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const COLORS = [
    {
      'fantastical': 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600',
      'fantastical-bg': 'bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-600',
    },
    {
      'aquatic': 'bg-text2',
      'aquatic-bg': 'bg-sky-800',
    }, {
      'inorganic': 'bg-slate-600',
      'inorganic-bg': 'bg-slate-800',
    }, {
      'terrestrial': 'bg-amber-700',
      'terrestrial-bg': 'bg-amber-900'
    }
  ]

  useEffect(() => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_BACKEND;
      fetch(`${API_URL}/api/view_parts/${playerView}`).then(
        response => response.json()
      ).then(
        data => {
          let LIMBS
          LIMBS = data.map(limb => {
            return {
              code: limb.id,
              name: limb.name,
              str: limb.str,
              def: limb.def,
              spe: limb.spd,
              cha: limb.cha,
              race: limb.fac
            }
          })
          console.log(`${API_URL}/api/view_parts/${playerView}`)
          console.log(playerView)
          console.log(data)
          console.log(LIMBS)
          LIMBS.forEach(limb => {
            const raceColors = COLORS.find(color => color[limb.race.toLowerCase()]);
            if (raceColors) {
              limb.color = raceColors[limb.race.toLowerCase()];
              limb.colorbg = raceColors[`${limb.race.toLowerCase()}-bg`];
            }
          })
          setLimbs(LIMBS);
          setNumLimb(LIMBS.length);
          setIsLoading(false)
        }
      );
    } catch (error) {
      console.error('Error:', error);
    }
  }, [playerView]);

  useEffect(() => {

  }, [data, isLoading])


  return (
    <div className='w-full bg-zinc-300 rounded-md mt-4 p-4'>
      <div className='w-full flex justify-between'>
        <p className='uppercase accent-text text-accent2 bold text-3xl'>
          Limbs
        </p>
        <p className='uppercase accent-text text-accent2 bold text-3xl'>
          {isLoading ? '' : numLimb}
        </p>
      </div>

      <div className={`w-full max-h-[350px] min-h-[350px] overflow-y-auto  ${isLoading ? 'flex justify-center items-center' : ''}`}>

        {
          isLoading ? <div className='h-70 sm:h-70 xl:h-80 2xl:h-96 mt-4 p-10 accent-text uppercase text-center gap-3 justify-center text-background text-4xl w-full flex flex-col rounded-md'>
            <Spinner size="lg" color="success" aria-label="Pink spinner example" />
            <div className='mt-1'>
              Loading
            </div>
          </div> : ''
        }

        {limbs.map(limb => (
          <LimbContainer
            limb={limb}
            playerNow={playerView}
            fetchData={fetchData}
          />
        ))}

      </div>
    </div>
  )
}
