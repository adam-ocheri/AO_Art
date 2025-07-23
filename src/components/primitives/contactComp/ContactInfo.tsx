import { Icon } from '@iconify/react'
import React from 'react'

export default function ContactInfo() {
  return (
    <div className='swa' style={{ border: '5px dashed grey' }} id='contact'>
      <h2 className='pt1 pb7 mt7 mb7 black font-7 s4'>CONTACT</h2>
      <p className='p5 mb7 mt7 black font-1 s2'>
        If you want to contact me then please do not hesitate to reach out about anything. <br />
        I am always open to communication and interesting new cooperations, or even to just random geeky tech/art/life talks! <br />
        The ascent {'(or downfall)'} of any great empire had most always began with a plain conversation {':)'}
      </p>
      <p className='pb5 mb7 mt7 pb7 font-7 s3 black'>
        Keep In Touch
      </p>
      <section className='flex f-dir-row f-wrap j-even mt7 pt5'>

        <div className="contact-box p1 m1 flex f-dir-col align-items-center">
          <a href='mailto:adamotchery@gmail.com' target='_blank' rel='noreferrer' className="m1">
            <Icon icon='material-symbols:attach-email-outline' className="m1 link-icon-dark" />
          </a>
          <h3 className='gold font-3'>adamotchery@gmail.com</h3>
        </div>

        <div className="contact-box p1 m1 flex f-dir-col align-items-center">
          <a href='https://github.com/adam-ocheri' target='_blank' rel='noreferrer' className="m1">
            <Icon icon='jam:github-square' className="m1 link-icon-dark" />
          </a>
          <h3 className='gold font-3'>github.com/adam-ocheri</h3>
        </div>

        <div className="contact-box p1 m1 flex f-dir-col align-items-center">
          <a href='https://www.linkedin.com/in/adam-ocheri/' target='_blank' rel='noreferrer' className="m1">
            <Icon icon='ant-design:linkedin-outlined' className="m1 link-icon-dark" />
          </a>
          <h3 className='gold font-3'>linkedin.com/in/adam-ocheri</h3>
        </div>

        <div className="contact-box p1 m1 flex f-dir-col align-items-center">
          <a href='/AdamOcheriResume2025_SoftwareDeveloper.pdf' target='_blank' rel='noreferrer' className="m1">
            <Icon icon='academicons:cv-square' className="m1 link-icon-dark" />
          </a>
          <h3 className='gold font-3'>Resume</h3>
        </div>

      </section>
    </div>
  )
}
