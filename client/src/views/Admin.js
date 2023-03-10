import Login from "../components/Login";
import { useState, useEffect } from 'react';
import ProjectTag from "../components/ProjectTag";
import ProjectEditable from '../components/ProjectEditable'


//No context because login session should end immediately on navigation.
function Admin(){
    const [loggedIn, setLoggedIn] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [codeLink, setCodeLink] = useState('');
    const [demoLink, setDemoLink] = useState('');
    const [imgFile, setImgFile] = useState(null);
    const [projectDescription, setProjectDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [token, setToken] = useState('');
    const [projectsList, setProjectsList] = useState([]);

    // On dropdown menu change, add option to list of tags if it's not included yet
    const handleTag = (e) => {
        e.preventDefault();
        if (e.target.value === 'none'){return};
        if (tags.includes(e.target.value)){
            return;
        }
        setTags([...tags, e.target.value])
    }

    const selectFile = (e) => {
        setImgFile(e.target.files[0])
    }


    const handleFormSubmit = async () => {
        if (loggedIn === false || projectName === '' || codeLink === '' || demoLink === '' || projectDescription === ''){return}
        
        let data = new FormData();
            data.append('title', projectName);
            data.append('codeLink', codeLink);
            data.append('demoLink', demoLink);
            data.append('description', projectDescription);
            data.append('tags', [tags])
            data.append('projectImage', imgFile)
        try {
            await fetch('http://localhost:5001/projects/create', {
                method: 'POST',
                headers: {
                    'Authorization': token
                },
                body: data,
            })
            console.log('fetch sent!')
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchProjectList(){
        const response =  await fetch('http://localhost:5001/projects/all', {
            method: 'GET'});
        const projects = await response.json();
        setProjectsList(projects)
    }

    useEffect(() => {
            fetchProjectList();
    }, [])

    return(
    <div className='admin-wrapper'>
        {!loggedIn ? <Login setLoggedIn={setLoggedIn} setToken={setToken} /> : <div className="admin-page">
        <form className="admin-form" onSubmit={handleFormSubmit} encType='multipart/form-data'>
                <h2>Add a project</h2>
                <label htmlFor="projectName">Title</label>
                <input type='text' id="projectName" name="title" required value={projectName} onChange={(e) => setProjectName(e.target.value)}/>

                <label htmlFor="codeLink">Code Link</label>
                <input type='text' id="codeLink" value={codeLink} name="codeLink" required onChange={(e) => setCodeLink(e.target.value)}/>

                <label htmlFor="demoLink">Demo Link</label>
                <input type='text' id="demoLink" value={demoLink} name="demoLink" required onChange={(e) => setDemoLink(e.target.value)}/>

                <label htmlFor="projectDescription">Description</label>
                <textarea rows="4" cols="50" id="projectDescription" name="description" required value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}/>

                <label htmlFor="projectImage">Image</label>
                <input type='file' id="projectImage" name="projectImage" onChange={selectFile} required />
 
                <label htmlFor="projectTags">Tags</label>
                <select name="projectTags" id="projectTags" defaultValue='none' onChange={handleTag}>
                    <option value='none'>Choose a tag...</option>
                    <option value='frontend'>Front-end</option>
                    <option value='backend'>Back-end</option>
                    <option value='fullstack'>Full-stack</option>
                    <option value='react'>React.js</option>
                    <option value='thirdparty'>Third-party API</option>
                    <option value='productivity'>Productivity</option>
                    <option value='entertainment'>Entertainment</option>
                </select>
                <div className="tags-wrapper">
                    {tags.map((tag, index) => <ProjectTag key={index} tag={tag} tags={tags} setTags={setTags}/>)}
                </div>

                <button className='project-create-button'>Create</button>
        </form>

        <div className="admin-projects-list">
        {projectsList.map(project => 
            <ProjectEditable key={project._id} project={project} token={token} fetchProjectList={fetchProjectList}/>
            )}
        </div>

        </div>}
    </div>
    )
}

export default Admin;