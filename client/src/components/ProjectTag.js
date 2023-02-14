import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ProjectTag({ tag, tags, setTags }) {

    const handleRemoveTag = (e) => {
        e.preventDefault();
        setTags(tags.filter(el => el.includes(tag)))
    }

    return(
        <div className="project-tag">
            <h4 style={{marginRight: '5px'}}>{tag}</h4>
            <button className="tag-button" onClick={handleRemoveTag}><FontAwesomeIcon icon={faTrash}/></button>
        </div>
    )
}

export default ProjectTag;