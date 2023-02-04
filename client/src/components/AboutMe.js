import Github from '../assets/github-mark.svg';
import LinkedIn from '../assets/linkedin.svg';
import resume from '../assets/DerekThorntonResume2023.pdf';
import { useState, useEffect, useRef } from 'react';

function AboutMe() {
    const aboutMeRef = useRef();
    const [aboutSectionIsVisible, setAboutSectionIsVisible] = useState();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          const entry = entries[0];
          setAboutSectionIsVisible(entry.isIntersecting)
        }, {
          threshold: 0.8
        })
        observer.observe(aboutMeRef.current);
      }, [])

    return (
        <div className={aboutSectionIsVisible ? 'about-me-card' : 'about-me-card hide'} ref={aboutMeRef}>
            <div className="about-me-blurb">
                <h1>Hello, I'm Derek</h1>
                <h5>Full-stack Developer & Web Designer</h5>
                <p style={{width: '82.5%', textIndent: '5vh'}}> I aim to create and refine simple yet scalable solutions for all things web-related. This site is designed to catalogue my previous and upcoming projects.
                </p>
                <div style={{width: '35%', display: 'flex', justifyContent: 'space-evenly'}}>
                    <a rel="noopener noreferrer" target="_blank" href="https://github.com/derekthorntonx">
                        <img alt='Github' src={Github}/>
                    </a>
                    <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/derek-thornton-067546262/">
                        <img alt='LinkedIn' src={LinkedIn}/>
                    </a>
                </div>
                <a href={resume} target='_blank' rel="noopener noreferrer"  className='about-me-resume project-links'>Resume</a>
            </div>
        </div>
    )
}

export default AboutMe;