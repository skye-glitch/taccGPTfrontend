"use client";
import React from 'react'
import Image from 'next/image'
import Logo from "@/public/images/TACC-logo.svg"
import Ranking from "@/public/images/ranking-icon.svg"
import Link from 'next/link'
import * as Ariakit from "@ariakit/react";
import Home from "@/public/images/home-1-svgrepo-com.svg"
import DropDown from './DatabaseDropDown';
import style from "./DropDown.module.css"
// import '../../public/images/TACC-logo.svg'
const Header = (props) => {

  return (
    <nav className='fixed top-0 left-0 right-0 w-full bg-white item-center tracking-wider z-10 shadow '>
      <div className='flex justify-between item-center w-full h-full px-2 2xl:px-8'>
        <Link href='/' as={'image'}>
          <Image src={Logo} alt='TACC-logo' className='cursor-pointer' height={80} priority={true} placeholder="blur" blurDataURL={'../../public/images/TACC-logo.svg'}></Image>
        </Link>
        <div className='mr-auto ml-25 relative h-full  mt-5 '>
          <ul className='flex'>
            <Link href='/' passHref>
                <li className='ml-5 hover:border-b text-xl'>
                  <Ariakit.Button className={style.button}>
                    <Image src={Home} width={30} height={30} alt="Home" />
                    Home
                  </Ariakit.Button>
                </li>
              </Link>
            
            <Link href='/Ranking' passHref>
              <li className='ml-5 mr-5  hover:border-b text-xl'>
                <Ariakit.Button className={style.button}>
                  <Image src={Ranking} width={30} height={30} alt="Ranking" />
                  Ranking
                </Ariakit.Button>
              </li>
            </Link>
            
            <DropDown />
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header