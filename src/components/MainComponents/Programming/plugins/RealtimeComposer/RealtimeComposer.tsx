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

                                            <img alt='realtime composer plugin preview' src={'../../rc-docs/rcdoc-midi-track-editor.png'} style={{flex: '1 1 300px', maxWidth: '60%'}} />
                                            <img alt='realtime composer plugin preview' src={'../../RC1_L.jpg'} style={{flex: '1 1 300px', maxWidth: '60%'}} />
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
                                            <h4>Version 0.7.0 <span className='font-9 s1' style={{ marginLeft: '10px', color: 'rgba(34, 34, 34, 1.0)', backgroundColor: 'rgba(0, 255, 0, 0.97)', padding: '2px 4px', borderRadius: '8px' }}> UPCOMING VERSION</span></h4> 
                                            <ul>
                                                <li> MIDI Track Asset Editor
                                                    <div>
                                                        This is a major update that introduces a Midi asset editor (DAW-like piano roll) used for creating midi tracks that can be used in runtime.
                                                        <br />
                                                        The asset comes with a Sound-Design editor that allows for controlling the synthesizer parameters driving the generated sound.
                                                        <br />
                                                        Additionally, parameters can be modulated via an Automations panel, allowing for the automating the modulation of audio parameters over time.
                                                    </div>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                        <div className='font-1 s2 ' style={{ textAlign: 'left', margin: '20px' }}>
                                            <h4>Version 0.7.5 </h4> 
                                            <ul>
                                                <li> MIDI Track Control Widget in the RC Runtime Debug Console
                                                    <div>
                                                        This update will introduce a panel for creating/modifying MidiTracks in the Runtime Debug Console.
                                                        <br />
                                                        Internally, this would establish "Parameter Bounds" for float and int32 MetaSound Graph Input audio parameters.
                                                        <br/> 
                                                        This is crucial for both having knobs in the UI (also in the SoundDesign editors) being limited to a parameter's lower and upper bounds, as well as clamping the values to prevent critical parameters such as volume outputs from potentially going up to undersired high levels that may end up causing actual phyical damage to the speakers (and to the listener's ears!).
                                                    </div>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                        <div className='font-1 s2 ' style={{ textAlign: 'left', margin: '20px' }}>
                                            <h4>Version 0.8.0</h4> 
                                            <ul>
                                                <li>Drum Track Editor 
                                                    <div>
                                                        Similar to the existing MIDI track editor, but for drum tracks - enabling users to create beats and drum patterns directly in the engine.
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='font-1 s2 ' style={{ textAlign: 'left', margin: '20px' }}>
                                            <h4>Version 0.8.5</h4> 
                                            <ul>
                                                <li>MIDI tracks shifting 
                                                    <div>
                                                        Time shifting MIDI tracks when they are shorter than the base loop.
                                                        <br />
                                                        For example, in a loop of 8 Bars, if a track length is 4 Bars, then it can "shift" and play 2 times; once starting at the beginning of the loop, and once starting at the 4th Bar.
                                                    </div>
                                                </li> 
                                            </ul>
                                        </div>
                                        <div className='font-1 s2 ' style={{ textAlign: 'left', margin: '20px' }}>
                                            <h4>Version 0.9.0</h4>
                                            <ul>
                                                <li>MusicalState Asset editor 
                                                    <div>
                                                        a new asset editor for easily creating and managing MusicalStates.
                                                    </div>
                                                </li>
                                                <li>SubCollection Asset editor 
                                                    <div>
                                                        a new asset editor for easily creating and managing SubCollections.
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='font-1 s2 ' style={{ textAlign: 'left', margin: '20px' }}>
                                            <h4>Version 0.9.5</h4>
                                            <ul>
                                                <li>PhysicalSynthComponent
                                                    <div>
                                                        a component that allows for the tracking of velocity of Actors or Skeletal Mesh joints, used for driving a synthsized sound generated realtime by the velocity value and preset audio parameters.
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
                                                        Users with Nvidia GPUs will be able to uttilize Docker technology to locally host the MCP model with seamless integration, for free.
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='font-1 s2 ' style={{ textAlign: 'left', margin: '20px' }}>
                                            <h4>Version 1.0.1</h4>
                                            <ul>
                                                <li>
                                                    Tangent interpolation support for Automations in RC Asset Editors
                                                    <div>
                                                        Update to allow for interploation between keyframes in the Automation editor panels.
                                                    </div>
                                                </li>
                                                <li>
                                                    Support for multiple vertices transformations in the Automation editor panels
                                                    <div>
                                                        Update to allow for multiple selection of vertices in the Automation editor panels, supporting simultaneous transformation of all selected vertices
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='font-1 s2 ' style={{ textAlign: 'left', margin: '20px' }}>
                                            <h4>Version 1.0.2</h4>
                                            <ul>
                                                <li>
                                                    Support Automations for Bool and Int32 Parameters
                                                    <div>
                                                        Currently, Automations are only supported for Float parameters. This update will add support for Bool and Int32 parameters.
                                                    </div>
                                                </li>
                                                <li>
                                                    Support a global StateCollection hierarchy
                                                    <div>
                                                        Up until now, MusicalStates were exclusive, encapsulated states with no way to access other states from outside of them. 
                                                        <br />
                                                        This update will introduce a global StateCollection hierarchy, adding a global State that is always active by default, with seperated specific controls.
                                                        <br />
                                                        The reason for this feature is to enable having audio channels and tracks that are not bound to any specific MusicalState, and can be controlled via the global StateCollection hierarchy - thus allowing for a constant music layer that exists outside of the scope of the Active-MusicalState, meaning it is not bound by musical states switches. 
                                                    </div>
                                                </li>

                                                <li>
                                                    Support MidiTracks for GameAudio tracks
                                                    <div>
                                                        This means that a special kind of synth/sampler can be used for game audio as a sound source, in addition to the currently supported wave files.
                                                    </div>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='p5 m5 font-9 s3 j-even'>
                                        <span>Sample Project</span>
                                        <div >
                                            <iframe className='vid-frame' src="https://www.youtube.com/embed/_8BTlH71Pw4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                        </div>
                                    </div>
                                    <div className='p5 m5 font-9 s3 j-even'>
                                        <span>Plugin Demo</span>
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