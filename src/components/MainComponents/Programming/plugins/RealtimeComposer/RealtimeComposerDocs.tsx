
import { Icon } from '@iconify/react'

export default function RealtimeComposerPluginDocs() {

    return (
        <>
            <div className="canvas-container">
                {true &&
                    <div className="flex j-center">
                        <div className="f-dir-col jt-center p5 b-img-realtime-composer-title" >

                            {/* Back button */}
                            <div className='font-9 s3 flex f-wrap f-dir-col j-even jt-left'>
                                <div className='font-9 s3 flex f-wrap f-dir-col j-even jt-center' style={{ maxWidth: '128px' }}>

                                    <span>Back</span>
                                    <a href='/plugins/realtime-composer' > {/* target='_blank' rel='noreferrer'> */}

                                        {/* <Icon icon='mdi:link-box-variant' width={'64px'} className='link-icon' /> */}
                                        <Icon icon='ph:key-return-fill' width={'64px'} className='link-icon' />
                                    </a>
                                </div>
                            </div>


                            <div id='home'>

                                <h1 className='font-9 s-vw1 main-title'>Realtime Composer</h1>
                                <h2 className='font-9 s4 flex f-wrap j-even'><span className='tech-art'>Unreal Engine Plugin</span></h2>

                            </div>

                            <section>
                                <div className='area-text p4 mt6'>
                                    <h2>Getting Started</h2>
                                    <h3>Installation</h3>
                                    <p>
                                        To install the Realtime Composer plugin, you need to download the plugin from the Unreal Engine Marketplace.
                                    </p>
                                    <h3>Setup</h3>
                                    <p>
                                        To setup the Realtime Composer plugin, you need to create a new project and add the plugin to the project.
                                    </p>
                                    <h3>Usage</h3>
                                    <p>
                                        To use the Realtime Composer plugin, you need to create a new project and add the plugin to the project, or use the plugin in an existing project.
                                    </p>
                                </div>

                            </section>
                        </div>
                    </div>}
            </div>
        </>
    )
}