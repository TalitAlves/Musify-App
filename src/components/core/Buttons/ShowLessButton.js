import React from "react";
import { IoMdArrowDropup } from "react-icons/io";

const ShowLessButton = ({visibleTracks, allTracks, handleShowLess}) => {
    return (
        <div>
          {visibleTracks > 5 && (
            <button onClick={handleShowLess}>Mostrar menos<IoMdArrowDropup className='icon' /></button>
          )}
        </div>
      );
}

export default ShowLessButton;
// className='btn-div'