import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ProjectEditable({ project, token, fetchProjectList }) {

    const handleToggleShowcase = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5001/projects/${project._id}`, {
            method: 'POST',
            headers: {'Authorization': token}
        })
        if(response.ok){
            fetchProjectList();
        }

        if(!response.ok){
            console.log('Toggle fav failed.')
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const result = window.confirm('Delete?');

        if(result){
            let path = './' + project.imgSource;
            const response = await fetch (`http://localhost:5001/projects/${project._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token},
                body: JSON.stringify({
                    path: path
                })
            })
            if(response.ok){
                fetchProjectList();
            } else {console.log('Delete failed.')}
        }
        return;
    }

    return(
        <div className="project-edit">
            {project.title}
            <div>
                <button className={project.showcase ? 'favourited' : ''} onClick={handleToggleShowcase}><FontAwesomeIcon icon={faStar}/></button>
                <button onClick={handleDelete}><FontAwesomeIcon icon={faTrash}/></button>
            </div>
        </div>
    )
}

export default ProjectEditable;