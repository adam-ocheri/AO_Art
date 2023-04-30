// import { useState } from "react";

import { useEffect, useRef, useState } from "react";

export default function X_Scroller({onImageViewChange, imageView} : any) {

    const images : string [] = [
        'hs-imgs/e1-normal.jpg', 'hs-imgs/e2-normal.jpg',
        'hs-imgs/e3-normal.jpg', 'hs-imgs/e4-normal.jpg', 'hs-imgs/e5-normal.jpg', 
    ]

    const scrollerRef : any = useRef(null);
  
    useEffect(() => {
      
    }, [imageView])

  return (
    <div className="flex j-center">
        <div ref={scrollerRef} className="scroll-container" >
        {images.map((img : string, index : number) => (
            <img className="scroll-img" onClick={() => onImageViewChange(index, true, images[index])} key={index} src={img} alt={`${index}`} width={window.innerWidth*0.25}  style={{maxWidth: '25vw', margin: '1vw', cursor:'pointer'}}/> //style={{maxWidth: window.innerWidth/4, padding: window.innerWidth*0.005, cursor:'pointer'}}
        ))}
        </div>
    </div>
    
  );
}

