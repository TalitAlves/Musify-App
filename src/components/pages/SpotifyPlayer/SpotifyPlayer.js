/* import React, { useContext } from 'react'
import { useEffect } from 'react';
import { ApiContext } from '../../../services/Api'

const SpotifyPlayer = () => {
    const { access_token} = useContext(ApiContext);

    useEffect(()=> {
        const player = new Spotify.Player({
            name: 'Mi reproductor',
            getOAuthToken: (cb) => { cb(access_token); },
        });

        player.addListener('ready', ({ device_id }) => {
            console.log('Reproductor listo', device_id);
        });

        player.addListener('player_state_changed', (state) => {
            console.log('Estado del reproductor cambiado', state);
          });

          player.connect().then(success => {
            if (success) {
              console.log('Reproductor conectado correctamente');
            }
          }).catch(error => {
            console.log('Error al conectar el reproductor', error);
          });
        }, [access_token]);


  return (
    <div>SpotifyPlayer</div>
  )
}

export default SpotifyPlayer */