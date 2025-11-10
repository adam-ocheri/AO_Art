import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-scroll'
import GenericOverlay from '../overlays/genericOverlay/GenericOverlay'

export default function Navbar({windowSize, SV_Visible, setSV_Visible, handleSmallNavigation, visibleSection} : {windowSize: {window_x:number, window_y:number}, SV_Visible: boolean, setSV_Visible: any, handleSmallNavigation: any, visibleSection: string}) {
  
    const {window_x} = windowSize;

    return (
    <>
    { window_x <= 500 && <GenericOverlay active={SV_Visible} updateVisibilityState={() => setSV_Visible(false)} visibleSection={visibleSection}/>}
      <div className='nav'>
        <img className='logo-img' src='/aologo.png' height='40px' width='45px' alt='logo'/>
        {window_x > 500 ? 
        <ul className='navigation'>
          <li>
            <Link
              className='nav-link font-1'
              activeClass="visible"
              to="home"
              spy={true}
              smooth={true}
              offset={-50}
              duration={700}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className='nav-link font-1'
              activeClass="visible"
              to="about"
              spy={true}
              smooth={true}
              offset={-50}
              duration={700}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className='nav-link font-1'
              activeClass="visible"
              to="programming"
              spy={true}
              smooth={true}
              offset={-150}
              duration={700}
            >
              Programming
            </Link>
          </li>
          <li>
            <Link
              className='nav-link font-1'
              activeClass="visible"
              to="3d"
              spy={true}
              smooth={true}
              offset={-150}
              duration={700}
            >
              3D Art
            </Link>
          </li>
          <li>
            <Link
              className='nav-link font-1'
              activeClass="visible"
              to="music"
              spy={true}
              smooth={true}
              offset={-150}
              duration={700}
            >
              Music
            </Link>
          </li>
          <li>
            <Link
              className='nav-link font-1'
              activeClass="visible"
              to="contact"
              spy={true}
              smooth={true}
              offset={-150}
              duration={700}
            >
              Contact
            </Link>
          </li>
        </ul> 
        : 
        <div className='small-nav'>
          {/* <img className='small-nav-img' src='/aologo.png' height='40px' width='45px' alt='nav' onClick={() => {handleSmallNavigation()}}/> */}
          <Icon icon='fluent:navigation-16-filled' className="m2 small-nav-img" onClick={() => {handleSmallNavigation()}}/>
        </div>}
      </div></>
  )
}
