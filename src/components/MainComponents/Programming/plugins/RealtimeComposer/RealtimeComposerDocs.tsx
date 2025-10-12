import { Icon } from '@iconify/react'
import { useState, useEffect, useRef } from 'react'
import { BPFunction } from './DocsDataComponents/BPFunction'

export default function RealtimeComposerPluginDocs() {
    const [activeCategory, setActiveCategory] = useState('getting-started')
    const [activeSection, setActiveSection] = useState('installation')
    const [expandedCategories, setExpandedCategories] = useState<string[]>(['getting-started'])
    const mainContentRef = useRef<HTMLDivElement>(null)

    // Navigation structure with categories and subcategories
    const navigationStructure = {
        'getting-started': {
            title: 'Getting Started',
            description: 'Learn the basics of setting up and using the Realtime Composer plugin in your Unreal Engine projects.',
            subcategories: {
                'overview': 'Overview',
                'installation': 'Installation',
                'setup': 'Plugin Settings',
                'play-settings': 'Playing the Music System',
                // 'musical-state-core-concepts': 'Musical State Core Concepts',
                'basic-example': 'Basic Example Usage'
            }
        },
        'midi-track-editor': {
            title: 'Midi Track Asset Editor',
            description: 'Learn how to use the Midi Track Asset Editor to create and manage MIDI tracks.',
            subcategories: {
                'creating-midi-tracks': 'Creating Midi Tracks',
                'loading-midi-tracks': 'Playing Midi Tracks',
            }
        },
        // 'music-state-collections': {
        //     title: 'Music State Collections',
        //     description: 'Master the core concepts of music states, sub-states, and state transitions for dynamic audio systems.',
        //     subcategories: {
        //         'creating-states': 'Creating Music States',
        //         'sub-state-management': 'Sub-State Management',
        //         'state-transitions': 'State Transitions'
        //     }
        // },
        // 'audio-channel-mixing': {
        //     title: 'Audio Channel Mixing',
        //     description: 'Explore advanced audio mixing techniques, channel configuration, and real-time effects processing.',
        //     subcategories: {
        //         'channel-configuration': 'Channel Configuration',
        //         'dynamic-mixing': 'Dynamic Mixing',
        //         'effects-processing': 'Effects Processing'
        //     }
        // },
        // 'debug-console': {
        //     title: 'Debug Console',
        //     description: 'Utilize the debug console for monitoring, testing, and optimizing your musical implementations.',
        //     subcategories: {
        //         'console-features': 'Console Features',
        //         'manual-control': 'Manual Control',
        //         // 'performance-monitoring': 'Performance Monitoring' // TODO
        //     }
        // },
        'api-reference': {
            title: 'API Reference',
            description: 'Explore the comprehensive API reference for the Realtime Composer plugin, providing detailed information on all classes, functions, and properties.',
            subcategories: {
                // 'api-reference': 'API Reference',
                'core-control-api': 'Core RealtimeComposer Control API',
                'core-hierarchy-api': 'Core Musical State Hierarchy Management API',
                'subcollections-api': 'SubCollections API',
                'game-audio-api': 'Game Audio API',
                'sound-effects-api': 'Sound Effects API',
                'sends-api': 'Sends API',
                'soloing-functionality': 'Soloing Functionality',
                'rc-runtime-data-getters': 'RC Runtime Data Getters'
            }
        }
    }

    // Content sections organized by category (only subcategories, no main category sections)
    const contentSections = {
        'getting-started': {
            content: (
                <>
                    <section id="overview" className="docs-section font-1">
                        <h3>Overview</h3>
                        <p>
                            Realtime Composer provides a complete DAW (Digital Audio Workstation) integrated directly into your game engine, enabling you to play music with precise tempo control and trigger musical events influenced by gameplay. The system ensures that all audio events remain perfectly synchronized with the musical tempo, creating dynamic and responsive soundscapes that react to your game's state.
                        </p>
                        <p>
                            Think of it as Ableton Live interfacing with your game—a virtual DJ whose state evolves according to rules you define, adapting the music in real-time based on gameplay events.
                        </p>
                        <hr/>
                        <h4>Core Audio Track Collection Types</h4>
                        <p>
                            Realtime Composer establishes Musical States, which are comprised of and exposes four distinct types of audio tracks sub-collections, each serving a specific purpose in creating dynamic, interactive music:
                        </p>

                        <h5>1. Music Tracks Collection</h5>
                        <p>
                            Music Tracks play in deterministic layers that can be dynamically controlled. You define layers and use <span className='docs-ue-type-name'>MusicEscalate</span> to progressively add layers in ascending order, building musical intensity. Use <span className='docs-ue-type-name'>MusicDeescalate</span> to reduce intensity by removing layers. These tracks loop continuously, forming the foundation of your interactive music system.
                        </p>

                        <h5>2. Audio Tracks Collection</h5>
                        <p>
                            Audio Tracks create layered soundscapes that you can control flexibly by layer name rather than strict sequential order. This provides greater flexibility in arranging your audio, allowing you to trigger specific layers based on game conditions. Like Music Tracks, these loop continuously.
                        </p>

                        <h5>3. Transient Tracks Collection</h5>
                        <p>
                            Transient Tracks are temporary, one-shot audio events scheduled to occur at a specific musical time. These tracks play once and are not part of the looping system, making them ideal for punctuating gameplay moments with musical stings or transitions that remain perfectly synchronized with the tempo.
                        </p>

                        <h5>4. Sample Tracks Collection</h5>
                        <p>
                            Sample Tracks function as an arpeggiator system. Instead of playing a single long audio file, you define individual samples and control their playback rate, enabling rhythmic and melodic patterns that adapt to your game's musical context.
                        </p>
                        
                        <hr/>

                        <h4>Additional Features</h4>
                        <p>
                            Beyond the core track system, Realtime Composer includes:
                        </p>
                        <ul>
                            <li><strong>DSP Effects:</strong> A comprehensive suite of audio effects for sound design, built on top of native UE audio DSP effects</li>
                            <li><strong>Mixing System:</strong> Professional-grade mixing controls with multi-channel support, built on top of native UE audio AudioMixer and SoundSubmix</li>
                            <li><strong>Automation:</strong> Write and control parameter automations over time</li>
                            <li><strong>MIDI Track Generation:</strong> Create and manipulate MIDI tracks directly within the engine</li>
                        </ul>

                        <hr/>

                        <h4>The Dynamic Loop Paradigm</h4>
                        <p>
                            The fundamental concept behind Realtime Composer is the <strong>dynamic loop</strong>—a continuously playing musical foundation that responds to game state changes while maintaining perfect tempo synchronization. You have full control over what happens within the loop, allowing the music to evolve organically based on player actions, game events, or any conditions you define.
                        </p>
                    </section>

                    <section id="installation" className="docs-section">
                        <h3>Installation</h3>
                        <p>
                            To install the Realtime Composer plugin, you need to download the plugin from the Unreal Engine Marketplace.
                        </p>
                        <p>
                            Once downloaded, you can install it in your Unreal Engine project by dragging and dropping the plugin folder into the project's Plugins folder (if you project doesn't have a Plugins folder, create one).
                        </p>
                        <p>
                            <a href="https://www.fab.com/listings/7a8604cd-9560-4114-a712-6ac3bb5ad375" target="_blank" rel="noopener noreferrer">Download Realtime Composer Plugin from Fab Marketplace</a>
                        </p>
                    </section>

                    <section id="setup" className="docs-section">
                        <h3>Plugin Settings</h3>
                        <p>
                            The Realtime Composer plugin has a few settings that you can configure to specify global options.
                        </p>
                        <p>
                            In your project settings, you can find the Realtime Composer plugin settings under the <span className='docs-ue-type-name'>Plugins</span> section.
                            <br/>
                            These settings available are as below:
                        </p>
                        <p>
                            <img alt='realtime composer plugin preview' src={'../../rc-docs/rcdoc-plugin-settings.png'} width={'70%'} />
                        </p>
                        <p>
                            <span className='font-9 s1'>Realtime Composer Defaults:</span>
                            <ul>
                                <li style={{margin: '4px'}}>
                                    <strong style={{background: 'rgba(123, 123, 90, 1.0)', borderRadius: '8px', padding: '2px'}}>Orchestrator Class</strong> 
                                    <br/> 
                                    <span style={{margin: '8px'}}/> An optional class to inherit from to override the default behavior of the music system. See <a href="#orchestrator-class">Orchestrator Class</a> for more information.
                                </li>
                                <li style={{margin: '4px'}}>
                                    <strong style={{background: 'rgba(123, 123, 90, 1.0)', borderRadius: '8px', padding: '2px'}}>Auto Initialize Music System On Game Instance Post Init</strong> 
                                    <br/> 
                                    <span style={{margin: '8px'}}/> If true, the music system will be initialized automatically once the Game Instance Init event is triggered. If false, you will need to manually initialize the music system.
                                </li>
                                <li style={{margin: '4px'}}>
                                    <strong style={{background: 'rgba(123, 123, 90, 1.0)', borderRadius: '8px', padding: '2px'}}>Load World Sounds On Level Change</strong> 
                                    <br/> 
                                    <span style={{margin: '8px'}}/> If true, world sounds that are present in the world will be loaded into the Realtime Composer mixing system when the level changes.
                                </li>
                            </ul>
                        </p>
                        <p>
                            <span className='font-9 s1'>RC Runtime Debug Console:</span>
                            <ul>
                                <li style={{margin: '4px'}}>
                                    <strong style={{background: 'rgba(123, 123, 90, 1.0)', borderRadius: '8px', padding: '2px'}}>Enable Realtime Debug Console</strong> 
                                    <br/> 
                                    <span style={{margin: '8px'}}/> If true, the Realtime Composer debug console will be loaded and enabled.
                                </li>
                                <li style={{margin: '4px'}}>
                                    <strong style={{background: 'rgba(123, 123, 90, 1.0)', borderRadius: '8px', padding: '2px'}}>Debug Console Show Toggle Key</strong> 
                                    <br/> 
                                    <span style={{margin: '8px'}}/> The key that will toggle the debug console visibility.
                                </li>
                            </ul>
                        </p>
                    </section>

                    <section id="play-settings" className="docs-section">
                        <h3>Triggering the Music System to Play</h3>
                        <p>
                            There are 2 main ways to start playing the music system: With Precount, and without Precount.
                            <br/>
                            What's important to understand is that each behavior requires a slightly different setup.
                        </p>
                        <hr/>
                        <p>
                            <h5>1. With Precount</h5>
                            With Precount, the music system will play the music system 1 bar before actually hitting Bar 1 Beat 1. This is useful if you want to have a setup or transition period before the music system actually starts playing.
                            <br/>
                            <span className='font-9 s1'>The Difference: </span>
                            With precount, the first function you must call (after creating your musical state structure) is <span className='docs-ue-type-name'>PlayMusicSystem</span>.
                            <br/>
                            <br/>
                            Only after that, can you call functions that play music tracks and groups, like <span className='docs-ue-type-name'>MusicEscalate</span> and <span className='docs-ue-type-name'>SetSubCollectionGroupPlayActive</span>.
                            <br/>
                            <br/>
                            The reason is because with precount, the precount time is when the system expects to have tracks subscribing to the queue for playing.

                            <img alt='realtime composer plugin preview' src={'../../rc-docs/rcdoc-play-with-precount.png'} width={'70%'} />
                        </p>
                        <hr/>
                        <p>
                            <h5>2. Without Precount</h5>
                            Without Precount, the music system will start playing immediately.
                            <br/>
                            <span className='font-9 s1'>The Difference: </span>
                            Without precount, you first call functions that play music tracks and groups, like <span className='docs-ue-type-name'>MusicEscalate</span> and <span className='docs-ue-type-name'>SetSubCollectionGroupPlayActive</span>. Only after that, can you call <span className='docs-ue-type-name'>PlayMusicSystem</span>.
                            <br/>
                            <br/>
                            The reason is because without precount, the music system will start playing immediately, so the tracks must already be subscribed to queue and ready to play on the first beat.
                            
                            <img alt='realtime composer plugin preview' src={'../../rc-docs/rcdoc-play-without-precount.png'} width={'70%'} />
                        </p>
                    </section>

                    {/* <section id="musical-state-core-concepts" className="docs-section">
                        <h3>Musical State Core Concepts</h3>
                        <p>
                            TODO: Update this section, API has changed
                        </p>
                    </section> */}
                
                    <section id="basic-example" className="docs-section">
                        <h3>Basic Example Usage</h3>
                        <p>
                            This is a basic working example of how to use the Realtime Composer plugin.
                        </p>
                        <p>
                            
                            <img alt='realtime composer plugin preview' src={'../../rc-docs/rcdoc-basic-example.png'} width={'70%'} />
                        </p>
                        <p>
                            What this function does:
                            <ol>
                                <li>Creates a new MusicalState</li>
                                <li>Creates a new SubState</li>
                                <li>Creates a new AudioTrack</li>
                                <li>Sets the currently active MusicalState</li>
                                <li>Starts the music system</li>
                                <li>Escalates the Musical State (a SubState is added to queue to play)</li>
                            </ol>
                        </p>
                        {/* <p>
                            TODO: Update this section, API has changed
                        </p>
                        <p>
                            With the plugin enabled, the plugin's static function library is available to use in your Blueprints.
                        </p>
                        <p>
                            The <span className='docs-ue-type-name'>URealtimeComposerManagerInterface</span> is the main interface for the plugin, containing all the functionality of the plugin.
                        </p>
                        <p className='mt6'>
                            Create this function in your BP (preferably in the <span className='docs-ue-type-name'>GameInstance</span>), to create a MusicalState, a SubState, and an AudioTrack:
                        </p>
                        <div className='font-1 p2 m2'>
                            <img alt='realtime composer plugin preview' src={'../../RealtimeComposer_Docs_00.jpg'} width={'50%'} />
                        </div>
                        <p>
                            What this function does:
                        </p>
                        <ul className="font-1 s2 docs-section">
                            <li className='m2'>
                                Creates a <span className='docs-ue-type-name'>MusicalState</span> (a collection of SubStates, has a name, a fixed Tempo, and a shared output channel for all SubStates under it)
                            </li>
                            <li className='m2'>
                                Creates a <span className='docs-ue-type-name'>SubState</span> (a collection of AudioTracks, has a name, and a shared output channel for all tracks under it)
                            </li>
                            <li className='m2'>
                                Creates an <span className='docs-ue-type-name'>AudioTrack</span> (an audio source file, cannot be set to loop in the WaveAsset Editor, BPM must match the set MusicalState's Tempo and Time Signature)
                            </li>
                        </ul>
                        
                        <p className='mt6 pt6'>
                            Next, create these 2 functions: The first one starts the music system, and seconds function is used to escalate the SubState(s), by the given <span className='docs-ue-type-name'>Factor</span> value (each SubState is an Escalation Factor)
                        </p>
                        <div className='font-1 p2 m2'>
                            <img alt='realtime composer plugin preview' src={'../../RealtimeComposer_Docs_01.jpg'} width={'50%'} />
                        </div>
                        <p>
                            Do note, that once the Music System initially starts playing, it has a 4 Beats precount. This is to allow for any setup and escalation to happen before the real first beat.
                        </p>
                        <p className='mt6'>
                            Finally, you can Deescalate the SubState(s), and stop the music system:
                        </p>
                        <div className='font-1 p2 m2'>
                            <img alt='realtime composer plugin preview' src={'../../RealtimeComposer_Docs_02.jpg'} width={'50%'} />
                        </div>
                        <p >
                            Do note, that stopping the music system will not stop the SubState(s) from playing - it will only stop the metronome from ticking. Whatever tracks that happened to be playing at this point, would stop playing once finished naturally, by default.
                        </p>
                        <p >
                            If you want to stop the SubState(s) from playing, you need to manually stop them, using the Descalate function, optionally levereging the <span className='docs-ue-type-name'>Track Removal Behavior</span> to cue the stopping of the tracks on tempo, or even abruptly.
                        </p> */}
                    </section>
                </>
            )
        },
        'midi-track-editor': {
            content: (
                <>
                    <section id="creating-midi-tracks" className="docs-section">
                        <h3>Creating Midi Tracks</h3>
                        <p>
                            You can create a new Midi Track asset by right clicking in the Content Browser and selecting <span className='docs-ue-type-name'>Audio {"->"} Midi Track</span>.
                        </p>
                        <p>
                            <img alt='realtime composer plugin preview' src={'../../rc-docs/rcdoc-midi-track-create.png'} width={'20%'} />
                        </p>
                        <p>
                            Then open the Midi Track asset and you will see the Midi Track Editor.
                        </p>
                        <p>
                            <img alt='realtime composer plugin preview' src={'../../rc-docs/rcdoc-midi-track-editor.png'} width={'70%'} />
                        </p>
                        <p>
                            Here you can create notes, change the note duration, like you would expect from a MIDI Piano Roll editor in a DAW.
                            <br/>
                            You can also select the synth parameters for editing, and add automations for each parameter.
                            <br/>
                            <br/>
                            Lastly, you can modify the sound preset by going to the <span className='docs-ue-type-name'>Sound Design</span> tab, which is a MetaSound asset that defines the synth sound. Can edit, and save new presets.
                            <br/>
                            NOTE: To learn how to use MetaSounds to create your own custom synth sounds, see the <a href="#midi-tracks">Creating Custom Synth MetaSound Presets</a> section.
                            <img alt='realtime composer plugin preview' src={'../../rc-docs/rcdoc-midi-track-editor-sound-designer.png'} width={'70%'} />
                        </p>
                    </section>

                    <section id="loading-midi-tracks" className="docs-section">
                        <h3>Playing Midi Tracks</h3>
                        <p>
                            Once you have created a Midi Track asset, you can create an instance of it by adding a call to the function <span className='docs-ue-type-name'>CreateMIDIMusicTrack</span>.
                            <br/>
                            This wrapper both creates and adds the MidiTrack to the hierarchy for you. 
                            <br/>
                            Depending on the sub-collection Context you want to add the track to, you will need to call <span className='docs-ue-type-name'>MusicEscalate</span> (if adding to MusicTracks) or <span className='docs-ue-type-name'>SetSubCollectionGroupPlayActive</span> (if adding to AudioTracks, TransientsTracks, or SamplesTracks) to play the track.
                            <br/>
                            <br/>
                            <img alt='realtime composer plugin preview' src={'../../rc-docs/rcdoc-midi-track-create-instance.png'} width={'50%'} />
                        </p>
                        
                    </section>
                </>
            )
        },
        // 'music-state-collections': {
        //     content: (
        //         <>
        //             <section id="creating-states" className="docs-section">
        //                 <h3>Creating Music States</h3>
        //                 <p>
        //                     Music States represent different emotional or gameplay contexts in your game. Each state can contain multiple audio tracks and sub-states that can be dynamically mixed based on gameplay events.
        //                 </p>
        //                 <p>
        //                     To create a new music state, use the Create Music State function in your Blueprint. This will return a reference to the newly created state that you can use throughout your project.
        //                 </p>
        //             </section>

        //             <section id="sub-state-management" className="docs-section">
        //                 <h3>Sub-State Management</h3>
        //                 <p>
        //                     Sub-states allow for fine-grained control over the musical composition. You can create multiple sub-states within a single music state and transition between them seamlessly.
        //                 </p>
        //                 <p>
        //                     Each sub-state can have its own audio tracks, volume levels, and transition parameters. This allows for complex musical arrangements that respond to gameplay events.
        //                 </p>
        //             </section>

        //             <section id="state-transitions" className="docs-section">
        //                 <h3>State Transitions</h3>
        //                 <p>
        //                     State transitions allow you to smoothly move between different musical states based on gameplay events. The system provides various transition types including crossfade, fade in/out, and immediate switching.
        //                 </p>
        //                 <p>
        //                     Configure transition parameters such as duration, curve type, and trigger conditions to create natural and responsive musical changes.
        //                 </p>
        //             </section>
        //         </>
        //     )
        // },
        // 'audio-channel-mixing': {
        //     content: (
        //         <>
        //             <section id="channel-configuration" className="docs-section">
        //                 <h3>Channel Configuration</h3>
        //                 <p>
        //                     Configure individual audio channels with specific parameters such as volume, panning, and effects processing.
        //                 </p>
        //                 <p>
        //                     Each channel can be assigned to different audio tracks and can have its own processing chain including filters, reverb, and other effects.
        //                 </p>
        //             </section>

        //             <section id="dynamic-mixing" className="docs-section">
        //                 <h3>Dynamic Mixing</h3>
        //                 <p>
        //                     The system automatically adjusts the mix based on the current music state and sub-state, ensuring smooth transitions and appropriate audio levels.
        //                 </p>
        //                 <p>
        //                     Dynamic mixing parameters can be controlled through gameplay events, allowing for real-time adjustment of the musical mix based on player actions or game state changes.
        //                 </p>
        //             </section>

        //             <section id="effects-processing" className="docs-section">
        //                 <h3>Effects Processing</h3>
        //                 <p>
        //                     Apply various audio effects to individual channels or the entire mix. Supported effects include reverb, delay, filters, compression, and more.
        //                 </p>
        //                 <p>
        //                     Effects can be automated based on gameplay events, creating dynamic audio processing that enhances the player experience.
        //                 </p>
        //             </section>
        //         </>
        //     )
        // },
        // 'debug-console': {
        //     content: (
        //         <>
        //             <section id="console-features" className="docs-section">
        //                 <h3>Console Features</h3>
        //                 <p>
        //                     Monitor active music states, sub-states, and audio channels in real-time. View performance metrics and system status information.
        //                 </p>
        //                 <p>
        //                     The console displays current playback status, active transitions, and system performance data to help you debug and optimize your musical implementation.
        //                 </p>
        //             </section>

        //             <section id="manual-control" className="docs-section">
        //                 <h3>Manual Control</h3>
        //                 <p>
        //                     Use the debug console to manually trigger state changes, adjust audio parameters, and test different musical configurations during development.
        //                 </p>
        //                 <p>
        //                     Manual controls allow you to test your musical system without needing to trigger specific gameplay events, making development and debugging much more efficient.
        //                 </p>
        //             </section>

        //             <section id="performance-monitoring" className="docs-section">
        //                 <h3>Performance Monitoring</h3>
        //                 <p>
        //                     Monitor system performance including CPU usage, memory allocation, and audio processing latency.
        //                 </p>
        //                 <p>
        //                     Performance metrics help you identify potential bottlenecks and optimize your musical system for better performance across different platforms and hardware configurations.
        //                 </p>
        //             </section>
        //         </>
        //     )
        // },
        'api-reference': {
            content: (
                <>
                    <section id="core-control-api" className="docs-section">
                        <h3>Core RealtimeComposer Control API</h3>
                        <div className="s2 m2 font-1">
                            This is the core API for control playing of the music system, audio tracks, music-collections and sub-collections, as well as state switching.
                            <br/>
                            These are the most high level functions that define the most essential behavior functionality control.
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "PlayMusicSystem",
                                description: "Start play the music system",
                                parameters: [
                                    { name: "bPlayWithMetronome", type: "bool", description: "Should the metronome be playing as well" },
                                    { name: "PrecountBounds", type: "ERCPrecountBounds", description: "How much musical time to play before actually hitting Bar 1 Beat 1 (ignored if resuming after pause). Can choose None to opt-out." }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "PauseMusicSystem",
                                description: "Pause the music system. To resume playing, call PlayMusicSystem again",
                                parameters: [],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "StopMusicSystem",
                                description: "Stop play of the music system",
                                parameters: [
                                    { name: "StopBehavior", type: "ERCTrackRemovalBehavior", description: "How should the playing music be stopped" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "MusicEscalate",
                                description: "Escalate the currently playing MusicalState. If a MusicalState has X number of groups under it (referred to as EscalationFactors or SubStates), then each factor escalated will start playing the tracks under it",
                                parameters: [
                                    { name: "PlayOnNextQuantization", type: "EQuartzCommandQuantization", description: "The next musical time when the escalation should start" },
                                    { name: "Factor", type: "int32", description: "The degree of escalation. NOTE1: MusicalState should have sufficient sub-states for the request (truncated otherwise). NOTE2: Factor value can not be lower than 1" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "MusicDeescalate",
                                description: "De-escalate a currently playing MusicalState.",
                                parameters: [
                                    { name: "TrackDeescalationBehavior", type: "ERCTrackRemovalBehavior", description: "The behavior or timing of how should the associated audio tracks should stop playing" },
                                    { name: "Factor", type: "int32", description: "The degree of deescalation. NOTE1: MusicalState should have sufficient sub-states for the request (truncated otherwise). NOTE2: Factor value can not be lower than 1" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "SwitchMusicalState",
                                description: "Switch to a new musical state",
                                parameters: [
                                    { name: "NewStateName", type: "FName", description: "The name of the MusicalState to activate" },
                                    { name: "SwitchQuantization", type: "EQuartzCommandQuantization", description: "The quantization type for the switch" },
                                    { name: "bAutoEscalate", type: "bool", description: "Should automatically escalate and play upon switch" },
                                    { name: "Factor", type: "int32", description: "The degree of escalation to use (used only if passing bAutoEscalate = true)" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "PlayRCTrack",
                                description: "Standardized function that can play any (already Loaded) AudioTrack (except for MusicCollection tracks which only respond to MusicEscalate())",
                                parameters: [
                                    { name: "Track", type: "URCAudioTrackBase*", description: "The track to play" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "StopRCTrack",
                                description: "Standardized function that can stop any playing AudioTrack (except for MusicCollection tracks which only respond to MusicDeescalate())",
                                parameters: [
                                    { name: "Track", type: "URCAudioTrackBase*", description: "The track to stop" },
                                    { name: "StopBehavior", type: "ERCTrackRemovalBehavior", description: "How should the playing track be stopped" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "SetAudioChannelVolume",
                                description: "Set the audio track's volume, normalized",
                                parameters: [
                                    { name: "Channel", type: "URCAudioChannelBase*", description: "The audio channel to update" },
                                    { name: "InVolume", type: "float", description: "The new gain value from 0.0 to 1.0" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "SetAudioTrackVolume",
                                description: "Sets the volume level for the specified audio track.",
                                parameters: [
                                    { name: "Track", type: "URCAudioTrackBase*", description: "A pointer to the audio track whose volume will be set." },
                                    { name: "InVolume", type: "float", description: "The new volume level to apply to the audio track." }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "ModulateAudioChannelVolume",
                                description: "Modulates the volume of a specified audio channel over a given duration.",
                                parameters: [
                                    { name: "Channel", type: "URCAudioChannelBase*", description: "Pointer to the audio channel whose volume will be modulated." },
                                    { name: "TargetVolume", type: "float", description: "The target volume to reach, in the range [0.0, 1.0]." },
                                    { name: "LerpDuration", type: "float", description: "The duration, in seconds, over which to interpolate the volume change." }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "ModulateAudioTrackVolume",
                                description: "Modulates the volume of an audio track over a specified duration.",
                                parameters: [
                                    { name: "Track", type: "URCAudioTrackBase*", description: "Pointer to the audio track whose volume will be modulated." },
                                    { name: "TargetVolume", type: "float", description: "The target volume to reach, in the range [0.0, 1.0]." },
                                    { name: "LerpDuration", type: "float", description: "The duration, in seconds, over which to interpolate the volume change." }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "SetSubcollectionGroupPlayActive",
                                description: "Function used for start playing all tracks under a sub-collection group",
                                parameters: [
                                    { name: "MusicState", type: "UMusicStateCollections*", description: "The owning music state" },
                                    { name: "GroupName", type: "FName", description: "The group name" },
                                    { name: "SubContext", type: "EAudioTrackGroupContext", description: "Sub Collection context (MusicTracks SubCol ops are forbidden and ignored)" },
                                    { name: "Q", type: "EQuartzCommandQuantization", description: "The Quantization type to play group (use EQuartzCommandQuantization::None to use Track Default set quantization on track creation)" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "SetSubcollectionGroupPlayDisabled",
                                description: "Function used for stopping all tracks under a sub-collection group",
                                parameters: [
                                    { name: "MusicState", type: "UMusicStateCollections*", description: "The owning music state" },
                                    { name: "GroupName", type: "FName", description: "The group name" },
                                    { name: "SubContext", type: "EAudioTrackGroupContext", description: "Sub Collection context (MusicTracks SubCol ops are forbidden and ignored)" },
                                    { name: "RemovalBehavior", type: "ERCTrackRemovalBehavior", description: "The stop behavior (dequeue, next bar, next beat)" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "SetMetronomeActive",
                                description: "Set music system clock to play with metronome or not",
                                parameters: [
                                    { name: "bActive", type: "bool", description: "If true, metronome will play while music clock ticks" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                        
                    </section>

                    <section id="core-hierarchy-api" className="docs-section">
                        <h3>Core Musical State Hierarchy Management API</h3>
                        <div className="s2 m2 font-1">
                            The following API provides the heavily relied-upon functions for creating MusicalStates, SubStates, and AudioTracks - which serve as the core building blocks of the Realtime Composer system.
                            <br/><br/>
                            A MusicalState is a core RC object that establishes a musical hierarchy bound by a fixed Tempo and time signature. It provides an AudioChannel that's linked to a MusicCollection, and other 3 SubCollections (AudioCollection, TransientsCollection, SamplesCollection) that all belong under the MusicalState.
                            <br/><br/>
                            A MusicCollection is built of `SubStates/EscalationFactors`, which are also simply AudioChannels that go under the main MusicalState channel (use the `MusicEscalate()` function to play `SubStates/EscalationFactors`)
                            <br/><br/>
                            A `SubState/EscalationFactor` is an audio channel that contains actual AudioTracks (wave sound sources to be played), each SubState is essentially an AudioChannel to which all tracks under it output their audio to.
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "AddNewMusicalState",
                                description: "Creates a new MusicalState",
                                parameters: [
                                    { name: "NewCollectionName", type: "FName", description: "The name for the new MusicalState collection" },
                                    { name: "TempoSettings", type: "FStateTempoSettings", description: "The Tempo settings to create the music state with" }
                                ],
                                return: {
                                    type: "URCAudioChannelBase*",
                                    description: "The newly created AudioChannel"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "AddNewSubstate",
                                description: "Creates a new SubState/EscalationFactor under a MusicalState",
                                parameters: [
                                    { name: "CollectionName", type: "FName", description: "The name of the owning MusicalState collection" },
                                    { name: "NewSubstateName", type: "FName", description: "The name for the new SubStateEscalationFactor group" }
                                ],
                                return: {
                                    type: "URCAudioChannelBase*",
                                    description: "The newly created AudioChannel"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "AddNewTrack",
                                description: "Creates a new AudioTrack under a `MusicalState->EscalationFactor`. To create a new track, you need to create a new `URCTrackRepresentation` object using `CreateAudioTrack()`, and then pass it to this function.",
                                parameters: [
                                    { name: "CollectionName", type: "FName", description: "The name of the owning MusicalState collection" },
                                    { name: "SubstateName", type: "FName", description: "The name of the owning SubStateEscalationFactor group" },
                                    { name: "Track", type: "URCTrackRepresentation*", description: "The representation object for the Track" }
                                ],
                                return: {
                                    type: "URCAudioTrackBase*",
                                    description: "The newly created AudioTrack"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "RemoveMusicalState",
                                description: "Fully removes a MusicalState from audio hierarchy",
                                parameters: [
                                    { name: "CollectionName", type: "FName", description: "The name of the MusicalState collection to remove" },
                                    { name: "RemovalBehavior", type: "ERCTrackRemovalBehavior", description: "The type of audio stop behavior to use (only applies if the state is currently actively playing)" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "RemoveSubstate",
                                description: "Fully removes a SubState from a state's audio hierarchy",
                                parameters: [
                                    { name: "CollectionName", type: "FName", description: "The name of the MusicalState collection to remove" },
                                    { name: "SubstateName", type: "FName", description: "The name of the EscalationFactor group collection to remove" },
                                    { name: "RemovalBehavior", type: "ERCTrackRemovalBehavior", description: "The type of audio stop behavior to use (only applies if the sub-state is currently actively playing)" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "RemoveTrack",
                                description: "Fully removes a Track from a sub-state's audio hierarchy",
                                parameters: [
                                    { name: "CollectionName", type: "FName", description: "The name of the MusicalState collection to remove" },
                                    { name: "SubstateName", type: "FName", description: "The name of the EscalationFactor group collection to remove" },
                                    { name: "TrackName", type: "FName", description: "The name of track to remove" },
                                    { name: "RemovalBehavior", type: "ERCTrackRemovalBehavior", description: "The type of audio stop behavior to use (only applies if the track is currently actively playing)" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                    </section>

                    <section id="subcollections-api" className="docs-section">
                        <h3>SubCollections API</h3>
                        <div className="s2 m2 font-1">
                            The term `SubCollections` in RealtimeComposer refers to the additional 3 sub-hierarchies that exist under a MusicalState, for `AudioCollection`, `TransientCollection`, and `SampleCollection`.
                            <br/><br/>
                            These sub-hierarchies allow for specific functionality and behavior, and the best way to understand them is by first understanding the core MusicCollection of the MusicalState:
                            <br/><br/>
                            - The `MusicCollection` is an audio channel holding SubStatesEscalationFactors (i.e, specialized audio channels), and each SubState channel can play a group of AudioTrack sound sources under it
                            <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;+ Can be controlled only by the `MusicEscalate()` and `MusicDeescalate()` functions (esclations and deescalations happening linearly, i.e up or down, no skipping of substates)
                            <br/><br/>
                            - The `AudioCollection` is an audio channel holding SubCollectionGroups (i.e, other specialized audio channels), and each sub-group channel can play group of AudioTrack sound sources under it that are meant to be looping like MusicCollection tracks, but without the `MusicEscalate()` and `MusicDeescalate()` "limitation" - you can play any channel group or individual track on demand
                            <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;+ Can be controlled via `SetSubCollectionGroupPlayActive()` and `SetSubCollectionGroupPlayDisabled()` to play or stop whole groups, and can use `PlayRCTrack()` `StopRCTrack()` to play and stop individual tracks
                            <br/><br/>
                            - The `TransientCollection` is an audio channel holding SubCollectionGroups (i.e, other specialized audio channels), and each sub-group channel can play group of AudioTrack sound sources under it that are meant to be "fire and forget" play behavior - no looping. This is ideal for syncing musical reactions to a gameplay driven event, timed perfectly on the desired musical time
                            <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;+ Can be controlled via `SetSubCollectionGroupPlayActive()` and `SetSubCollectionGroupPlayDisabled()` to play or stop whole groups, and can use `PlayRCTrack()` `StopRCTrack()` to play and stop individual tracks
                            <br/><br/>
                            - The `SampleCollection` is an audio channel holding SubCollectionGroups (i.e, other specialized audio channels), and each sub-group channel can play group of AudioTrack sound sources under it that are played as an arpeggiator. You decide what is the Q for the AudioTrack, and it will play on that Q for as long as the arpeggiator/group/track is active.
                            <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;+ Can be controlled via `SetSubCollectionGroupPlayActive()` and `SetSubCollectionGroupPlayDisabled()` to play or stop whole groups, and can use `PlayRCTrack()` `StopRCTrack()` to play and stop individual tracks
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "AddNewSubCollectionGroup",
                                description: "Adds a new group to a SubCollection of the desired context",
                                parameters: [
                                    { name: "CollectionName", type: "FName", description: "The owning collection name (MusicalState name)" },
                                    { name: "SubCollectionContext", type: "EAudioTrackGroupContext", description: "The desired sub-collection context (supports all SubCollection types, including MusicTracks (simply adds a new SubState))" },
                                    { name: "NewSubCollectionGroupName", type: "FName", description: "The new group name to create" }
                                ],
                                return: {
                                    type: "URCAudioChannelBase*",
                                    description: "The newly created AudioChannel"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "AddNewTrackToSubCollectionGroup",
                                description: "Adds a track to a SubCollection group of the desired context",
                                parameters: [
                                    { name: "CollectionName", type: "FName", description: "The owning collection name (MusicalState name)" },
                                    { name: "SubCollectionContext", type: "EAudioTrackGroupContext", description: "The desired sub-collection context (supports all SubCollection types)" },
                                    { name: "SubCollectionGroupName", type: "FName", description: "The new group name to create" },
                                    { name: "Track", type: "URCTrackRepresentation*", description: "The representation object of the new track to create" }
                                ],
                                return: {
                                    type: "URCAudioTrackBase*",
                                    description: "The newly created AudioTrack"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "AddMIDIMusicTrack",
                                description: "Creates an RC-MIDI music track and adds it to the `MusicState[SubCollectionContext]->GroupName`. NOTE1: To create the MIDI track representation, call CreateMusicTrack. Uses \"AddNewTrackToSubCollectionGroup\" internally. NOTE2: Can be used for MusicCollection tracks as well (not just subcollections)",
                                parameters: [
                                    { name: "MusicalStateName", type: "FName", description: "The name of the musical state" },
                                    { name: "Context", type: "EAudioTrackGroupContext", description: "The sub-collection context" },
                                    { name: "GroupName", type: "FName", description: "The group name" },
                                    { name: "Track", type: "URCMusicTrackRepresentation*", description: "The MIDI track representation" },
                                    { name: "Quantization", type: "EQuartzCommandQuantization", description: "The quantization type for the MIDI track (used only for SampleTracks)" },
                                    { name: "SoundPreset", type: "UMetaSoundSource*", description: "An optional MetaSound asset that defines the synth sound. If left empty, will use RC default sound. NOTE: If you do provide a custom MetaSound asset, then it must conform to the having these 3 float input parameters (Pitch, Duration, Volume) that need to be set up in a meaningful way (read more in docs about MIDI tracks in Realtime Composer)" }
                                ],
                                return: {
                                    type: "URCMusicTrack*",
                                    description: "The newly created MusicTrack (RC-MIDI track object)"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "RemoveSubCollectionGroup",
                                description: "Fully removes SubCollection group of the desired context",
                                parameters: [
                                    { name: "CollectionName", type: "FName", description: "The owning collection name (MusicalState name)" },
                                    { name: "SubCollectionGroupName", type: "FName", description: "The sub-collection group name to remove" },
                                    { name: "SubCollectionContext", type: "EAudioTrackGroupContext", description: "The desired sub-collection context (supports all SubCollection types)" },
                                    { name: "RemovalBehavior", type: "ERCTrackRemovalBehavior", description: "The type of audio stop behavior to use (only applies if the group is currently actively playing)" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "RemoveTrackFromSubCollectionGroup",
                                description: "Fully removes an audio Track under a SubCollection group of the desired context",
                                parameters: [
                                    { name: "CollectionName", type: "FName", description: "The owning collection name (MusicalState name)" },
                                    { name: "SubCollectionContext", type: "EAudioTrackGroupContext", description: "The desired sub-collection context (supports all SubCollection types)" },
                                    { name: "SubCollectionGroupName", type: "FName", description: "The subcollection group name where the track exists" },
                                    { name: "TrackName", type: "FName", description: "The name of the Track to remove" },
                                    { name: "RemovalBehavior", type: "ERCTrackRemovalBehavior", description: "The type of audio stop behavior to use (only applies if the track is currently actively playing)" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "RemoveRCAudioChannel",
                                description: "Fully remove any non-persistent audio channel. If the audio channel is not under a MusicStateCollection (like GameAudio mix group channels), then the you should pass nullptr as the `MusicStateCollection` parameter",
                                parameters: [
                                    { name: "MusicStateCollection", type: "UMusicStateCollections*", description: "The owning AudioChannel the AudioChannel belongs to (nullptr if not a Music-derived audio channel)" },
                                    { name: "AudioChannel", type: "URCAudioChannelBase*", description: "The channel to remove" },
                                    { name: "RemovalBehavior", type: "ERCTrackRemovalBehavior", description: "The type of audio stop behavior to use (only applies if the channel's tracks are currently actively playing)" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                    </section>

                    <section id="game-audio-api" className="docs-section">
                        <h3>GameAudio API</h3>
                        <div className="s2 m2 font-1">
                            The Game Audio API is establishing the same AudioChannel DSP control over your entire game audio, 2D and 3D all the same.
                            <br/><br/>
                            A top-level GameAudio AudioChannel is called a MixGroup. These should be used to define broad categories (such as `UI`, `Dialogue`, `PlayerSounds`, etc...).
                            <br/><br/>
                            Then any sub-level GameAudio AudioChannel is called a Sub-MixGroup (can be recursive). These can be used to specify intricate channels under your broad top-level categories.
                            <br/><br/>
                            When you want to create either a 2D or 3D game audio track, you can use the "Import" functions to create and load the tracks, or use the "Spawn" functions to create and immediately play the track (if using "Import", can then simply play and stop tracks with the standard `PlayRCTrack()` and `StopRCTrack()` functions).
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "AddNewGameAudioMixGroup",
                                description: "Adds a new top-level GameAudio mix group audio channel. This audio channel is used for grouping game 2D and 3D sounds alike",
                                parameters: [
                                    { name: "NewMixGroupName", type: "FName", description: "New channel name" },
                                    { name: "bIs3DSound", type: "bool", description: "DEPRECATED" }
                                ],
                                return: {
                                    type: "URCAudioChannelData*",
                                    description: "The newly created AudioChannel"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "AddNewGameAudioSubMixGroup",
                                description: "Adds a new sub-GameAudio mix group audio channel. This can be used to add a new mix group under a top-level or a sub-level mix group channel.",
                                parameters: [
                                    { name: "ParentGroup", type: "URCAudioChannelData*", description: "The parent mix group channel to add new group under" },
                                    { name: "NewSubmixGroupName", type: "FName", description: "New group name" },
                                    { name: "bIs3DSound", type: "bool", description: "DEPRECATED" }
                                ],
                                return: {
                                    type: "URCAudioChannelData*",
                                    description: "The newly created AudioChannel"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "ImportGameAudioTrack2D",
                                description: "Add a new track for a GameAudio mix group channel. Used for 2D tracks only.",
                                parameters: [
                                    { name: "GroupAudioChannel", type: "URCAudioChannelData*", description: "The channel to place the track under" },
                                    { name: "TrackName", type: "FName", description: "The new track name" },
                                    { name: "bLooping", type: "bool", description: "Set track to play looping" },
                                    { name: "AudioFile", type: "USoundBase*", description: "The audio file to play" },
                                    { name: "bPersistentTrack", type: "bool", description: "Whether the track should be persistent" }
                                ],
                                return: {
                                    type: "URCAudioTrackBase*",
                                    description: "The newly created AudioTrack"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "ImportGameAudioTrack3D",
                                description: "Add a new track for a GameAudio mix group channel. Used for 3D tracks mainly.",
                                parameters: [
                                    { name: "GroupAudioChannel", type: "URCAudioChannelData*", description: "The channel to place the track under" },
                                    { name: "TrackName", type: "FName", description: "The new track name" },
                                    { name: "AudioFile", type: "USoundBase*", description: "The audio file to play" },
                                    { name: "bLooping", type: "bool", description: "Set track to play looping" },
                                    { name: "Sound3dSettings", type: "FRCSound3DSettings", description: "The 3D settings to apply on the track. can still be used for 2D tracks if `ERC3DSoundSource::None`" },
                                    { name: "bPersistentTrack", type: "bool", description: "Whether the track should be persistent" }
                                ],
                                return: {
                                    type: "URCAudioTrackBase*",
                                    description: "The newly created track"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "RemoveGameAudioMixGroup",
                                description: "Fully remove a top-level GameAudio mix group channel",
                                parameters: [
                                    { name: "MixGroupToRemove", type: "URCAudioChannelData*", description: "Channel to remove" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "RemoveAudioTrackFromAudioMixGroup",
                                description: "Fully remove an audio track from a GameAudio mix group channel",
                                parameters: [
                                    { name: "MixGroup", type: "URCAudioChannelData*", description: "Channel to remove track from" },
                                    { name: "TrackNameToRemove", type: "FName", description: "Track name to remove" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "SpawnRCSound3D_ActorAttached",
                                description: "Spawn a 3D sound, attached to an actor",
                                parameters: [
                                    { name: "Context", type: "AActor*", description: "The actor to attach to" },
                                    { name: "TrackName", type: "FName", description: "The new track name" },
                                    { name: "AudioFile", type: "USoundBase*", description: "The audio file source" },
                                    { name: "bIsLooping", type: "bool", description: "Should track play looping" },
                                    { name: "Attenuation", type: "USoundAttenuation*", description: "The 3D attenuation settings to apply" },
                                    { name: "OwningChannel", type: "URCAudioChannelData*", description: "The GameAudio mix group channel to play the track under (if left NULL will use the root GameAudio channel)" }
                                ],
                                return: {
                                    type: "URCAudioTrackBase*",
                                    description: "The newly created AudioTrack"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "SpawnRCSound3D_ComponentAttached",
                                description: "Spawn a 3D sound, attached to a component",
                                parameters: [
                                    { name: "Context", type: "UObject*", description: "The component to attach to" },
                                    { name: "TrackName", type: "FName", description: "The new track name" },
                                    { name: "AudioFile", type: "USoundBase*", description: "The audio file source" },
                                    { name: "bIsLooping", type: "bool", description: "Should track play looping" },
                                    { name: "Attenuation", type: "USoundAttenuation*", description: "The 3D attenuation settings to apply" },
                                    { name: "OwningChannel", type: "URCAudioChannelData*", description: "The GameAudio mix group channel to play the track under (if left NULL will use the root GameAudio channel)" }
                                ],
                                return: {
                                    type: "URCAudioTrackBase*",
                                    description: "The newly created AudioTrack"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "SpawnRCSound3D_AtLocation",
                                description: "Spawn a 3D sound at world location",
                                parameters: [
                                    { name: "Location", type: "FVector", description: "The world location to spawn the sound" },
                                    { name: "TrackName", type: "FName", description: "The new track name" },
                                    { name: "AudioFile", type: "USoundBase*", description: "The audio file source" },
                                    { name: "bIsLooping", type: "bool", description: "Should track play looping" },
                                    { name: "Attenuation", type: "USoundAttenuation*", description: "The 3D attenuation settings to apply" },
                                    { name: "OwningChannel", type: "URCAudioChannelData*", description: "The GameAudio mix group channel to play the track under (if left NULL will use the root GameAudio channel)" }
                                ],
                                return: {
                                    type: "URCAudioTrackBase*",
                                    description: "The newly created AudioTrack"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "RemoveRCAudioTrack",
                                description: "Fully remove an audio track",
                                parameters: [
                                    { name: "AudioTrack", type: "URCAudioTrackBase*", description: "The track to remove" },
                                    { name: "RemovalBehavior", type: "ERCTrackRemovalBehavior", description: "The type of audio stop behavior to use (only applies if the track is currently actively playing)" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                    </section>

                    <section id="sound-effects-api" className="docs-section">
                        <h3>Sound Effects API</h3>
                        <div className="s2 m2 font-1">
                            The effects API allows for simple integration of effects processing on any audio channels, in realtime.
                            <br/><br/>
                            This can be very powerful for both music and gameplay sound experiences.
                            <br/><br/>
                            The RealtimeComposer system wraps around the native UE `SubmixSoundEffects`, providing a consistent API for easy control over effect parameters, as well as effect modulations over time.
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "AddAudioEffectToAudioChannel",
                                description: "Adds a new audio effect to an audio channel",
                                parameters: [
                                    { name: "Channel", type: "URCAudioChannelBase*", description: "The channel to add effect to" },
                                    { name: "EffectToCreate", type: "ERCSubmixAudioEffectType", description: "The effect type to create" }
                                ],
                                return: {
                                    type: "URCSubmixEffectControllerBase*",
                                    description: "The newly created RC-AudioEffect base controller (needs down-casting to the specific effect controller type if want to modify specific effect parameters)"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "RemoveAudioEffectFromAudioChannel",
                                description: "Remove an audio effect from a channel",
                                parameters: [
                                    { name: "Channel", type: "URCAudioChannelBase*", description: "The channel to remove effect from" },
                                    { name: "EffectToRemove", type: "URCSubmixEffectControllerBase*", description: "The effect controller to remove" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "SetEnableAudioChannelEffect",
                                description: "Modify active state of an audio effect",
                                parameters: [
                                    { name: "Channel", type: "URCAudioChannelBase*", description: "The channel the effect is under" },
                                    { name: "Effect", type: "URCSubmixEffectControllerBase*", description: "The effect controller to modify" },
                                    { name: "bEnable", type: "bool", description: "Should enable or disable effect" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetAudioChannelEffects",
                                description: "Get the effects chain for an audio channel",
                                parameters: [
                                    { name: "Channel", type: "URCAudioChannelBase*", description: "The channel to search under" }
                                ],
                                return: {
                                    type: "TArray<URCSubmixEffectControllerBase*>",
                                    description: "An array of base effect controllers. Can use a controller's `ERCSubmixAudioEffectType EffectType` member to know which derived effect controller to actually cast to"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetAudioChannelEffectAtIndex",
                                description: "Get effect at the specified chain index. NOTE: Make sure the supplied index is within bounds of the fx chain array",
                                parameters: [
                                    { name: "Channel", type: "URCAudioChannelBase*", description: "The channel to search under" },
                                    { name: "EffectIndex", type: "int32", description: "The index of the effect in the effects chain" }
                                ],
                                return: {
                                    type: "URCSubmixEffectControllerBase*",
                                    description: "The base effect controller. Can use the controller's `ERCSubmixAudioEffectType EffectType` member to know which derived effect controller to actually cast to"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "MoveAudioChannelSoundEffectInChain",
                                description: "Move and re-order an audio effect within the chain",
                                parameters: [
                                    { name: "Channel", type: "URCAudioChannelBase*", description: "The channel to process" },
                                    { name: "EffectIndex", type: "int32", description: "The current index of the effect to be moved" },
                                    { name: "Direction", type: "int32", description: "The direction AND degree of how far to move the effect. Can also be negative numbers to move effect back on chain" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "UpdateAudioChannelEffectParameter",
                                description: "Updates the value of a specific effect parameter on an audio channel",
                                parameters: [
                                    { name: "Channel", type: "URCAudioChannelBase*", description: "Pointer to the audio channel whose effect parameter will be updated" },
                                    { name: "Effect", type: "URCSubmixEffectControllerBase*", description: "Pointer to the effect controller associated with the audio channel" },
                                    { name: "EffectParamName", type: "FName", description: "The name of the effect parameter to update" },
                                    { name: "TargetValue", type: "float", description: "The new value to set for the specified effect parameter" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "ModulateAudioChannelEffectParameter",
                                description: "Modulates a parameter of an audio channel's effect over a specified duration.",
                                parameters: [
                                    { name: "Channel", type: "URCAudioChannelBase*", description: "Pointer to the audio channel whose effect parameter will be modulated." },
                                    { name: "Effect", type: "URCSubmixEffectControllerBase*", description: "Pointer to the submix effect controller containing the parameter to modulate." },
                                    { name: "EffectParamName", type: "FName", description: "The name of the effect parameter to be modulated." },
                                    { name: "TargetValue", type: "float", description: "The target value to which the parameter will be interpolated." },
                                    { name: "LerpDuration", type: "float", description: "The duration, in seconds, over which the parameter will be interpolated to the target value." }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetAudioChannelEffectParameterNames",
                                description: "Retrieves the names of all effect parameters for a given audio channel effect",
                                parameters: [
                                    { name: "Effect", type: "URCSubmixEffectControllerBase*", description: "A pointer to the submix effect controller from which to retrieve parameter names" }
                                ],
                                return: {
                                    type: "TArray<FName>",
                                    description: "An array of FName objects representing the names of the effect parameters"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "UpdateAudioTrackEffectParameter",
                                description: "Updates the value of a specified effect parameter on an audio track.",
                                parameters: [
                                    { name: "Track", type: "URCAudioTrackBase*", description: "Pointer to the audio track whose effect parameter will be updated." },
                                    { name: "ParamName", type: "FName", description: "The name of the effect parameter to update." },
                                    { name: "TargetValue", type: "float", description: "The new value to set for the effect parameter." }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "ModulateAudioTrackEffectParameter",
                                description: "Modulates a parameter of an audio track effect over a specified duration",
                                parameters: [
                                    { name: "Track", type: "URCAudioTrackBase*", description: "The audio track whose effect parameter will be modulated" },
                                    { name: "ParamName", type: "FName", description: "The name of the parameter to modulate" },
                                    { name: "TargetValue", type: "float", description: "The target value to which the parameter will be interpolated" },
                                    { name: "LerpDuration", type: "float", description: "The duration, in seconds, over which to interpolate the parameter value" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetAudioTrackEffectParameterNames",
                                description: "Retrieves the names of effect parameters for a given audio track.",
                                parameters: [
                                    { name: "Track", type: "URCAudioTrackBase*", description: "A pointer to the audio track from which to retrieve effect parameter names" }
                                ],
                                return: {
                                    type: "TArray<FName>",
                                    description: "An array of FName objects representing the names of the effect parameters for the specified audio track"
                                }
                            }} />
                        </div>
                    </section>

                    <section id="sends-api" className="docs-section">
                        <h3>Sends API</h3>
                        <div className="s2 m2 font-1">
                            The Audio Sends API offers the ability to route audio from any Music/Game derived audio channel to a designated Send channel, used for parallel sound processing and "side-chaining" audio processes.
                            <br/><br/>
                            - You create a Send Destination Target
                            <br/>
                            - You StartSend audio to that target from a source channel
                            <br/>
                            - You then get a "SendControl" channel that lives under that Destination Target, which you can use for specifically processing that sent audio data
                            <br/>
                            - Finally can apply audio processing on the entire send Destination Target, affecting all incoming sends that live under it
                            <br/><br/>
                            <strong>NOTE: EXPERIMENTAL FEATURE - currently noticeable latency is observed when using Send channels (can vary due to hardware)</strong>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetRootSendAudioChannel",
                                description: "Retrieves the root send audio channel for the specified audio domain.",
                                parameters: [
                                    { name: "AudioDomain", type: "ERCAudioDomain", description: "The audio domain for which to get the root send audio channel (Music / Game)" }
                                ],
                                return: {
                                    type: "URCAudioChannelBase*",
                                    description: "A pointer to the root send audio channel associated with the given audio domain"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetSendDestinationTargetChannels",
                                description: "Get the Send destination channels listed under a particular domain",
                                parameters: [
                                    { name: "AudioDomain", type: "ERCAudioDomain", description: "The audio domain for which to get the target channels" }
                                ],
                                return: {
                                    type: "TArray<URCAudioChannelBase*>",
                                    description: "An array of target channels for the specified audio domain"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetSendAudioChannelTarget",
                                description: "Retrieves the target Send audio channel within the specified domain, and target channel name",
                                parameters: [
                                    { name: "AudioDomain", type: "ERCAudioDomain", description: "The audio domain in which to search for the target channel" },
                                    { name: "SendDestinationTargetChannelName", type: "FName", description: "The name of the destination target audio channel" }
                                ],
                                return: {
                                    type: "URCAudioChannelBase*",
                                    description: "A Send audio channel, or nullptr if not found."
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "AddNewSendDestinationTarget",
                                description: "Adds a new send destination target channel to the specified audio domain",
                                parameters: [
                                    { name: "AudioDomain", type: "ERCAudioDomain", description: "The audio domain in which to add the new send destination target" },
                                    { name: "NewSendDestinationName", type: "FName", description: "The name of the new send channel to create" }
                                ],
                                return: {
                                    type: "URCAudioChannelBase*",
                                    description: "A pointer to the newly created URCAudioChannelBase representing the send destination target"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "RemoveSendDestinationTarget",
                                description: "Removes a send destination target channel from the specified audio domain.",
                                parameters: [
                                    { name: "AudioDomain", type: "ERCAudioDomain", description: "The audio domain from which to remove the destination target channel." },
                                    { name: "DestinationTargetChannelToRemove", type: "FName", description: "The name of the destination target channel to be removed." }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "StartSendChannelToDestinationTarget",
                                description: "Starts sending audio from a source channel to a specified destination target",
                                parameters: [
                                    { name: "AudioDomain", type: "ERCAudioDomain", description: "The audio domain in which the send destination exists" },
                                    { name: "DestinationTargetSendChannel", type: "FName", description: "The name of the destination target channel to which audio will be sent" },
                                    { name: "SendingSourceChannel", type: "URCAudioChannelBase*", description: "A pointer to the source audio channel that will send audio to the destination" }
                                ],
                                return: {
                                    type: "URCAudioChannelBase*",
                                    description: "A pointer to the SendController audio channel. This is the channel you want to control the Gain or apply Effects to"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "SetSendSourceActive",
                                description: "Activates or deactivates a send source for a specified audio domain and destination channel",
                                parameters: [
                                    { name: "AudioDomain", type: "ERCAudioDomain", description: "The audio domain in which the send destination target exists" },
                                    { name: "DestinationTargetSendChannel", type: "FName", description: "The name of the destination target send channel." },
                                    { name: "SendingSourceChannel", type: "URCAudioChannelBase*", description: "Pointer to the source audio channel that sends the audio (the `Sender` channel)" },
                                    { name: "bActive", type: "bool", description: "Whether to activate (true) or deactivate (false) the send through" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "StopSendAudioToTarget",
                                description: "Stops sending audio from a source channel to a specified target send channel within a given audio domain.",
                                parameters: [
                                    { name: "AudioDomain", type: "ERCAudioDomain", description: "The audio domain in which the send destination target exists" },
                                    { name: "DestinationTargetSendChannel", type: "FName", description: "The name of the target send channel to which audio is being sent." },
                                    { name: "SendingSourceChannel", type: "URCAudioChannelBase*", description: "A pointer to the source audio channel that is currently sending audio" }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetSendSourcesForDestinationTarget",
                                description: "Get all the incoming \"transmitting\" channels (\"senders\") that feed audio to the given destination SendChannel",
                                parameters: [
                                    { name: "AudioDomain", type: "ERCAudioDomain", description: "The audio domain in which the send destination target exists" },
                                    { name: "DestinationTargetSendChannel", type: "FName", description: "The Send destination group to get all sources for" }
                                ],
                                return: {
                                    type: "TArray<URCAudioChannelBase*>",
                                    description: "An array of all the incoming source channels that feed audio into this Send"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetSendControllersForDestinationTarget",
                                description: "Get all the SendController channels that control each corresponding incoming source into given the destination SendChannel. A controller channel is the actual channel you want to directly manipulate with effects and audio processing for the given source feed",
                                parameters: [
                                    { name: "AudioDomain", type: "ERCAudioDomain", description: "The audio domain in which the send destination target exists" },
                                    { name: "DestinationTargetSendChannel", type: "FName", description: "The Send destination group to get all controllers for" }
                                ],
                                return: {
                                    type: "TArray<URCAudioChannelBase*>",
                                    description: "An array of all the controllers"
                                }
                            }} />
                        </div>
                    </section>

                    <section id="soloing-functionality" className="docs-section">
                        <h3>Channel and Track Soloing API</h3>
                        <div className="s2 m2 font-1">
                            Simple API for controlling the Soloing in and out of audio channels and audio tracks.
                            <br/><br/>
                            <strong>NOTE: GameAudio soloing is currently unsupported - only music domain channels and tracks</strong>
                        </div>

                        <h4>Channel Soloing</h4>
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetChannelSoloingActive",
                                description: "Checks if channel soloing is currently active.",
                                parameters: [],
                                return: {
                                    type: "bool",
                                    description: "True if channel soloing is active; otherwise, false."
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "SetChannelSoloingActive",
                                description: "Sets the soloing state for AudioChannels in the Realtime Composer system. If true and there are any channels added to the ChannelsSoloList, they will be played soloed",
                                parameters: [
                                    { name: "bSoloingActive", type: "bool", description: "True to activate soloing for the channel; false to deactivate." }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "AddChannelToSoloList",
                                description: "Adds the specified audio channel to the solo list.",
                                parameters: [
                                    { name: "Channel", type: "URCAudioChannelBase*", description: "A pointer to the audio channel to add to the solo list." }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "RemoveChannelFromSoloList",
                                description: "Removes the specified audio channel from the solo list.",
                                parameters: [
                                    { name: "Channel", type: "URCAudioChannelBase*", description: "A pointer to the audio channel to remove from the solo list." }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "ClearSoloChannelsList",
                                description: "Clears the list of solo channels in the Realtime Composer system.",
                                parameters: [],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <h4>Track Soloing</h4>
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetTrackSoloingActive",
                                description: "Checks if track soloing is currently active.",
                                parameters: [],
                                return: {
                                    type: "bool",
                                    description: "True if track soloing is active; otherwise, false."
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "SetTrackSoloingActive",
                                description: "Sets the soloing state for track playback in the Realtime Composer system. If true and there are any tracks added to the TracksSoloList, they will be played soloed",
                                parameters: [
                                    { name: "bSoloingActive", type: "bool", description: "True to activate soloing mode for tracks; false to deactivate." }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "AddTrackToSoloList",
                                description: "Adds the specified audio track to the solo list.",
                                parameters: [
                                    { name: "Track", type: "URCAudioTrackBase*", description: "A pointer to the audio track to add to the solo list." }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "RemoveTrackFromSoloList",
                                description: "Removes the specified audio track from the solo list in the Realtime Composer system.",
                                parameters: [
                                    { name: "Track", type: "URCAudioTrackBase*", description: "A pointer to the audio track to be removed from the solo list." }
                                ],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "ClearSoloTracksList",
                                description: "Clears the list of solo tracks in the Realtime Composer system.",
                                parameters: [],
                                return: {
                                    type: "void",
                                    description: ""
                                }
                            }} />
                        </div>
                    </section>

                    <section id="rc-runtime-data-getters" className="docs-section">
                        <h3>RC Runtime Data Getters</h3>
                        <div className="s2 m2 font-1">
                            A data-fetch API meant for getting runtime data about the system.
                            <br/><br/>
                            Here are functions defined for getting musical states, audio channels, tracks, time in float to a musical cue, and more.
                        </div>

                        <h4>Time and Quantization</h4>
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetScheduleTimeForQuantizationType",
                                description: "Utility to get the time remainder to the specified quantization type while clock is playing",
                                parameters: [
                                    { name: "Quantization", type: "EQuartzCommandQuantization", description: "The quantization type" },
                                    { name: "Multiplier", type: "float", description: "The multiplier applied on the quantization type before calculation" }
                                ],
                                return: {
                                    type: "float",
                                    description: "Time in seconds for the next occurence of the specified quantization type"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetTimeToNextLoop",
                                description: "Get the time to the next Loop",
                                parameters: [],
                                return: {
                                    type: "float",
                                    description: "Time in seconds to the next loop"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetTimeToNextBar",
                                description: "Get the time to the next Bar",
                                parameters: [],
                                return: {
                                    type: "float",
                                    description: "Time in seconds to the next bar"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetTimeToNextBeat",
                                description: "Get the time to the next Beat",
                                parameters: [],
                                return: {
                                    type: "float",
                                    description: "Time in seconds to the next beat"
                                }
                            }} />
                        </div>

                        <h4>Master Audio Channels</h4>
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetRCMasterAudioChannel",
                                description: "Get the Master RCAudioChannel (direct child of the UE audio engine Master Submix)",
                                parameters: [],
                                return: {
                                    type: "URCAudioChannelBase*",
                                    description: "The master audio channel"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetRCRootMusicAudioChannel",
                                description: "Get the RootMusicAudioChannel (the direct parent of all MusicalStates)",
                                parameters: [],
                                return: {
                                    type: "URCAudioChannelBase*",
                                    description: "The RC.Master.MusicAudioMasterChannel"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetRCRootGameAudioChannel",
                                description: "Get the RootGameAudioChannel (the direct parent of all GameAudio MixGroups)",
                                parameters: [],
                                return: {
                                    type: "URCAudioChannelBase*",
                                    description: "The RC.Master.GameAudioMasterChannel"
                                }
                            }} />
                        </div>

                        <h4>Musical State Information</h4>
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetActiveMusicStateMaxEscalationFactor",
                                description: "Returns the number of escalation factors present in the active musical state. If no active musical state returns 0",
                                parameters: [],
                                return: {
                                    type: "int32",
                                    description: "Number of escalation factors in the active musical state"
                                }
                            }} />
                        </div>

                        <h4>Audio Channel Hierarchy</h4>
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetChildrenAudioChannels",
                                description: "Get the first level children audio channels under a parent channel",
                                parameters: [
                                    { name: "ParentChannel", type: "URCAudioChannelBase*", description: "The parent channel to search under" }
                                ],
                                return: {
                                    type: "const TArray<URCAudioChannelBase*>",
                                    description: "Array of child audio channels"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetAllChildrenAudioChannelsBelow",
                                description: "Get all of the children audio channels under a parent channel, disregarding hierarchy, all returned as one array",
                                parameters: [
                                    { name: "ParentChannel", type: "URCAudioChannelBase*", description: "The parent channel to search under" }
                                ],
                                return: {
                                    type: "const TArray<URCAudioChannelBase*>",
                                    description: "Array of all child audio channels below the parent"
                                }
                            }} />
                        </div>

                        <h4>GameAudio Mix Groups</h4>
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetGameAudioMixGroup",
                                description: "Get a top-level GameAudio mix group channel. NOTE: To create a new game audio channel, call AddNewGameAudioMixGroup",
                                parameters: [
                                    { name: "MixGroupName", type: "FName", description: "The channel group name" }
                                ],
                                return: {
                                    type: "URCAudioChannelBase*",
                                    description: "The game audio mix group channel"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetGameAudioSubMixGroup",
                                description: "Get a child audio channel of a top-level GameAudio mix group channel",
                                parameters: [
                                    { name: "ParentMixGroup", type: "URCAudioChannelData*", description: "The parent mix group channel" },
                                    { name: "ChildMixGroupChannelName", type: "FName", description: "The child channel name to search for" }
                                ],
                                return: {
                                    type: "URCAudioChannelBase*",
                                    description: "The child game audio mix group channel"
                                }
                            }} />
                        </div>

                        <h4>Musical States</h4>
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetMusicalStatesCollectionsContainer",
                                description: "Get all Musical States",
                                parameters: [],
                                return: {
                                    type: "TMap<FName, UMusicStateCollections*>",
                                    description: "Map of all musical states"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetMusicalStateCollection",
                                description: "Get a MusicalState by its name",
                                parameters: [
                                    { name: "MusicalStateName", type: "FName", description: "The name of the musical state" }
                                ],
                                return: {
                                    type: "UMusicStateCollections*",
                                    description: "The musical state collection"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetActiveMusicalState",
                                description: "Get currently active MusicalState (can be null if clock is not ticking)",
                                parameters: [],
                                return: {
                                    type: "UMusicStateCollections*",
                                    description: "The currently active musical state"
                                }
                            }} />
                        </div>

                        <h4>SubStates and SubCollections</h4>
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetEscalationFactorSubStateAudioChannel",
                                description: "Get the SubState-EscalationFactor AudioChannel under a MusicalState. NOTE: The term `SubState-EscalationFactor` is simply another way of saying an audio channel group that is a part of the main `Music` collection",
                                parameters: [
                                    { name: "OwningMusicalState", type: "UMusicStateCollections*", description: "The MusicalState to search under" },
                                    { name: "GroupName", type: "FName", description: "The name of the escalation factor group" }
                                ],
                                return: {
                                    type: "URCAudioChannel*",
                                    description: "The escalation factor sub-state audio channel"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetSubCollectionGroupAudioChannel",
                                description: "Get the AudioChannel group under a SubCollection of the MusicalState. NOTE: each MusicalState has a main `Music` collection, and 3 `Audio`, `Transients`, `Samples` sub-collections. Audio channels under a `Music` collection are referred to as SubStates or EscalationFactors, and audio channels under any of the other 3 sub-collections are referred to as SubCollectionGroups",
                                parameters: [
                                    { name: "OwningMusicalState", type: "UMusicStateCollections*", description: "The owning musical state" },
                                    { name: "Context", type: "EAudioTrackGroupContext", description: "The sub-collection context" },
                                    { name: "GroupName", type: "FName", description: "The group name" }
                                ],
                                return: {
                                    type: "URCAudioChannel*",
                                    description: "The sub-collection group audio channel"
                                }
                            }} />
                        </div>

                        <h4>Audio Tracks</h4>
                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetChannelAudioTracks",
                                description: "Get all audio tracks that belong to an audio channel",
                                parameters: [
                                    { name: "OwningChannel", type: "URCAudioChannelBase*", description: "The owning channel to get tracks from" }
                                ],
                                return: {
                                    type: "TArray<URCAudioTrackBase*>",
                                    description: "All audio tracks contained in the channel"
                                }
                            }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <BPFunction functionData={{
                                name: "GetAudioTrack",
                                description: "Get an audio track belonging to a channel",
                                parameters: [
                                    { name: "OwningChannel", type: "URCAudioChannelBase*", description: "The owning channel to search in" },
                                    { name: "TrackName", type: "FName", description: "The track name to search for" }
                                ],
                                return: {
                                    type: "URCAudioTrackBase*",
                                    description: "The audio track if found, nullptr if not found"
                                }
                            }} />
                        </div>
                    </section>
                </>
            )
        }
    }
    
    // Scroll tracking effect
    useEffect(() => {
        const handleScroll = () => {
            if (!mainContentRef.current) return

            const sections = mainContentRef.current.querySelectorAll('section[id]')
            const scrollTop = mainContentRef.current.scrollTop
            const viewportHeight = mainContentRef.current.clientHeight

            let currentSection = ''
            let minDistance = Infinity

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect()
                const sectionTop = rect.top
                const sectionHeight = rect.height
                
                // Calculate distance from section top to viewport center
                const distance = Math.abs(sectionTop + sectionHeight / 2 - viewportHeight / 2)
                
                if (distance < minDistance) {
                    minDistance = distance
                    currentSection = section.id
                }
            })

            if (currentSection && currentSection !== activeSection) {
                setActiveSection(currentSection)
            }
        }

        const mainContent = mainContentRef.current
        if (mainContent) {
            mainContent.addEventListener('scroll', handleScroll)
            return () => mainContent.removeEventListener('scroll', handleScroll)
        }
    }, [activeSection])

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId)
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const selectCategory = (categoryId: string) => {
        setActiveCategory(categoryId)
        // Set the first subcategory as active when switching categories
        const firstSubcategory = Object.keys(navigationStructure[categoryId as keyof typeof navigationStructure].subcategories)[0]
        setActiveSection(firstSubcategory)
        
        // Ensure the category is expanded when selected
        if (!expandedCategories.includes(categoryId)) {
            setExpandedCategories(prev => [...prev, categoryId])
        }
    }

    const toggleCategory = (categoryId: string, event: React.MouseEvent) => {
        event.stopPropagation() // Prevent category selection when clicking the chevron
        setExpandedCategories(prev => 
            prev.includes(categoryId) 
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        )
    }

    const isCategoryExpanded = (categoryId: string) => {
        return expandedCategories.includes(categoryId)
    }

    const isCategoryActive = (categoryId: string) => {
        return activeCategory === categoryId
    }

    const isSubcategoryActive = (subId: string) => {
        return activeSection === subId
    }

    

    return (
        <>
            <div className="docs-container">
                {/* Back button */}
                {/* <a href='/plugins/realtime-composer' className='docs-back-button'>
                    <Icon icon='ph:key-return-fill' width={'24px'} style={{ marginRight: '0.5rem' }} />
                    Back to Plugin
                </a> */}

                {/* Sidebar Navigation */}
                <div className="docs-sidebar">
                    <ul className="docs-nav-list">
                        {Object.entries(navigationStructure).map(([categoryId, category]) => (
                            <li key={categoryId} className="docs-nav-item">
                                {/* Category Header */}
                                <div 
                                    className={`docs-nav-category-header ${isCategoryActive(categoryId) ? 'active' : ''} ${isCategoryExpanded(categoryId) ? 'expanded' : ''}`}
                                    onClick={() => selectCategory(categoryId)}
                                >
                                    <span>{category.title}</span>
                                    <Icon 
                                        icon='mdi:chevron-right' 
                                        className='expand-icon' 
                                        width={'16px'} 
                                        onClick={(e) => toggleCategory(categoryId, e)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                
                                {/* Subcategories */}
                                <div className={`docs-nav-subcategories ${isCategoryExpanded(categoryId) ? 'expanded' : ''}`}>
                                    {Object.entries(category.subcategories).map(([subId, subTitle]) => (
                                        <div key={subId} className="docs-nav-subcategory">
                                            <a 
                                                href={`#${subId}`}
                                                className={`docs-nav-link ${isSubcategoryActive(subId) ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    scrollToSection(subId)
                                                }}
                                            >
                                                {subTitle}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="docs-main-content" ref={mainContentRef}>
                    {/* Title Section */}
                    <div className="docs-title">
                        <span className='font-4' style={{ fontSize: '8rem' }}>Realtime Composer</span>
                        <h2 className='font-4 s3'>Unreal Engine Plugin Documentation</h2>
                        <hr style={{ 
                            border: 'none', 
                            height: '1px', 
                            background: 'rgba(255, 255, 255, 0.2)', 
                            margin: '2rem 0' 
                        }} />
                        <h3 className='font-4 s4'>{navigationStructure[activeCategory as keyof typeof navigationStructure]?.title}</h3>
                        <span className='font-4 s1' style={{ 
                            color: 'rgba(255, 255, 255, 0.7)', 
                            fontWeight: 'normal', 
                            marginTop: '0.5rem',
                            lineHeight: '1.5'
                        }}>
                            {navigationStructure[activeCategory as keyof typeof navigationStructure]?.description}
                        </span>
                    </div>

                    {/* Category Content */}
                    {contentSections[activeCategory as keyof typeof contentSections]?.content}
                </div>
            </div>
        </>
    )
}