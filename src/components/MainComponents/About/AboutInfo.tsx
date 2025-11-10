import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-scroll';

export default function AboutInfo() {
    
  const info_0 = ` Hi, my name is Adam. I am a software engineer and artist with years of experience and an ever growing passion for creation.
  As a little kid, I remember myself forcing my parents to write down stories I came up with before learning how to read and write, and
  even "accidentally" breaking down toys and electrical devices - completely destroying them - just to see how they were built. (Sorry mom!) `;
  const info_1 = ` Growing up over the years, I had discovered music as a powerful medium through which my urge for creation and conveying stories could be expressed.
  I had studied various instruments in dedication, formed bands and toured at live concerts, studied modern musical production tools and techniques,
  and had the pleasure of composing music for live theatre and contemporary dance routines, as well as the opportunity to pass on my knowledge to
  some extremely passionate and talented young students.`;
  const info_2 = ` As a detail-oriented individual with strong affinity for technical challenges and critical thinking, I had found myself falling in love with the
  world of software engineering, completely immersed, horrified and amazed by the infinity of possibilities that could be unleashed with programming 
  as a tool at my disposal. My passion for creation has forced me into another endless pursuit, where my new journey began with Game Development in
  C++ and Unreal Engine, as well as some extensive detours into the realm of Computer Graphics, learning 3D modeling and rendering tools.
  As time passed, my interest and curiosity had expanded into numerous development domains, and have successfully completed the Fullstack 
  web development program at Masterschool, an amazingly comprehensive program which I was fortunate to have participated in, where I cultivated
  invaluable programming experience, further pushing the boundaries of my imagination and creativity, demystifying one bug at a time, persistently and 
  steadily, expanding and revealing new horizons within the world of software engineering.`;

  const [print_info, print_setInfo] = useState('');
  const [print_index, print_setIndex] = useState(0);



  useEffect(()=> {
    print_setIndex(0)
  }, [])

  useEffect(() => {
    if(print_index >= 0 && print_index <= 2){
      switch (print_index){
        case 0: print_setInfo(info_0); break;
        case 1: print_setInfo(info_1); break;
        case 2: print_setInfo(info_2); break;
      }
    }
  }, [print_index, info_0, info_1, info_2])


  const handleAboutIndexUpdate = (direction: number) => {
    if (print_index + direction >= 0 && print_index + direction <= 2){
      print_setIndex(prev => prev + direction)
    }
  }

  return (
    <section className='mt5 mb5 pb5' id='about' style={{paddingTop: '15%', marginBottom: '25%'}}>
      <div>
        <Link
          to="programming"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
        >
          <button className={`nav-button font-1 s2 btn-left `}>Programming</button>
        </Link>
        
        <Link
          to="3d"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
        >
          <button className={`nav-button font-1 s2 btn-middle`} >3D Art</button>
        </Link>

        <Link
          to="music"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
        >
          <button className={`nav-button font-1 s2 btn-right $`} >Music</button>
        </Link>

        <div className='flex j-center'>
          <article className='pt5 about black' style={{minHeight: '70vh'}}>
            <h3 className='m7 font-7 s4 black'>About Me</h3>
            <div className='m7 overlay-nav'>
              <Icon icon='ic:round-navigate-before' className={`m2 ${ print_index === 0 ? 'nav-btn-deactivated' : 'overlay-nav-btn'}`} width={'64px'} onClick={() => handleAboutIndexUpdate(-1)} />
              <Icon icon='ic:round-navigate-next' className={`m2 ${ print_index === 2 ? 'nav-btn-deactivated' : 'overlay-nav-btn'}`} width={'64px'}onClick={() => handleAboutIndexUpdate(1)} />
            </div>
            <p className='m7 p7 font-1 s2 jt-left black'>
              {print_info}
            </p>
          </article>
          
        </div>
      </div>
    </section>
  )
}
