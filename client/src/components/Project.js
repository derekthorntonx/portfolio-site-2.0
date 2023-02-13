import {useState, useEffect, useRef} from 'react';

function Project({ project }) {
    const path = project.imgSource.split('/')[1];
    let tagArray = project.tags[0].split(',')
    const [projectIsVisible, setProjectIsVisible] = useState(false);
    const projectRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setProjectIsVisible(entry.isIntersecting);
        }, {
            threshold: 0.8
        })
        observer.observe(projectRef.current)
    }, [])


    return(
        <div ref={projectRef} className={projectIsVisible ? "content-card show" : "content-card"}>
            <div className="content-image">
                <img src={'http://localhost:5001/' + path} alt=''></img>
            </div>
            <div className="content-info">
                <h1 style={{textAlign: 'center'}}>{project.title}</h1>
                
                <p style={{marginBottom: '2.5%'}}>{project.description}</p>

                <div className="tags-list">
                    {tagArray.map((tag, index) => <div className="project-tag" key={index}>
                    {tag}
                    </div>)}
                </div>

                <div className="content-card-buttons">  
                    <button className="project-links">
                        <a href={`${project.codeLink}`} target="_blank" rel="noopener noreferrer">Code</a>
                     </button>
                    <button className="project-links">
                        <a href={`${project.demoLink}`} target="_blank" rel="noopener noreferrer">Demo</a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Project;