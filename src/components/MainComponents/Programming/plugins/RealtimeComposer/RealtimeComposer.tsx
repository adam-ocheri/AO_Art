import RealtimeComposerTitle from "./RealtimeComposerTitle"
import { Icon } from '@iconify/react'

export default function RealtimeComposerPlugin() {

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
                                    <a href='/' > {/* target='_blank' rel='noreferrer'> */}

                                        {/* <Icon icon='mdi:link-box-variant' width={'64px'} className='link-icon' /> */}
                                        <Icon icon='ph:key-return-fill' width={'64px'} className='link-icon' />
                                    </a>
                                </div>
                            </div>


                            <RealtimeComposerTitle />
                            <section>
                                <div className='area-text p4 mt6'>
                                    <div className='font-1 s2' style={{ textAlign: 'left' }}>
                                        The Realtime-Composer UE plugin is a high level music orchestrator, channel mixer and DSP processor.
                                        <br />
                                        At it's core, it is based on the native Quartz clock system, to provide sample-accurate timing of musical cues and events, allowing easy orchestration and musical state management, always precise on musical time - all in realtime.
                                        <br />
                                        Additionally, channel mixing can be applied to balance the audio elements within a project, including any non-musical game 3D audio - with the ability to cast DSP effects on the audio channels.
                                        <br />
                                        The Realtime Composer plugin is built to allow UE game developers seamless integration with their music event handling, while granting full control over the audio mixing and processing for the entire game.
                                        <br />
                                    </div>
                                    <div className='font-1 p5 m5'>
                                        <img alt='realtime composer plugin preview' src={'../../RC1_L.jpg'} width={'85%'} />
                                    </div>
                                    <div className='font-1 s2 ' style={{ textAlign: 'left' }}>
                                        <br />
                                        Building on top of the unreal engine audio mixer system, Realtime Composer grants game developers all of the tools they need to have full control over their sonic experiences.
                                        <br />
                                        Core Features:
                                        <ul>
                                            <li>Music Orchestration</li>
                                            <li>Music Composition</li>
                                            <li>Sound Mixing</li>
                                            <li>Sound Processing</li>
                                        </ul>
                                        <br />
                                    </div>

                                    <div className='p5 m5 font-9 s3 j-even'>
                                        <span>Watch demo</span>
                                        <div >
                                            <iframe className='vid-frame' src="https://www.youtube.com/embed/UE3vkvO2O_Y" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                        </div>
                                    </div>

                                    <span className='font-9 p5 mt5 m3'>* Plugin is still under development, and will soon be available on the Unreal Engine Fab Marketplace, including documentation and setup examples</span>
                                </div>

                            </section>

                        </div>
                    </div>}
            </div>
        </>
    )
}