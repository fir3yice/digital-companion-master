import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Modal, Button } from 'flowbite-react'
import D20 from '@/components/D20'
import { useEffect } from 'react'
import type { CustomFlowbiteTheme } from "flowbite-react";

export default function combat() {
    const searchParams = useSearchParams()
    const predator = searchParams?.get('ptor') ?? '';
    const prey = searchParams?.get('prey') ?? '';
  
    const modalTheme: CustomFlowbiteTheme['modal'] = {
  
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
  
    const [predatorScore, setPredatorScore] = useState(0);
    const [preyScore, setPreyScore] = useState(0);
    const [rollNumPredator, setRollNumPredator] = useState('?');
    const [rollNumPrey, setRollNumPrey] = useState('?');
    const [rollPredator, setRollPredator] = useState(false);
    const [rollPrey, setRollPrey] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [showStat, setShowStat] = useState(true);
    const [showText, setShowText] = useState('');
    const [showTextButton, setShowTextButton] = useState("Okay!");
    const [showSteal, setShowSteal] = useState(false);
    const [showStealResult, setShowStealResult] = useState('');
    const [predatorPartsNum, setPredatorPartsNum] = useState<number | null>(null);
    const [preyPartsNum, setPreyPartsNum] = useState<number | null>(null);
    const [predatorStat, setPredatorStat] = useState<number | null>(null);
    const [preyStat, setPreyStat] = useState<number | null>(null);
    const [statIndex, setStatIndex] = useState(-999);
  
    if (statIndex === -999)
      setStatIndex(Math.floor(Math.random() * 4));
    const statLong = ['Strength', 'Defense', 'Speed', 'Charisma'][statIndex];
    const stat = ['str', 'def', 'spd', 'cha'][statIndex];
  
  
    useEffect(() => {
      const API_URL = process.env.NEXT_PUBLIC_BACKEND
      if (predatorPartsNum === null) {
        fetch(`${API_URL}/api/view_parts/${predator}`)
          .then(response => response.json())
          .then(data => {
            setPredatorPartsNum(data.length)
          })
          .catch(error => {
            console.error('Error:', error)
          })
      }
      if (preyPartsNum === null) {
        fetch(`${API_URL}/api/view_parts/${prey}`)
          .then(response => response.json())
          .then(data => {
            setPreyPartsNum(data.length)
          })
          .catch(error => {
            console.error('Error:', error)
          })
      }
      if (predatorStat === null || preyStat === null) {
        fetch(`${API_URL}/api/battle/${predator}/${prey}`, {
          method: 'POST'
        })
          .then(response => response.json())
          .then(data => {
            setPredatorStat(data.predator[stat])
            setPreyStat(data.prey[stat])
          })
          .catch(error => {
            console.error('Error:', error)
          })
      }
  
      if (predatorScore === 3 || preyScore === 3) {
        if (predatorScore === 3) {
          setShowText(`P${predator} has won the entire battle! But will they steal a limb?`)
        } if (preyScore === 3) {
          setShowText(`P${prey} has won the entire battle! But will they steal a limb?`)
        }
        setShowTextButton("Let's see!");
      } else {
        let result
        if (parseInt(rollNumPredator) > parseInt(rollNumPrey)) {
          result = 'predator';
        } else if (parseInt(rollNumPredator) < parseInt(rollNumPrey)) {
          result = 'prey';
        } else {
          result = 'draw';
        }
        if (result === 'predator')
          setShowText(`P${predator} has won this round!`)
        else if (result === 'prey')
          setShowText(`P${prey} has won this round!`)
        else
          setShowText(`Woah! It's a draw!`)
  
        setShowTextButton("Okay!");
      }
  
      if (rollPrey && rollPredator && !showResult && !showSteal) {
        if (parseInt(rollNumPredator) > parseInt(rollNumPrey)) {
          setPredatorScore(predatorScore + 1);
        } else if (parseInt(rollNumPredator) < parseInt(rollNumPrey)) {
          setPreyScore(preyScore + 1);
        }
        setShowResult(true);
      }
  
      if (!rollPrey && !rollPredator && showResult) {
        setShowResult(false);
      }
    });
  
    const handleRollPredator = () => {
      if (!rollPredator && predatorStat !== null) {
        setRollPredator(true);
        setRollNumPredator(String(Math.floor(Math.random() * 20) + 1 + predatorStat));
      }
    };
  
    const handleRollPrey = () => {
      if (!rollPrey && preyStat !== null) {
        setRollPrey(true);
        setRollNumPrey(String(Math.floor(Math.random() * 20) + 1 + preyStat));
  
      }
    };
  
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  
    return (
      <section id="CombatPage" className='bg-background w-full min-h-screen text-text primary-text flex flex-col'>
        <div className='w-full flex flex-col min-h-screen text-3xl accent-text justify-center'>
          <div className='w-full bg-accent3 px-5 py-5  flex flex-col justify-center items-center' style={{ flex: '1' }}>
            <Button className='w-28 mb-10 rotate-180' style={{ backgroundColor: '#4056a1' }} onClick={handleRollPrey}>
              <p className=' text-2xl'>{"Roll!"}</p>
            </Button>
            <D20
              number={rollNumPrey}
              prey={1}
            />
            <p className='rotate-180 text-2xl pb-12'>P{prey}</p>
            <div className='w-full flex pt-3 rotate-180'>
            <div className='bg-accent px-3 py-1 rounded-md text-secondary text-lg'>
            {preyStat === null ? '' : (
                  <div className='items-center flex justify-center gap-2'>
                      <img src={`/assets/${stat}.png`} className='w-8 h-8' />
                      {((preyStat < 0) ? preyStat : '+' + preyStat)}
                  </div>
              )}            
            </div>
          </div>
          </div>
  
          <div className="bg-background text-center w-full py-1" >
            <div className='w-full text-center flex gap-5 items-center justify-center'>
              <p className='text-lg'>P{predator}</p>
              <p className='text-lg'>P{prey}</p>
            </div>
            <p className='text-4xl'>{predatorScore} : {preyScore}</p>
          </div>
          <div className='w-full bg-secondary px-5 py-5 flex flex-col justify-center items-center' style={{ flex: '1' }}>
          <div className='w-full flex pt-3'>
            <div className='bg-accent px-3 py-1 rounded-md text-secondary text-lg'>
            {predatorStat === null ? '' : (
                  <div className='items-center flex justify-center gap-2'>
                      <img src={`/assets/${stat}.png`} className='w-8 h-8' />
                      {((predatorStat < 0) ? predatorStat : '+' + predatorStat)}
                  </div>
              )}            
            </div>
          </div>
          <p className='text-2xl pb-5'>P{predator}</p>
            <D20
              number={rollNumPredator}
              prey={0}
            />
            <Button className='w-28 mt-16 !text-3xl' style={{ backgroundColor: '#FB5A48' }} onClick={handleRollPredator}>
              <p className='text-2xl'>{"Roll!"}</p>
            </Button>
          </div>
  
        </div>
  
        <Modal show={showResult} theme={modalTheme} className='h-full ' size="md" popup>
          <Modal.Header className='bg-background' />
          <Modal.Body className='bg-background'>
            <div className="text-center primary-text bg-background py-3 flex justify-center flex-col items-center gap-4">
  
              <p className="text-2xl accent-text uppercase text-accent">
                {showText}
              </p>
  
              <div className="flex justify-center gap-4 mt-3">
                <Button onClick={() => {
                  if (predatorScore == 3) {
                    const roll = Math.floor(Math.random() * 8) + 1;
                    if (preyPartsNum !== null && roll <= preyPartsNum) {
                      setShowStealResult(`P${predator} has successfully stolen a limb! Sorry P${prey}!`)
                    } else {
                      setShowStealResult(`P${predator} has failed to steal a limb! P${prey} is safe!`)
                    }
                    setShowResult(false);
                    setShowSteal(true);
                  } else if (preyScore == 3) {
                    const roll = Math.floor(Math.random() * 8) + 1;
                    if (predatorPartsNum !== null && roll <= predatorPartsNum) {
                      setShowStealResult(`P${prey} has successfully stolen a limb! Sorry P${predator}!`)
                    }
                    else {
                      setShowStealResult(`P${prey} has failed to steal a limb! P${predator} is safe!`)
                    }
                    setShowResult(false);
                    setShowSteal(true);
                  } else {
                    setRollPredator(false);
                    setRollPrey(false);
                    setRollNumPredator('?');
                    setRollNumPrey('?');
                  }
  
                }} className='w-28' style={{ backgroundColor: '#4056a1' }}>
                  {showTextButton}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
  
        <Modal show={showStat} theme={modalTheme} className='h-full ' size="md" onClose={() => setShowStat(false)} popup>
          <Modal.Header className='bg-background' />
          <Modal.Body className='bg-background'>
            {predatorStat !== null && preyStat !== null && predatorPartsNum !== null && preyPartsNum !== null &&
              <div className="text-center primary-text bg-background py-5 flex justify-center flex-col items-center gap-1">
                <p className="text-2xl accent-text text-accent mb-0">
                  This battle will use...
                </p>
                <p className="text-3xl accent-text uppercase text-accent3 my-0">
                  {statLong}!
                </p>
                <p className="text-2xl accent-text text-accent mt-0">
                  Are you ready?
                </p>
  
                <div className="flex justify-center gap-4 mt-4">
                  <Button onClick={() => setShowStat(false)} className='w-28' style={{ backgroundColor: '#4056a1' }}>
                    {"Let's go!"}
                  </Button>
                </div>
              </div>
            }
            {!(predatorStat !== null && preyStat !== null && predatorPartsNum !== null && preyPartsNum !== null) &&
              <div className="text-center primary-text bg-background py-5 flex justify-center flex-col items-center gap-1">
  
                <p className="text-3xl accent-text uppercase text-accent3 my-0">
                  Still loading... Sit tight!
                </p>
  
              </div>
            }
          </Modal.Body>
        </Modal>
  
        <Modal show={showSteal} theme={modalTheme} className='h-full ' size="md" onClose={() => window.location.href = `/view?player=${predator}`} popup>
          <Modal.Header className='bg-background' />
          <Modal.Body className='bg-background'>
            {predatorStat !== null && preyStat !== null && predatorPartsNum !== null && preyPartsNum !== null &&
              <div className="text-center primary-text bg-background py-5 flex justify-center flex-col items-center gap-1">
                <p className="text-2xl accent-text uppercase text-accent mb-0">
                  {showStealResult}
                </p>
  
                <div className="flex justify-center gap-4 mt-4">
                  <Button onClick={() => window.location.href = `/view?player=${predator}`} className='w-28' style={{ backgroundColor: '#4056a1' }}>
                    {"Go Back"}
                  </Button>
                </div>
              </div>
            }
            {!(predatorStat !== null && preyStat !== null && predatorPartsNum !== null && preyPartsNum !== null) &&
              <div className="text-center primary-text bg-background py-5 flex justify-center flex-col items-center gap-1">
  
                <p className="text-3xl accent-text uppercase text-accent3 my-0">
                  Still loading... Sit tight!
                </p>
  
              </div>
            }
          </Modal.Body>
        </Modal>
      </section>
    )
}
