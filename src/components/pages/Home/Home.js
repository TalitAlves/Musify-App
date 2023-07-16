import spotifyBackground from '../../../assets/spotify-background.png';
import './Home.css';

const Home = () => {

  return (
    <div className='home-page'>
    <img src={spotifyBackground} alt='spotify background'/>
    </div>
  )
}

export default Home;