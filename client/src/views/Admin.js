import Login from "../components/Login";
import { useState, useEffect } from 'react';
import ProjectTag from "../components/ProjectTag";
import ProjectEditable from "../components/ProjectEditable";


//No context because login session should end immediately on navigation.
function Admin(){
    const [loggedIn, setLoggedIn] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [codeLink, setCodeLink] = useState('');
    const [demoLink, setDemoLink] = useState('');
    const [imgLink, setImgLink] = useState('');
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

    const handleFormSubmit = async () => {
        if (loggedIn === false || projectName === '' || codeLink === '' || demoLink === '' || imgLink === '' || projectDescription === ''){return}
        
        try {
            await fetch('http://localhost:5001/projects/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    title: projectName,
                    codeLink: codeLink,
                    demoLink: demoLink,
                    description: projectDescription,
                    imgSource: imgLink,
                    showcase: false,
                    tags: [tags]
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchProjectList(){
        const response =  await fetch('http://localhost:5001/projects/all', {
            method: 'GET'});
        const projects = await response.json();
        setProjectsList(projects)
        console.log(projects)
    }

    useEffect(() => {
            fetchProjectList();
    }, [])

    return(
    <div className='admin-wrapper'>
        {!loggedIn ? <Login setLoggedIn={setLoggedIn} setToken={setToken} /> : <div className="admin-page">
        <form className="admin-form" onSubmit={handleFormSubmit}>
                <h2>Add a project</h2>
                <label htmlFor="projectName">Title</label>
                <input type='text' id="projectName" required value={projectName} onChange={(e) => setProjectName(e.target.value)}/>

                <label htmlFor="codeLink">Code Link</label>
                <input type='text' id="codeLink" value={codeLink} required onChange={(e) => setCodeLink(e.target.value)}/>

                <label htmlFor="demoLink">Demo Link</label>
                <input type='text' id="demoLink" value={demoLink} required onChange={(e) => setDemoLink(e.target.value)}/>

                <label htmlFor="projectDescription">Description</label>
                <textarea rows="4" cols="50" id="projectDescription" required value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}/>

                <label htmlFor="imgSource">Image</label>
                <input type='file' id="imgSource" value={imgLink} required onChange={(e) => setImgLink(e.target.value)}/>

                <label htmlFor="projectTags">Tags</label>
                <select name="projectTags" id="projectTags" defaultValue='none' onChange={handleTag}>
                    <option value='none'>Choose a tag...</option>
                    <option value='frontend'>Front-end</option>
                    <option value='backend'>Back-end</option>
                    <option value='fullstack'>Full-stack</option>
                    <option value='react'>React.js</option>
                    <option value='javascript'>Javascript</option>
                    <option value='python'>Python</option>
                    <option value='php'>PHP</option>
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