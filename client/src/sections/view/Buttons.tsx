"use client"

import React, { useState } from 'react'
import { Modal, Button, Flowbite, Select } from 'flowbite-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { CustomFlowbiteTheme } from "flowbite-react";
import D20 from '@/components/D20'

export default function Buttons({ playerView }) {
  const [openModal, setOpenModal] = useState(false);
  const [combatModal, setCombatModal] = useState(false);
  const [eventModal, setEventModal] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(false);

  const [move, setMove] = useState('?');
  const [multiplier, setMultiplier] = useState('');
  const [firstText, setFirstText] = useState('You can move');
  const [secondText, setSecondText] = useState('tiles!');
  const [prey, setPrey] = useState(null);
  const searchParams = useSearchParams()
  const playerNum = searchParams?.get('player') ?? '';
  let otherPlayerNumbers = [1, 2, 3, 4];
  otherPlayerNumbers = otherPlayerNumbers.filter(num => num !== parseInt(playerNum, 10));


  const customTheme: CustomFlowbiteTheme = {
    "modal": {
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
        "base": "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
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
  }

  const handleEnemyClick = (player) => {
    if (prey === player) {
      setPrey(null);
    } else {
      setPrey(player);
    }
  };

  const setMoveNumber = () => {
    setMove('?')

    const API_URL = process.env.NEXT_PUBLIC_BACKEND

    fetch(`${API_URL}/api/move/${playerNum}`)
      .then(response => response.json())
      .then(data => {
        let move = data.number
        const random = Math.floor(Math.random() * 100);
        switch (random) {
          case 0:
          case 1:
            setMultiplier('x2');
            move *= 2
            setFirstText('You can move');
            setMove(move);
            setSecondText('tiles!');
            break;
          case 2:
          case 3:
            setMultiplier('x0');
            move *= 0
            setFirstText('You can move');
            setMove(move);
            setSecondText('tiles!');
            break;
          case 4:
          case 5:
            setMultiplier('');
            setFirstText('You can teleport anywhere');
            setMove('∞');
            setSecondText('on the board!');
            break;
          case 6:
          case 7:
            setMultiplier('');
            setFirstText('You can swap with anyone');
            setMove('➜');
            setSecondText('on the board!');
            break;
          default:
            setMultiplier('');
            setFirstText('You can move');
            setMove(move);
            setSecondText('tiles!');
            break;
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })

    setOpenModal(true);
  };

  return (
    <>
      <div className='w-full flex gap-2 justify-center mt-5'>
        <button className='bg-accent2 rounded-md border-none accent-text text-zinc-200 text-2xl p-2 w-full hover:bg-primary' onClick={setMoveNumber}> <p>MOVE</p></button>
        <button className='bg-accent rounded-md border-none accent-text text-zinc-200 text-2xl p-2 w-full hover:bg-primary' onClick={() => setEventModal(true)}> <p>EVENT</p></button>
        <button className='bg-red-500 rounded-md border-none accent-text text-zinc-200 text-2xl p-2 w-full hover:bg-primary' onClick={() => setCombatModal(true)}> <p>COMBAT</p></button>
      </div>

      <Flowbite theme={{ theme: customTheme }}>

        <Modal show={openModal} className='h-full ' size="md" onClose={() => setOpenModal(false)} popup>
          <Modal.Header className='bg-background' />
          <Modal.Body className='bg-background'>
            <div className={"text-center primary-text bg-background py-5 flex justify-center flex-col items-center gap-4"}>

              <div className={'w-full' + (multiplier === '' ? ' visibility:hidden' : '')}>
                <p className={"text-base accent-text p-2 rounded-md w-10 text-text" + (multiplier === '' ? ' visibility:hidden bg-background' : (multiplier === 'x0' ? ' bg-red-700' : ' bg-emerald-500'))}>
                  {multiplier}
                </p>
              </div>

              <p className="text-3xl accent-text uppercase text-accent">
                {firstText}
              </p>

              <p className="text-7xl text-background p-2 rounded px-5 bg-primary accent-text">
                {move}
              </p>

              <p className="text-3xl accent-text uppercase text-accent">
                {secondText}
              </p>



              <div className="flex justify-center gap-4 mt-4">
                <Button onClick={() => setOpenModal(false)} className='w-28' style={{ backgroundColor: '#4056a1' }}>
                  {"Okay!"}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Flowbite>

      <Flowbite theme={{ theme: customTheme }}>

        <Modal show={combatModal} className='h-full ' size="md" onClose={() => setCombatModal(false)} popup>
          <Modal.Header className='bg-background' />
          <Modal.Body className='bg-background'>
            <div className='py-5 w-full flex flex-col text-center items-center text-3xl accent-text justify-center'>
              <p className='uppercase text-4xl text-accent mt-2'>Pick your enemy</p>
              <div className='w-full mt-5'>

                {otherPlayerNumbers.map((player) => (
                  <div id={String(player)} key={player} onClick={() => handleEnemyClick(player)} className={`my-4 flex items-center gap-7 bg-secondary text-text p-2 rounded-md pl-8 py-4 hover:bg-blue-900 ${prey === player ? 'border border-4 border-zinc-100' : ''}`}>
                    <Image
                      src={`/assets/P${player}_icon.png`}
                      width={90}
                      height={90}
                      alt={`Player ${player} Icon`}
                      className='rounded-full border-4 border-double border-zinc-100'
                    />
                    <p>Player {player}</p>
                  </div>
                ))}

              </div>


              <div className="flex justify-center gap-4 mt-4">
                <Link href={`/combat?ptor=${playerNum}&prey=${prey}`}>
                  <Button className={`w-36 text-3xl ${prey === null ? 'hidden' : ''}`} size="4xl" style={{ backgroundColor: '#FB5A48' }}>
                    {"FIGHT!"}
                  </Button>
                </Link>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Flowbite>

      <Flowbite theme={{ theme: customTheme }}>

        <Modal show={eventModal} className='h-min-screen' size="md" onClose={() => setEventModal(false)} popup>
          <Modal.Header className='bg-background' />
          <Modal.Body className='bg-background'>
            <div className="py-5 primary-text bg-background flex justify-center flex-col items-center gap-4">

              {
                showResults && (
                  <div className='w-full flex justify-center items-center flex-col p-4'>
                    <D20
                      number={results} 
                      prey={0}/>

                    <Button className={`w-36 text-xl primary-text mt-20 p-2`} size="4xl" style={{ backgroundColor: '#4056a1' }} onClick={() => {
                      setEventModal(false);
                      setShowResults(false);
                    }}>
                      {"Okay!"}
                    </Button>
                  </div>
                )

              }


              {
                !showResults && (
                  <>
                    <div className='bg-accent text-center  w-full flex justify-center items-center flex-col p-4 rounded-md'>
                      <h3 className="text-lg accent-text uppercase text-zinc-100">
                        Select modifier
                      </h3>

                      <Select id='eventType' className='w-48 primary-text mt-2' required style={{ backgroundColor: '#0B0B0F', color: '#f0f0f4' }}>
                        <option value="str">Strength</option>
                        <option value="def">Defense</option>
                        <option value="spd">Speed</option>
                        <option value="cha">Charisma</option>
                        <option value="none">None</option>
                      </Select>
                    </div>

                    <Button className={`w-36 text-3xl accent-text mt-5`} size="4xl" style={{ backgroundColor: '#FB5A48' }} onClick={() => {
                      const API_URL = process.env.NEXT_PUBLIC_BACKEND
                      const eventType = (document.getElementById('eventType') as HTMLInputElement).value
                      fetch(`${API_URL}/api/event/${playerNum}/${eventType}`)
                        .then(response => response.json())
                        .then(data => {
                          setResults(data.roll)
                        })
                        .catch(error => {
                          console.error('Error:', error)
                        })

                      setShowResults(true)
                    }}>
                      {"ROLL!"}
                    </Button>
                  </>
                )

              }

            </div>
          </Modal.Body>
        </Modal>
      </Flowbite>
    </>
  )
}
