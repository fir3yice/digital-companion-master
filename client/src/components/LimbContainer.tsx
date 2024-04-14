import React, { useState } from 'react'
import Image from 'next/image'
import { MdDelete } from "react-icons/md";
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSearchParams } from 'next/navigation'
import type { CustomFlowbiteTheme } from "flowbite-react";
import { SlArrowDown } from "react-icons/sl";


export default function LimbContainer({ limb, playerNow, fetchData }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams()
  const playerNum = searchParams?.get('player') ?? '';


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleModal = (e) => {
    e.stopPropagation();
    setOpenModal(true);
  }


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

  return (
    <div className='w-full flex items-center justify-center'>
      <div className={` w-full ${limb.color} flex justify-center flex-col  items-center rounded-md p-3 mt-4 ${isDropdownOpen ? 'h-0 overflow-hidden hidden' : 'h-auto'}`} onClick={toggleDropdown}>
        <div className='w-full text-center flex items-center'>
          <span
            style={{
              width: '40%',
              height: '90px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Image
              src={`/assets/${limb.code}.png`}
              width={90}
              height={90}
              alt={limb.name}
              style={{
                width: 'auto',
                height: '90px',
              }}
            />
          </span>
          <div className='w-full'>
            <p className='text-lg accent-text uppercase'>
              {limb.name}
            </p>
            <p className='text-base'>
              {limb.code} | {limb.race}
            </p>
          </div>
          {playerNum == playerNow &&
            <MdDelete className='text-4xl' onClick={(e) => handleModal(e)} />
          }
          {playerNum != playerNow &&
            <MdDelete className='text-4xl invisible' onClick={(e) => handleModal(e)} />
          }

        </div>
        <SlArrowDown className='text-xl' />
      </div>

      {isDropdownOpen && (
        <div className={`${limb.color} rounded-md p-3 mt-4 grid grid-cols-3 gap-2 transition-height duration-500 ease-in-out`}
          onClick={toggleDropdown}>
          <div className='col-span-1 w-full text-center'>
            <Image
              src={`/assets/${limb.code}.png`}
              width={90}
              height={90}
              alt={limb.name}
            />
            <p className='text-base mt-3 accent-text uppercase'>
              {limb.name}
            </p>
            <p className='text-sm'>
              {limb.code}
            </p>
          </div>
          <div className='col-span-2 ml-3'>
            <div className={`w-full flex justify-between ${limb.colorbg} py-1 rounded-md px-4`}>
              <p>STR</p>
              <p>{limb.str}</p>
            </div>
            <div className={`w-full flex mt-2 justify-between ${limb.colorbg} py-1 rounded-md px-4`}>
              <p>SPE</p>
              <p>{limb.spe}</p>
            </div>
            <div className={`w-full flex mt-2 justify-between ${limb.colorbg} py-1 rounded-md px-4`}>
              <p>DEF</p>
              <p>{limb.def}</p>
            </div>
            <div className={`w-full flex mt-2 justify-between ${limb.colorbg} py-1 rounded-md px-4`}>
              <p>CHA</p>
              <p>{limb.cha}</p>
            </div>
          </div>
        </div>
      )}

      <Modal theme={modalTheme} show={openModal} className='h-full ' size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header className='bg-background' />
        <Modal.Body className='bg-background'>
          <div className="text-center primary-text bg-background">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-accent3" />
            <h3 className="mb-5 text-lg font-normal text-text">
              Are you sure you want to delete the {limb.name}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => {
                const API_URL = process.env.NEXT_PUBLIC_BACKEND

                fetch(`${API_URL}/api/remove/${playerNum}/${limb.code}`, { method: 'DELETE' })
                  .then(response => {
                    if (response.status === 200) {
                      fetchData();
                      setOpenModal(false);
                    } else {
                      console.error('Error:', response)
                    }
                  })
                  .catch(error => {
                    console.error('Error:', error)
                  })
                setOpenModal(false)
              }}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, I want it!
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
