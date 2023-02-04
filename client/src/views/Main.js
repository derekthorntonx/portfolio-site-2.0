import resume from '../assets/DerekThorntonResume2023.pdf';
import AboutMe from '../components/AboutMe';
import { useEffect, useState } from 'react';

function Main() {
    const [frontpageProjects, setFrontpageProjects] = useState([]);

    useEffect(() => {
        async function fetchShowcaseData(){
            const response =  await fetch('http://localhost:5001/projects/showcase', {
                method: 'GET'});
            const showcaseList = await response.json();
            setFrontpageProjects(showcaseList);
            console.log(showcaseList)
        }
            fetchShowcaseData();
    }, [])

  return (
    <div className="App">
      <header className='navbar'>
        <ul>
          <li><a href='#aboutMe'>About</a></li>
          <li><a href='#projects'>Projects</a></li>
          <li><a href='#contact'>Contact</a></li>
        </ul>
        <a href={resume} target='_blank' rel="noopener noreferrer"  className='navbar-resume'>Resume</a>
      </header>

      <section className='about-me-section' id='aboutMe'>
        <AboutMe />
        <div className='section-divider waves'></div>
      </section>
      
      <section className='projects-section' id='projects'>
    
      </section>

      <section className='contact-section' id='contact'>
          
      </section>
    </div>
  );
}

export default Main;
