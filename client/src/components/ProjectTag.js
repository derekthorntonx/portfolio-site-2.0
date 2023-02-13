function ProjectTag({ tag, tags, setTags }) {

    const handleRemoveTag = (e) => {
        e.preventDefault();
        setTags(tags.filter(el => el.includes(tag)))
    }

    return(
        <div className="project-tag">
            <h4 style={{marginRight: '5px'}}>{tag}</h4>
            <button className="tag-button" onClick={handleRemoveTag}>Del</button>
        </div>
    )
}

export default ProjectTag;