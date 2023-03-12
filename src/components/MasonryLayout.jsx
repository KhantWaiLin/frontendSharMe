import React from 'react'
import Masonary from 'react-masonry-css';

import Pin from './Pin';

const breakPointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1
}

const MasonryLLayout = ({ pins }) => {
  return (
    <Masonary className='flex animate-slide-fwd' breakpointCols={breakPointObj}>
      {pins?.map((pin) => <Pin key={pin._id} pin={pin} />)}
    </Masonary>
  )
}

export default MasonryLLayout