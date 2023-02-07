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
            const response = await fetch (`http://localhost:5001/projects/${project._id}`, {
                method: 'DELETE',
                headers: {'Authorization': token}
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
                <button className={project.showcase ? 'favourited' : ''} onClick={handleToggleShowcase}>*</button>
                <button onClick={handleDelete}>x</button>
            </div>
        </div>
    )
}

export default ProjectEditable;