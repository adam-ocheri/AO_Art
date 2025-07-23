import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-scroll'

export default function RealtimeComposerTitle() {
    return (
        <div id='home'>

            <h1 className='font-9 s-vw1 main-title'>Realtime Composer</h1>
            <h2 className='font-9 s4 flex f-wrap j-even'><span className='tech-art'>Unreal Engine Plugin</span></h2>

            <div className='font-9 s3 flex f-wrap j-even' style={{ margin: '160px' }}>

                <div>
                    <span>Demo</span>
                    <a href='https://www.youtube.com/watch?v=UE3vkvO2O_Y' target='_blank' rel='noreferrer'>
                        {/* <Icon icon='mdi:link-box-variant' width={'64px'} className='link-icon' /> */}
                        <Icon icon='carbon:media-library-filled' width={'64px'} className='link-icon' />
                    </a>
                </div>
                <div >
                    <span>Docs</span>
                    <a href='/plugins/realtime-composer/docs' > {/* target='_blank' rel='noreferrer'> */}

                        {/* <Icon icon='mdi:link-box-variant' width={'64px'} className='link-icon' /> */}
                        <Icon icon='material-symbols:docs' width={'64px'} className='link-icon' />
                    </a>
                </div>
                <div >
                    <span>Get*</span>
                    <a href='/plugins/realtime-composer#' > {/* target='_blank' rel='noreferrer'> */}

                        {/* <Icon icon='mdi:link-box-variant' width={'64px'} className='link-icon' /> */}
                        <Icon icon='line-md:download-outline-loop' width={'64px'} className='link-icon' />
                    </a>
                </div>
            </div>

        </div>
    )
}
