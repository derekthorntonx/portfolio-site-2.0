import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Project from '../components/Project';

function Projects() {
    const [tags, setTags] = useState([]);
    const [projectsList, setProjectsList] = useState([]);

    useEffect(() => {
        async function fetchProjectList(){
            const response =  await fetch('http://localhost:5001/projects/all', {
                method: 'GET'});
            const projects = await response.json();
            setProjectsList(projects)
            
        }
            fetchProjectList();
    }, []);

    return(
    <div className='projects-section'>
        <div>
        <Link to='/'>back</Link>

        <form>
            <input type='checkbox' name='tag1' value='test'/>
            <label htmlFor='tag1'>Put tags here</label>
        </form>
        {projectsList.map(project => 
            <Project key={project._id} project={project} />
            )}
        </div>
        
    </div>
    )
}

export default Projects;