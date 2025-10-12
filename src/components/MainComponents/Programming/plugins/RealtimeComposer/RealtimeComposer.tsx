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
                                        <div className='flex f-wrap j-even'>

                                            <img alt='realtime composer plugin preview' src={'../../rc-docs/rcdoc-midi-track-editor.png'} style={{flex: '1 1 300px', maxWidth: '100%'}} />
                                            <img alt='realtime composer plugin preview' src={'../../RC1_L.jpg'} style={{flex: '1 1 300px', maxWidth: '100%'}} />
                                        </div>
                                    </div>
                                    <div className='font-1 s2 ' style={{ textAlign: 'left' }}>
                                        <br />
                                        Building on top of the unreal engine audio mixer system, Realtime Composer grants game developers all of the tools they need to have full control over their sonic experiences.
                                        <br />
                                        Core Features:
                                        <ul>
                                            <li>Music Orchestration</li>
                                            <li>Music Composition</li>
                                            <li>Audio Mixing</li>
                                            <li>Sound Processing</li>
                                        </ul>
                                        <br />
                                    </div>
                                    <div className='font-1 s2 ' style={{ textAlign: 'left' }}>
                                        <h2>Development Roadmap</h2>
                                        <div className='font-1 s2 ' style={{ textAlign: 'left', margin: '20px' }}>
                                            <h4>Version 0.8.0 <span className='font-9 s1' style={{ marginLeft: '10px', color: 'rgba(34, 34, 34, 1.0)', backgroundColor: 'rgba(0, 255, 0, 0.97)', padding: '2px 4px', borderRadius: '8px' }}> UPCOMING VERSION</span></h4> 
                                            <ul>
                                                <li>MIDI tracks shifting 
                                                    <div>
                                                        Time shifting MIDI tracks when they are shorter than the base loop
                                                        <br />
                                                        For example, in a loop of 8 Bars, if a track length is 4 Bars, then it can "shift" and play 2 times; once starting at the beginning of the loop, and once starting at the 4th Bar
                                                    </div>
                                                </li>
                                                <li>Drum Track Editor 
                                                    <div>
                                                        Similar to the existing MIDI track editor, but for drum tracks - enabling users to create beats and drum patterns directly in the engine
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='font-1 s2 ' style={{ textAlign: 'left', margin: '20px' }}>
                                            <h4>Version 0.9.0</h4>
                                            <ul>
                                                <li>PhysicalSynthComponent
                                                    <div>
                                                        a component that allows for the tracking of velocity of Actors or Skeletal Mesh joints, used for driving a synthsized sound generated realtime by the velocity value and preset audio parameters
                                                    </div>
                                                </li>
                                                <li>MusicalState Asset editor 
                                                    <div>
                                                        a new asset editor for easily creating and managing MusicalStates
                                                    </div>
                                                </li>
                                                <li>SubCollection Asset editor 
                                                    <div>
                                                        a new asset editor for easily creating and managing SubCollections
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='font-1 s2 ' style={{ textAlign: 'left', margin: '20px' }}>
                                            <h4>Version 1.0.0</h4>
                                            <ul>
                                                <li>
                                                    MCP Server Integration 
                                                    <div>
                                                        a self sustained containerized server that allows for the music creation of MIDI+Drum tracks. 
                                                        <br />
                                                        Users with Nvidia GPUs will be able to uttilize Docker technology to locally host the MCP model with seamless integration, for free
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='p5 m5 font-9 s3 j-even'>
                                        <span>Watch demo</span>
                                        <div >
                                            <iframe className='vid-frame' src="https://www.youtube.com/embed/UE3vkvO2O_Y" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                        </div>
                                    </div>

                                </div>

                            </section>

                        </div>
                    </div>}
            </div>
        </>
    )
}