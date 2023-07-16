import spotifyBackground from '../../../assets/spotify-background.png';
import Searcher from '../Searcher/Searcher';
import './Home.css';

const Home = ({artists}) => {

  console.log(artists);

  return (
    <div className='home-page'>
    <img src={spotifyBackground} alt='spotify background'/>

    <Searcher artists={artists} />

    </div>
  )
}

export default Home;