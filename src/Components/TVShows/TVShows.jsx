import React, { useEffect, useState } from 'react';
import { API_KEY, imageUrl } from '../../constants/constants';
import axios from '../../axios';
import YouTube from 'react-youtube';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import './TVShows.css';

function TVShows(props) {
  const [shows, setShows] = useState([]);
  const [urlid, setUrlid] = useState(null);

  useEffect(() => {
    console.log(`Fetching data from URL: ${props.url}`);
    axios.get(props.url)
      .then((response) => {
        console.log('Response data:', response.data);
        if (response.data && response.data.results) {
          setShows(response.data.results);
        } else {
          setShows([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching TV shows:', error);
        setShows([]);
      });
  }, [props.url]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleShow = (id) => {
    console.log(`Fetching trailer for show ID: ${id}`);
    axios.get(`/tv/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        console.log('Trailer data:', response.data);
        if (response.data.results.length !== 0) {
          setUrlid(response.data.results[0]);
        } else {
          console.log('No trailers available');
        }
      })
      .catch((error) => {
        console.error('Error fetching trailer:', error);
      });
  };

  const closeTrailer = () => {
    setUrlid(null);
  };

  return (
    <div className='grid-container'>
      <h2>{props.title}</h2>
      <div className='grid'>
        {shows.length > 0 ? shows.map((obj) => (
          <div className='grid-item' key={obj.id} onClick={() => handleShow(obj.id)}>
            <img
              className='poster'
              src={obj.backdrop_path ? `${imageUrl + obj.backdrop_path}` : ''}
              alt={obj.name || obj.title || 'TV Show Poster'}
            />
          </div>
        )) : <p>No shows available</p>}
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

export default TVShows;
