import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-scroll'

export default function HomeTitle() {
    return (
        <div className="p5 b-img-title" id='home'>



            <h1 className='font-9 s-vw1 main-title'>Adam Ocheri</h1>
            <h2 className='font-9 s3 flex f-wrap j-even'><span className='tech-art'>Tech</span> <span className='tech-art'>Art</span></h2>

            <div className='flex f-dir-row j-center mt7 mb7 p5'>
                <a href='mailto:adamotchery@gmail.com' target='_blank' rel='noreferrer' className="m3">
                    <Icon icon='material-symbols:attach-email-outline' className="m3 link-icon" />
                </a>
                <a href='https://github.com/adam-ocheri' target='_blank' rel='noreferrer' className="m3">
                    <Icon icon='jam:github-square' className="m3 link-icon" />
                </a>
                <a href='https://www.linkedin.com/in/adam-ocheri/' target='_blank' rel='noreferrer' className="m3">
                    <Icon icon='ant-design:linkedin-outlined' className="m3 link-icon" />
                </a>
                <a href='/AdamOcheriResume2025_SoftwareDeveloper.pdf' target='_blank' rel='noreferrer' className="m3">
                    <Icon icon='academicons:cv-square' className="m3 link-icon" />
                </a>
            </div>

            <Link
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
            >
                <Icon icon='material-symbols:keyboard-arrow-down-rounded' className="m3 down-arrow" />
            </Link>

        </div>
    )
}
