import './SavedTracks.css';
import React, { useState, useEffect } from 'react';

const SavedTracks = () => {
  const [savedTracks, setSavedTracks] = useState([]);

  useEffect(() => {
    const fetchSavedTracks = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/tracks', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.access_token,
          },
        });
        const data = await response.json();

        setSavedTracks(data);
        console.log("respuesta canciones favoritas", data);
      } catch (error) {
        console.log("petición favoritos fallida", error);
      }
    };
    fetchSavedTracks();
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default SavedTracks;
