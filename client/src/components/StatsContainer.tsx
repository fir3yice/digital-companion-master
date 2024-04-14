"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Button, Modal, Select, TextInput, Flowbite } from 'flowbite-react'
import type { CustomFlowbiteTheme } from "flowbite-react";
import { useSearchParams } from 'next/navigation'

export default function StatsContainer({ color, playernum, str, def, spe, cha, fetchData}) {

  const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams()
  const playerNum = searchParams?.get('player') ?? '';

  const modalTheme: CustomFlowbiteTheme["modal"] = {
    "root": {
      "base": "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
      "show": {
        "on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
        "off": "hidden"
      },
      "sizes": {
        "sm": "max-w-sm",
        "md": "max-w-md",
        "lg": "max-w-lg",
        "xl": "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl"
      },
      "positions": {
        "top-left": "items-start justify-start",
        "top-center": "items-start justify-center",
        "top-right": "items-start justify-end",
        "center-left": "items-center justify-start",
        "center": "items-center justify-center",
        "center-right": "items-center justify-end",
        "bottom-right": "items-end justify-end",
        "bottom-center": "items-end justify-center",
        "bottom-left": "items-end justify-start"
      }
    },
    "content": {
      "base": "relative w-full p-4 h-auto",
      "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
    },
    "body": {
      "base": "flex-1 overflow-auto p-6",
      "popup": "pt-0"
    },
    "header": {
      "base": "flex items-start justify-between rounded-t p-5 dark:border-gray-600",
      "popup": "border-b-0 p-2",
      "title": "text-xl font-medium text-gray-900 dark:text-white",
      "close": {
        "base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
        "icon": "h-8 w-8"
      }
    },
    "footer": {
      "base": "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
      "popup": "border-t"
    }
  }


  return (
    <>
      <div className={`w-full py-5 rounded-md px-3`} style={{ backgroundColor: color }}>
        <div className='grid grid-cols-3 gap-2'>
          <div className='col-span-1 flex items-center w-full flex-col gap-2 mt-8'>
            <Image
              src={`/assets/P${playernum}_icon.png`}
              width={90}
              height={90}
              alt={`Player ${playernum} Icon`}
              className='rounded-full border-4 border-double border-zinc-100'
            />
            <p className='accent-text uppercase'>
              Player {playernum}
            </p>

          </div>
          <div className='w-full col-span-2 pl-3 accent-text uppercase text-white'>
            <div className='w-full flex justify-between bg-secondary p-2 rounded-md px-4'>
              <p>Strength</p>
              <p>{str ? str : '0'}</p>
            </div>

            <div className='w-full flex justify-between bg-secondary p-2 rounded-md px-4 mt-2'>
              <p>Speed</p>
              <p>{spe ? spe : '0'}</p>
            </div>

            <div className='w-full flex justify-between bg-secondary p-2 rounded-md px-4 mt-2'>
              <p>Defense</p>
              <p>{def ? def : '0'}</p>
            </div>


            <div className='w-full flex justify-between bg-secondary p-2 rounded-md px-4 mt-2'>
              <p>Charisma</p>
              <p>{cha ? cha : '0'}</p>
            </div>

            {playerNum == playernum &&
              <Button className='accent-text w-full uppercase bg-accent2 border-white border-2 mt-2' onClick={() => setOpenModal(true)}>Add Buff / Debuff</Button>
            }
            {playerNum != playernum &&
              <Button className='accent-text w-full uppercase bg-accent2 border-white border-2 mt-2 invisible' onClick={() => setOpenModal(true)}>Add Buff / Debuff</Button>
            }
          </div>
        </div>

      </div>



      <Modal show={openModal} theme={modalTheme} className='h-min-screen' size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header className='bg-background' />
        <Modal.Body className='bg-background'>
          <div className="py-5 text-center primary-text bg-background flex justify-center flex-col items-center gap-4">

            <div className='bg-accent w-full flex justify-center items-center flex-col p-4 rounded-md'>
              <h3 className="text-lg accent-text uppercase text-zinc-100">
                Select stat to add buff / debuff
              </h3>

              <Select id='statInput' className='w-48 primary-text mt-2' required style={{ backgroundColor: '#0B0B0F', color: '#f0f0f4' }}>
                <option value="str">Strength</option>
                <option value="def">Defense</option>
                <option value="spd">Speed</option>
                <option value="cha">Charisma</option>
              </Select>
            </div>

            <div className='bg-accent3 w-full flex justify-center items-center flex-col p-4 rounded-md'>
              <h3 className="text-lg accent-text uppercase text-zinc-100">
                Select Stat
              </h3>

              <Select id="type" className='w-48 primary-text mt-2' required style={{ backgroundColor: '#0B0B0F', color: '#f0f0f4' }}>
                <option value="Buff">Buff</option>
                <option value="Debuff">Debuff</option>
              </Select>
            </div>

            <div className='bg-accent2 w-full flex justify-center items-center flex-col p-5 rounded-md'>
              <h3 className="text-lg accent-text uppercase text-zinc-100 ">
                Input Modifier Number
              </h3>
              <TextInput style={{ backgroundColor: '#0B0B0F', color: '#f0f0f4' }} id="modifier" type="number" sizing="sm" className='w-48 mt-2' />
            </div>


            <div className='bg-text2 w-full flex justify-center items-center flex-col p-5 rounded-md'>
              <h3 className="text-lg accent-text uppercase text-zinc-100 ">
                Input Turn Duration
              </h3>
              <TextInput style={{ backgroundColor: '#0B0B0F', color: '#f0f0f4' }} id="duration" type="number" sizing="sm" className='w-48 mt-2' />
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <Button color="success" onClick={() => {
                const stat = (document.getElementById('statInput') as HTMLInputElement).value;
                const type = (document.getElementById('type') as HTMLInputElement).value;
                let modifier = (document.getElementById('modifier') as HTMLInputElement).value;
                const duration = (document.getElementById('duration') as HTMLInputElement).value;
                if (stat && type && modifier && duration && parseInt(modifier) >= 0 && parseInt(duration) >= 0) {
                  if (type == 'Debuff') {
                    modifier = '-' + modifier
                  }
                  const API_URL = process.env.NEXT_PUBLIC_BACKEND
                  fetch(`${API_URL}/api/buff/${playerNum}/${stat}/${modifier}/${duration}`, { method: 'POST' })
                    .then(response => {
                      if (response.status === 200) {
                        fetchData()
                        setOpenModal(false);
                      } else {
                        console.error('Error:', response)
                      }
                    })
                    .catch(error => {
                      console.error('Error:', error)
                    })
                }

              }}>
                Add it!
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, I won't add it!
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  )
}
