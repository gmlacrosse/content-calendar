import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContentListing from './ContentListing';
import Spinner from './Spinner';
import axios from 'axios';

const ContentListings = ({isHome = false}) => {

    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            const API_ENDPOINTS = {
                CONTENT: 'http://localhost:5000/api/content',
            };
            const apiUrl = `${API_ENDPOINTS.CONTENT}`
            try {
                const response = await axios.get(apiUrl);
                const data = await response.data;
                setContent(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchContent();
    }, [isHome]);

    return (
        <section className='bg-blue-50 px-4 py-10'>
            <div className='container-xl lg:container m-auto'>
                <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
                    {isHome ? 'Recent Content' : 'Browse Content'}
                </h2>

                {loading ? (
                    <Spinner loading={loading} />
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {isHome === true && content.slice(0,3).map((c) => (
                            <ContentListing key={c.id} content={c} />
                        ))}
                        {isHome === false && content.map((c) => (
                            <ContentListing key={c.id} content={c} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
ContentListings.propTypes = {
    isHome: PropTypes.bool,
};

export default ContentListings;
