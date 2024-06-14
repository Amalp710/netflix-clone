import React,{useEffect, useState} from 'react'
import { API_KEY } from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'
import { imageUrl} from '../../constants/constants'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'

function Banner() {
  const [movie,setMovie]= useState([])
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0]);
      const movies = response.data.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      setMovie(movies[randomIndex]);
      

    })
  }, [])
  
    
  return (
    <div 
    style={{backgroundImage:`url(${imageUrl+movie?.backdrop_path})`}}
    className='banner'>
        <div className='content'>
            <h1 className='title'>{movie?.title}</h1>
            <div className='banner_buttons'>
                <button className='button' ><img src={play_icon} alt="" />Play</button>
                <button className='button'><img src={info_icon} alt="" />My List</button>
            </div>
            <h1 className='discription'>{movie?.overview}</h1>

        </div>
        <div className="fade_bottom"></div> 
      </div>
  )
}

export default Banner
