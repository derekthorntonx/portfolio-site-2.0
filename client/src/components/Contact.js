import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

function Contact() {
    const contactRef = useRef();
    const [contactSectionIsVisible, setContactSectionIsVisible] = useState();
    
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        setContactSectionIsVisible(entry.isIntersecting)
      }, {
        threshold: 0.8
      })
      observer.observe(contactRef.current);
    }, [])


    return (
        <div ref={contactRef} style={{justifyContent: 'space-evenly'}} className={contactSectionIsVisible ? 'content-card show' : 'content-card'}>
          <div className='contacts'>
            <div className='contact-wrapper'><FontAwesomeIcon className='fa-2xl' icon={faEnvelope}/><div style={{display: 'flex', placeItems: 'center', marginLeft: '10px'}}>derek-thornton@hotmail.ca</div></div>
            <div className='contact-wrapper'><FontAwesomeIcon className='fa-2xl' icon={faLinkedin}/><div style={{display: 'flex', placeItems: 'center'}}>
            <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/derek-thornton-067546262/" style={{display: 'flex', placeItems: 'center', marginLeft: '10px'}}>LinkedIn</a></div></div>
            <div className='contact-wrapper'>
              <FontAwesomeIcon className='fa-2xl' icon={faGithub}/>
              <a rel="noopener noreferrer" target="_blank" href="https://github.com/derekthorntonx" style={{display: 'flex', placeItems: 'center', marginLeft: '10px'}}>GitHub</a>
              </div>
              
        
            </div>
        </div>
    )
}

export default Contact;