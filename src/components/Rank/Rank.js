import React from 'react';

const Rank = ({ entries, name }) => {
    return(
        <div>
            <div className='white f3'>
                {`${name},your current count is...`}
            </div>
            <div className='white f3'>
                {entries}
            </div>
        </div>
    );
}

export default Rank;