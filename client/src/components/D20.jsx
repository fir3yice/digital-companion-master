import React from 'react';

const D20 = ({number, prey}) => {
  return (
    <span className="hex">
        <div
        className='flex justify-center items-center text-center'>
            <p className={`text-6xl font-bold ${prey === 1 ? 'rotate-180' : ''}`}>
                {number}
            </p>
            </div>
    </span>
  );
};

export default D20;
