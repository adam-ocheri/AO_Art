
import { Icon } from '@iconify/react'
import { useState, useEffect, useRef } from 'react'

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
                'installation': 'Installation',
                'setup': 'Setup',
                'basic-example': 'Basic Example Usage'
            }
        },
        'music-state-collections': {
            title: 'Music State Collections',
            description: 'Master the core concepts of music states, sub-states, and state transitions for dynamic audio systems.',
            subcategories: {
                'creating-states': 'Creating Music States',
                'sub-state-management': 'Sub-State Management',
                'state-transitions': 'State Transitions'
            }
        },
        'audio-channel-mixing': {
            title: 'Audio Channel Mixing',
            description: 'Explore advanced audio mixing techniques, channel configuration, and real-time effects processing.',
            subcategories: {
                'channel-configuration': 'Channel Configuration',
                'dynamic-mixing': 'Dynamic Mixing',
                'effects-processing': 'Effects Processing'
            }
        },
        'debug-console': {
            title: 'Debug Console',
            description: 'Utilize the debug console for monitoring, testing, and optimizing your musical implementations.',
            subcategories: {
                'console-features': 'Console Features',
                'manual-control': 'Manual Control',
                'performance-monitoring': 'Performance Monitoring'
            }
        }
    }

    // Content sections organized by category (only subcategories, no main category sections)
    const contentSections = {
        'getting-started': {
            content: (
                <>
                    <section id="installation" className="docs-section">
                        <h3>Installation</h3>
                        <p>
                            To install the Realtime Composer plugin, you need to download the plugin from the Unreal Engine Marketplace.
                        </p>
                        <p>
                            Once downloaded, the plugin will be automatically installed and available for use in your Unreal Engine projects.
                        </p>
                    </section>

                    <section id="setup" className="docs-section">
                        <h3>Setup</h3>
                        <p>
                            To setup the Realtime Composer plugin, you need to create a new project and add the plugin to the project.
                        </p>
                        <p>
                            The plugin will be automatically enabled when you create a new project, or you can manually enable it in the project settings.
                        </p>
                    </section>

                    <section id="basic-example" className="docs-section">
                        <h3>Basic Example Usage</h3>
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
                        </p>
                    </section>
                </>
            )
        },
        'music-state-collections': {
            content: (
                <>
                    <section id="creating-states" className="docs-section">
                        <h3>Creating Music States</h3>
                        <p>
                            Music States represent different emotional or gameplay contexts in your game. Each state can contain multiple audio tracks and sub-states that can be dynamically mixed based on gameplay events.
                        </p>
                        <p>
                            To create a new music state, use the Create Music State function in your Blueprint. This will return a reference to the newly created state that you can use throughout your project.
                        </p>
                    </section>

                    <section id="sub-state-management" className="docs-section">
                        <h3>Sub-State Management</h3>
                        <p>
                            Sub-states allow for fine-grained control over the musical composition. You can create multiple sub-states within a single music state and transition between them seamlessly.
                        </p>
                        <p>
                            Each sub-state can have its own audio tracks, volume levels, and transition parameters. This allows for complex musical arrangements that respond to gameplay events.
                        </p>
                    </section>

                    <section id="state-transitions" className="docs-section">
                        <h3>State Transitions</h3>
                        <p>
                            State transitions allow you to smoothly move between different musical states based on gameplay events. The system provides various transition types including crossfade, fade in/out, and immediate switching.
                        </p>
                        <p>
                            Configure transition parameters such as duration, curve type, and trigger conditions to create natural and responsive musical changes.
                        </p>
                    </section>
                </>
            )
        },
        'audio-channel-mixing': {
            content: (
                <>
                    <section id="channel-configuration" className="docs-section">
                        <h3>Channel Configuration</h3>
                        <p>
                            Configure individual audio channels with specific parameters such as volume, panning, and effects processing.
                        </p>
                        <p>
                            Each channel can be assigned to different audio tracks and can have its own processing chain including filters, reverb, and other effects.
                        </p>
                    </section>

                    <section id="dynamic-mixing" className="docs-section">
                        <h3>Dynamic Mixing</h3>
                        <p>
                            The system automatically adjusts the mix based on the current music state and sub-state, ensuring smooth transitions and appropriate audio levels.
                        </p>
                        <p>
                            Dynamic mixing parameters can be controlled through gameplay events, allowing for real-time adjustment of the musical mix based on player actions or game state changes.
                        </p>
                    </section>

                    <section id="effects-processing" className="docs-section">
                        <h3>Effects Processing</h3>
                        <p>
                            Apply various audio effects to individual channels or the entire mix. Supported effects include reverb, delay, filters, compression, and more.
                        </p>
                        <p>
                            Effects can be automated based on gameplay events, creating dynamic audio processing that enhances the player experience.
                        </p>
                    </section>
                </>
            )
        },
        'debug-console': {
            content: (
                <>
                    <section id="console-features" className="docs-section">
                        <h3>Console Features</h3>
                        <p>
                            Monitor active music states, sub-states, and audio channels in real-time. View performance metrics and system status information.
                        </p>
                        <p>
                            The console displays current playback status, active transitions, and system performance data to help you debug and optimize your musical implementation.
                        </p>
                    </section>

                    <section id="manual-control" className="docs-section">
                        <h3>Manual Control</h3>
                        <p>
                            Use the debug console to manually trigger state changes, adjust audio parameters, and test different musical configurations during development.
                        </p>
                        <p>
                            Manual controls allow you to test your musical system without needing to trigger specific gameplay events, making development and debugging much more efficient.
                        </p>
                    </section>

                    <section id="performance-monitoring" className="docs-section">
                        <h3>Performance Monitoring</h3>
                        <p>
                            Monitor system performance including CPU usage, memory allocation, and audio processing latency.
                        </p>
                        <p>
                            Performance metrics help you identify potential bottlenecks and optimize your musical system for better performance across different platforms and hardware configurations.
                        </p>
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