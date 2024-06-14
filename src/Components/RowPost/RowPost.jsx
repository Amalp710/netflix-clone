import React, { useEffect, useState } from 'react';
import { API_KEY, imageUrl } from '../../constants/constants';
import axios from '../../axios';
import './RowPost.css';
import YouTube from 'react-youtube';
import back_arrow_icon from '../../assets/back_arrow_icon.png';

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlid, setUrlid] = useState(null);

  useEffect(() => {
    axios.get(props.url).then((response) => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }, [props.url]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
      console.log(response.data);
      if (response.data.results.length !== 0) {
        setUrlid(response.data.results[0]);
      } else {
        console.log('empty');
      }
    });
  };

  const closeTrailer = () => {
    setUrlid(null);
  };

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj) => (
          <img
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? 'small-poster' : 'poster'}
            src={`${imageUrl + obj.backdrop_path}`}
            alt="card"
            key={obj.id}
          />
        ))}
      </div>
      {urlid && (
        <div className='trailer'>
          <img
            className='back-arrow'
            onClick={closeTrailer} 
            src={back_arrow_icon}
            alt="Back"
          />
          <YouTube opts={opts} videoId={urlid.key} />
        </div>
      )}
    </div>
  );
}

export default RowPost;
