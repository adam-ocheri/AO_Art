import { Icon } from '@iconify/react'
import React from 'react'

export default function FractalTitle() {
    return (
        <div id='home'>

            <h1 className='font-9 s-vw1 main-title'>Fractal Distortion</h1>
            <h2 className='font-9 s4 flex f-wrap j-even'><span className='tech-art'>VST3 Plugin</span></h2>

            <div className='font-9 s3 flex f-wrap j-even m5'>

                <div>
                    <span>Watch demo</span>
                    <a href='https://www.youtube.com/watch?v=3Rkq0WPMDP8' target='_blank' rel='noreferrer'>
                        {/* <Icon icon='mdi:link-box-variant' width={'64px'} className='link-icon' /> */}
                        <Icon icon='carbon:media-library-filled' width={'64px'} className='link-icon' />
                    </a>
                </div>
                <div >
                    <span>Download for free!</span>
                    <a href='/scavangers.mp4' target='_blank' rel='noreferrer'>
                        {/* <Icon icon='mdi:link-box-variant' width={'64px'} className='link-icon' /> */}
                        <Icon icon='line-md:download-outline-loop' width={'64px'} className='link-icon' />
                    </a>
                </div>
            </div>

        </div>
    )
}
