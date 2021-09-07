import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imageUrl} alt='' width='500px' height='auto'></img>
                <div className='bounding-box' style={{top: box.top_row, right: box.right_col, left: box.left_col , bottom: box.bottom_row }}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;