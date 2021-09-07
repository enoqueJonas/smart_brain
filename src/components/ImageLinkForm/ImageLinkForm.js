import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div className='f3'>
            <p>{'This magic brain will detect faces in your pictures.'}</p>
            <div className='center'>
                <div className=' center form pa4 br3 shadow-5 ' >
                    <input className='f4 pa2 w-70 center' type='text' onChange = { onInputChange }></input>
                    <button className='w-30 grow f4 ph3 link pv2 dib white bg-light-purple ' onClick= { onButtonSubmit }>Detect</button>
                </div>
            </div>
        </div> 
    );
}

export default ImageLinkForm;