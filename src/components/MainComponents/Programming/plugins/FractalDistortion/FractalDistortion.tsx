import FractalTitle from "./FractalTitle"
import { Icon } from '@iconify/react'

export default function FractalDistortionPlugin() {

    return (
        <>
            <div className="canvas-container">
                {true &&
                    <div className="flex j-center">
                        <div className="f-dir-col jt-center p5 b-img-fractal-title" >
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
                            <FractalTitle />
                            <section>
                                <div className='area-text p4 mt6'>
                                    <div className='font-1 s2' style={{ textAlign: 'left' }}>
                                        The Fractal Distortion VST plugin is a unique sound shaper that augments a basic fuzz distortion DSP with a mandelbrot-driven frequency modulation processor.
                                        <br />
                                        It is developed using the JUCE C++ framework, enabling streamlined audio DSP development and seamless plugin integration.
                                        <br />
                                        By combining a classic distortion sound with the mathematical formula of fractals, the Fractal Distortion plugin opens up an endless potential for a plethora of sounds, colorful tones, ambience and soundscapes.
                                        <br />
                                    </div>
                                    <div className='font-1 p5 m5'>
                                        <img alt='fractal distortion plugin preview' src={'../../FD1_L.jpg'} />
                                    </div>
                                    <div className='font-1 s2 ' style={{ textAlign: 'left' }}>
                                        All of the top parameters influence the core distortion sound, with the exclusion of <span className='font-3'>XFractal</span>, which essentially controls the mix between the basic distorted signal with the "fractalized" signal.
                                        <br />
                                        The middle row parameters manipulate the fractal behavior, potentially resulting in extreme changes in sound character, and even tone frequency.
                                        <br />
                                        The last row of parameters are changing the fractal shape. Each change on an individual parameter may not shift the sound in a great amount, though the combination of changing and tweaking them all can result in a wide range of modulation behavior, gradual yet unexpected shape-shifting of sonic qualities, with many "sweet spots" to find and hold on to.
                                        <br />
                                    </div>

                                    <div className='p5 m5 font-9 s3 j-even'>
                                        <span>Watch demo</span>
                                        <div >
                                            <iframe className='vid-frame' src="https://www.youtube.com/embed/3Rkq0WPMDP8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
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