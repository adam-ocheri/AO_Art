import React, { useEffect, useState } from 'react'
import X_Scroller from '../../primitives/scrollers/sideScroller/X_Scroller'
import { Icon } from '@iconify/react'
import GenericCanvas from '../../BackgroundScene/Canvas3D/GenericCanvas'
import ArchCanvas from '../../BackgroundScene/Canvas3D/ArchCanvas'

export default function Art3D({ windowSize }: { windowSize: { window_x: number, window_y: number } }) {

  const [imageView, setImageView] = useState({
    id: -1,
    active: false,
    src: ''
  })

  const [imgFMT, setImgFMT] = useState('normal');



  const onImageViewChange = (id: any, active: boolean, src: string) => {
    setImageView({ id, active, src });
  }

  useEffect(() => {
    adjustToWindowSize();
  }, [windowSize])

  useEffect(() => {
    if (imageView.active) {
      setImageView((prev) => ({
        ...prev,
        src: `hs-imgs/e${imageView.id + 1}-${imgFMT}.jpg`
      }));
    }
  }, [imgFMT])



  const updateImageView = (e: any) => {
    console.log(e)
    if (e.target.nodeName !== 'ARTICLE' && e.target.nodeName !== 'IMG' && e.target.nodeName !== 'path' && e.target.nodeName !== 'svg') {
      setImageView({ id: -1, active: false, src: '' });
    }
  }

  const adjustToWindowSize = () => {
    let imgFormat = ''

    if (windowSize.window_x >= 1920) {
      imgFormat = 'max'
    }
    else if (windowSize.window_x >= 1300) {
      imgFormat = 'normal'
    }
    else if (windowSize.window_x >= 1000) {
      imgFormat = 'square'
    }
    else if (windowSize.window_x < windowSize.window_y) {
      imgFormat = 'mobile'
    }
    else {
      imgFormat = 'normal'
    }
    setImgFMT(imgFormat);
    return imgFormat;
  }

  const navigateImageGallery = (direction: number) => {

    if (imageView.id + direction >= 0 && imageView.id + direction <= 4) {

      let imgFMT = adjustToWindowSize();

      console.log(imgFMT)
      setImageView((prev) => ({
        active: true,
        id: imageView.id + direction,
        src: `hs-imgs/e${imageView.id + direction + 1}-${imgFMT}.jpg`
      }));
    }
  }

  const [canvasOverlay, setCanvasOverlay] = useState({
    canvasId: '',
    active: false
  })

  const streamCanvasOverlay = ({ canvasId, active }: { canvasId: string, active: boolean }) => {
    setCanvasOverlay({ canvasId, active });
  }

  const updateCanvasStreamState = (e: any) => {
    if (e.target.nodeName === 'DIV') {
      setCanvasOverlay({ canvasId: '', active: false })
    }
  }

  useEffect(() => {
    if (canvasOverlay.active) {
      console.log('active canvas updated to', canvasOverlay.canvasId)
    }
  }, [canvasOverlay])

  return (
    <section id='3d' className='mt5 mb5 pb5' >
      <div className='mt6 skill-img-container' style={{ backgroundColor: 'black' }} >
        <img className='skill-img' src='/skill_3d.png' alt='3d art' />
      </div>
      <div >
        <div style={{ position: 'relative' }} className='cg-back'>
          <GenericCanvas hidden={canvasOverlay.active} />

          <div onMouseDown={(e) => { updateCanvasStreamState(e) }}
            className={`arch-canvas-overlay ${!canvasOverlay.active ? 'stream-off' : ''}`}
          >
            {canvasOverlay.active && <ArchCanvas hidden={!canvasOverlay.active} building={canvasOverlay.canvasId} />}
          </div>

          <div className={`project-details ${!imageView.active ? 'details-off' : ''}`} onClick={(e) => { updateImageView(e) }}>
            {imageView.active &&
              <article className='project-article' style={{ backgroundColor: 'black', border: '20px solid white', width: '70vw', height: '70vh', position: 'absolute', zIndex: 2 }}>
                <img src={imageView.src} alt='s' className='nav-img' />

                <article className='overlay-nav-t'>
                  <Icon icon='ic:round-navigate-before' className={`m2 ${imageView.id === 0 ? 'nav-btn-deactivated' : 'overlay-nav-btn'}`} width={'64px'} onClick={() => navigateImageGallery(-1)} />
                  <Icon icon='ic:round-navigate-next' className={`m2 ${imageView.id === 4 ? 'nav-btn-deactivated' : 'overlay-nav-btn'}`} width={'64px'} onClick={() => navigateImageGallery(1)} />
                </article>


              </article>}
          </div>

          <div className="p5" style={{ backgroundColor: 'rgba(240, 248, 255, 0.00)' }}>
            <article className="font-1 s2 area-text p1 m2">
              <div className='flex j-center'>

              </div>
              Sitting at the crossroads of computer science, complex math, and visual arts, Computer Graphics is a steep mountain to climb. It is a formidable domain,
              with countless of sub-domains that stem from it as a result of the multitude of complexities that it involves, from numerous 3D modeling techniques and
              processes, to texturing, rigging, animation and rendering. <br />
              However, tremendous efforts are often followed by an accommodating reward to match - and that reward is the joy of creating worlds, the creation of
              living characters, with inspiring stories and relatable histories. <br />
              As such, 3D art is a craft that pushes the limits of imagination for both the ones who put it together, as well as the ones who get to experience it.

            </article>
            {/* <img onClick={() => {streamCanvasOverlay({canvasId: 'factory', active: true})}}  src="3d2.png" alt="img" className="hero-img m2"/>
                <img onClick={() => {streamCanvasOverlay({canvasId: 'library', active: true})}} src="3d1.png" alt="img" className="hero-img m2"/> */}
            <section className='tour-img-container'>
              <div onClick={() => { streamCanvasOverlay({ canvasId: 'library', active: true }) }} className='m2 portal-3d portal-1'>
                <p className='font-9 teal'>
                  TAKE A TOUR
                </p>
              </div>

              <div onClick={() => { streamCanvasOverlay({ canvasId: 'factory', active: true }) }} className='m2 portal-3d portal-2'>
                <p className='font-9 teal'>
                  TAKE A TOUR
                </p>
              </div>
            </section>

            <article className="font-1 s2 area-text p3 m7">
              Earnestly learning more, with a longstanding awe, I am constantly honing numerous Computer Graphics skills, aiming towards the 3D Generalist
              approach. The inter-connectivity of the plethora of sub-domains in CG means I can not and will not commit to pursuing specific mastery and
              proficiency in none of these sub domains - since they are all equally fascinating and paramount for any 3D rendering production pipeline.
              <div className='flex j-center'>
                {/* <GenericCanvas/> */}
              </div>
            </article>
            <X_Scroller onImageViewChange={onImageViewChange} imageView={imageView} imgFormat={imgFMT} />
            {/* <a href="/#"> Portfolio </a> */}
          </div>
          <p className="font-6 p2 s1 area-text-skills flex f-wrap j-even">
            <span>Blender</span> | <span>Maya</span> | <span>Substance Painter</span> | <span>Substance Designer</span> | <span>Unreal Engine</span> | <span>Three.js</span>
          </p>
        </div>
        <section style={{ marginTop: '20px', paddingTop: '20px' }}>
          <div className="swa">
            <Icon icon='logos:blender' className="m2 skill-icon" />
            <Icon icon='vscode-icons:file-type-maya' className="m2 skill-icon" />
            <img src="sp.png" alt="img" className="m2 skill-icon" />
            <img src="sd5.png" alt="img" className="m2 skill-icon" />
            <Icon icon='logos:unrealengine' className="m2 skill-icon" />
          </div>
        </section>
      </div>
    </section>
  )
}
