import React from 'react';
import  './loader.css';
import Loader from 'react-loader-spinner';

const Spinner = (props) => {
  return(
    <div className='loading'><Loader
    type="Plane"
    color="Orangered"
/></div>
    
  )
}

export default Spinner