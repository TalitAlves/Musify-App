import React, { useContext } from 'react'
import { ApiContext } from '../../../services/Api';

const List = () => {
  const {apiResponse} = useContext(ApiContext)
   
  
  if(apiResponse){ 
    return (
      <>
        {apiResponse.tracks?.items?.map((music) => (
          <div key={music.id}>
            {music.name}
          </div>
        ))}
      </>
    );
  }
  return null
}

export default List;