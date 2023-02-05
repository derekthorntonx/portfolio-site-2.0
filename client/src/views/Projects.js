import { useState } from 'react';

function Projects() {
    const [tags, setTags] = useState([]);

    return(
    <div className='about-me-section'>
            <form>
                <input type='checkbox' name='tag1' value='test'/>
                <label htmlFor='tag1'>Put tags here</label>
            </form>
            
        <div className='section-divider waves'></div>
    </div>
    )
}

export default Projects;