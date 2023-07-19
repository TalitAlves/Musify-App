import React from 'react'

const ShowMoreButon = ({ visibleTracks, allTracks, handleShowMore }) => {
    return (
        <div>
            {visibleTracks < allTracks.length && (
                <button onClick={handleShowMore}>Mostrar más</button>
            )}

        </div>
    )
}

export default ShowMoreButon