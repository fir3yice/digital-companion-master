
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import D20 from '@/components/D20';
import {Button} from 'flowbite-react'
import Link from 'next/link'

export default function Homepage() {

    const [results, setResults] = useState('?');
    const [clicked, setClicked] = useState(false);
    const [choose, setChoose] = useState(false);

    const reset = () => {
        const API_URL = process.env.NEXT_PUBLIC_BACKEND
        console.log('reset called');
        fetch(`${API_URL}/api/reset`)
          .then(response => {
            if (response.ok) { 
                window.location.reload();
            } else {
                console.error('Error:', response.status);
            }
          })
          .catch(error => {
            console.error('Error:', error)
          }) 
    }

  return (
    <section className='bg-background flex min-h-screen w-full justify-center items-center'>
        <div className={`p-8 flex flex-col gap-8`}>

            <div className='w-full flex justify-center items-center'>
                <Image
                    src="/assets/logo.png"
                    width={65}
                    height={65}
                    alt="Picture of a monster limb"
                />
            </div>

        {
            !choose ? <>
            <div className='text-center flex flex-col gap-5'>
            <p className='text-accent accent-text uppercase text-4xl'>
                Know your place; Roll the die!
            </p>
        </div>

        <div className='w-full flex flex-col mt-10 flex-wrap justify-center items-center accent-text text-text'>
            <D20
                number={results} 
                prey={0}
            />
            
            {

                !clicked ? <Button className={`w-36 text-3xl accent-text mt-28`} size="4xl" style={{ backgroundColor: '#FB5A48' }} onClick={() => {
                    const API_URL = process.env.NEXT_PUBLIC_BACKEND
                    fetch(`${API_URL}/api/event/1/none`)
                      .then(response => response.json())
                      .then(data => {
                        setResults(data.roll)
                        setClicked(true);
                      })
                      .catch(error => {
                        console.error('Error:', error)
                      })

                  }}>
                    {"ROLL!"}
                  </Button> : 
                    
                   
                    <Button className={`w-36 text-3xl accent-text mt-28`} size="4xl" style={{ backgroundColor: '#4056a1' }} onClick={() => setChoose(true)}>
                        {"OKAY!"}
                    </Button>
                    

            }
            

        </div>
        </> : 

            <>
                    <div className='text-center flex flex-col gap-5'>
                        <p className='text-accent accent-text uppercase text-4xl'>
                            Choose a player number
                        </p>
                        <p className='text-gray-300 primary-text text-sm'>
                            Proceed with the game by <br/> selecting the number equal to your position in turn order. 
                        </p>
                    </div>

                    <div className='w-full flex mt-5 gap-5 flex-wrap justify-center'>
                        <Link href="/view?player=1">
                            <div className='mt-3 bg-gradient-to-b from-accent2 accent-text rounded-lg w-36 h-40 flex justify-center items-center hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150'>
                                    <p className='text-8xl font-bold text-accent2'>
                                        1
                                    </p>
                            </div>
                        </Link>
                    
                    <Link href="/view?player=2">
                            <div  className='mt-3 bg-gradient-to-b from-primary accent-text rounded-lg w-36 h-40 flex justify-center items-center hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150'>
                                <p className='text-8xl font-bold text-primary'>
                                    2
                                </p>
                            </div>
                        </Link>
                        
                        <Link href="/view?player=3">
                            <div className='bg-gradient-to-b from-accent3 mt-3 accent-text rounded-lg w-36 h-40 flex justify-center items-center hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150'>
                                <p className='text-8xl font-bold text-accent3'>
                                    3
                                </p>
                            </div>
                    </Link>

                    <Link href="/view?player=4">
                            <div className='bg-gradient-to-b from-accent mt-3 accent-text rounded-lg w-36 h-40 flex justify-center items-center hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150'>
                                <p className='text-8xl font-bold text-accent'>
                                    4
                                </p>
                            </div>
                        </Link>

                        <Button className={`w-36 text-2xl accent-text mt-16 p-2`} size="4xl" style={{ backgroundColor: '#4056a1' }} onClick={() => reset()}>
                        {"RESET GAME"}
                    </Button>


                    </div>

           </>
       

        }
           

        </div>
    </section>
  )
}
