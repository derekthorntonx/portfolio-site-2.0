import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Project from '../components/Project';

function Projects() {
    const [tags, setTags] = useState([]);
    const [projectsList, setProjectsList] = useState([]);
    const [list, setList] = useState([]);

    const filterTags = (array) => {
        if (tags.length === 0){
            return array;
        }
        return array.filter((item) => tags.some(tag => item.tags[0].split(',').includes(tag)))
    }

    //If the target was checked, add its value to the tags array; if the target was unchecked,
    //remove it from the array
    const handleTagSelect = (e) => {
        if (e.target.checked){
            setTags([...tags, e.target.value])
        }
        if (!e.target.checked){
            setTags(tags.filter(a => a !== `${e.target.value}`))
        }
    }

    // Fetch every project
    useEffect(() => {
        async function fetchProjectList(){
            const response =  await fetch('http://localhost:5001/projects/all', {
                method: 'GET'});
            const projects = await response.json();
            setProjectsList(projects)
            setList(projects)
        }
            fetchProjectList();
    }, []);

    //Filter components not containing the selected tags
    useEffect(() => {
        let result = projectsList;
        result = filterTags(result);
        setList(result)
    }, [tags])

    return(
    <div className='projects-section'>
        <div>
        <Link to='/' className='back-nav'>Home</Link>

        <form onChange={handleTagSelect} className='tags-form'>
            <div>
                <input type='checkbox' name='tag1' value='frontend'/>
                <label htmlFor='tag1'>Front-end</label>
            </div>

            <div>
                <input type='checkbox' name='tag2' value='backend'/>
                <label htmlFor='tag2'>Back-end</label>
            </div>

            <div>
                <input type='checkbox' name='tag3' value='fullstack'/>
                <label htmlFor='tag3'>Full-stack</label>
            </div>

            <div>
                <input type='checkbox' name='tag4' value='react'/>
                <label htmlFor='tag4'>React</label>
            </div>

            <div>
                <input type='checkbox' name='tag5' value='javascript'/>
                <label htmlFor='tag5'>Javascript</label>
            </div>

            <div>
                <input type='checkbox' name='tag6' value='php'/>
                <label htmlFor='tag6'>PHP</label>
            </div>
        </form>
        {list.map(project => 
            <Project key={project._id} project={project} />
            )}
        </div>
        
    </div>
    )
}

export default Projects;