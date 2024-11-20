import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ContentListing = ({ content }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    let description = content.description ?? '';

    if (!showFullDescription) {
        description = description.substring(0, 90) + '...';
    }
    return (
        <div className='bg-white rounded-xl shadow-md relative'>
            <div className='p-4'>
                <div className='mb-6'>
                    <h3 className='text-xl font-bold'>{content.title}</h3>
                </div>
                <div className='mb-5'>{description}</div>
                <button
                    onClick={() => setShowFullDescription((prevState) => !prevState)}
                    className='text-indigo-500 mb-5 hover:text-indigo-600'
                >
                    {showFullDescription ? 'Less' : 'More'}
                </button>
            </div>
            <div className='flex flex-col lg:flex-row justify-between mb-4'>
                <NavLink
                    to={`/content/${content.id}`}
                    className='h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm'>
                    Read More
                </NavLink>
            </div>
        </div>
    )
}

ContentListing.propTypes = {
    content: PropTypes.object.isRequired,
}

export default ContentListing