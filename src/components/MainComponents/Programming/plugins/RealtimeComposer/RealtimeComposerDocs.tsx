
import { Icon } from '@iconify/react'
import { useState } from 'react'

export default function RealtimeComposerPluginDocs() {
    const [activeCategory, setActiveCategory] = useState('getting-started')
    const [activeSection, setActiveSection] = useState('installation')
    const [expandedCategories, setExpandedCategories] = useState<string[]>(['getting-started'])

    // Navigation structure with categories and subcategories
    const navigationStructure = {
        'getting-started': {
            title: 'Getting Started',
            subcategories: {
                'installation': 'Installation',
                'setup': 'Setup',
                'basic-example': 'Basic Example Usage'
            }
        },
        'music-state-collections': {
            title: 'Music State Collections',
            subcategories: {
                'creating-states': 'Creating Music States',
                'sub-state-management': 'Sub-State Management',
                'state-transitions': 'State Transitions'
            }
        },
        'audio-channel-mixing': {
            title: 'Audio Channel Mixing',
            subcategories: {
                'channel-configuration': 'Channel Configuration',
                'dynamic-mixing': 'Dynamic Mixing',
                'effects-processing': 'Effects Processing'
            }
        },
        'debug-console': {
            title: 'Debug Console',
            subcategories: {
                'console-features': 'Console Features',
                'manual-control': 'Manual Control',
                'performance-monitoring': 'Performance Monitoring'
            }
        }
    }

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

    // Content sections organized by category
    const contentSections = {
        'getting-started': {
            title: 'Getting Started',
            content: (
                <>
                    <section id="getting-started" className="docs-section">
                        <h2>Getting Started</h2>
                        <p>
                            Welcome to the Realtime Composer plugin documentation. This guide will help you get started with implementing dynamic music systems in your Unreal Engine projects.
                        </p>
                    </section>

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
                            To use the Realtime Composer plugin, you need to create a new project and add the plugin to the project, or use the plugin in an existing project.
                        </p>
                        <p>
                            Create this function in your BP (preferably in the GameInstance), to create a MusicalState, a SubState, and an AudioTrack.
                        </p>
                        <div className='font-1 p5 m5'>
                            <img alt='realtime composer plugin preview' src={'../../RealtimeComposer_Docs_00.jpg'} width={'50%'} />
                        </div>
                        <p>
                            Then, order the system to start playing, the metronome will start ticking, and then you can start Escalating and Deescalating the SubState(s).
                        </p>
                        <div className='font-1 p5 m5'>
                            <img alt='realtime composer plugin preview' src={'../../RealtimeComposer_Docs_01.jpg'} width={'50%'} />
                        </div>
                    </section>
                </>
            )
        },
        'music-state-collections': {
            title: 'Music State Collections',
            content: (
                <>
                    <section id="music-state-collections" className="docs-section">
                        <h2>Music State Collections</h2>
                        <p>
                            Music State Collections are the core building blocks of the Realtime Composer system. They allow you to organize and manage different musical states within your game.
                        </p>
                    </section>

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
            title: 'Audio Channel Mixing',
            content: (
                <>
                    <section id="audio-channel-mixing" className="docs-section">
                        <h2>Audio Channel Mixing</h2>
                        <p>
                            The Audio Channel Mixing system provides advanced control over how different audio elements are combined and processed in real-time.
                        </p>
                    </section>

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
            title: 'Debug Console',
            content: (
                <>
                    <section id="debug-console" className="docs-section">
                        <h2>Debug Console</h2>
                        <p>
                            The Debug Console provides real-time monitoring and control over the Realtime Composer system during development and testing.
                        </p>
                    </section>

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
                <div className="docs-main-content">
                    {/* Title Section */}
                    <div className="docs-title">
                        <h1>Realtime Composer</h1>
                        <h2>Unreal Engine Plugin Documentation</h2>
                    </div>

                    {/* Category Content */}
                    {contentSections[activeCategory as keyof typeof contentSections]?.content}
                </div>
            </div>
        </>
    )
}