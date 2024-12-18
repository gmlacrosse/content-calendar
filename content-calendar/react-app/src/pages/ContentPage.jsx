import { useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import axios from 'axios';

const ContentPage = ({ deleteContent }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [content, setContent] = useState({});

    const onDeleteClick = (contentId) => {
        const confirm = window.confirm(
            'Are you sure you want to delete this listing?'
        );

        if (!confirm) return;

        deleteContent(contentId);

        toast.success("Content deleted");

        navigate('/content');
    };

    useEffect(() => {
        const fetchContent = async () => {
            const API_ENDPOINTS = {
                CONTENT: `http://localhost:5000/api/content/${id}`,
            };
            const apiUrl = `${API_ENDPOINTS.CONTENT}`
            try {
                const response = await axios.get(apiUrl);
                const data = await response.data;
                setContent(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchContent();
    }, [id]);
    return (
        <>
            <section>
                <div className='container m-auto py-6 px-6'>
                    <NavLink to='/content'>
                        <FaArrowLeft className='mr-2'></FaArrowLeft>
                        Back to listings
                    </NavLink>
                </div>
            </section>

            <section className='bg-indigo-50'>
                <div className='container m-auto py-10 px-6'>
                    <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                        <main>
                            <div className='bg-white py-6 rounded-lg shadow-md text-center md:text-left'>
                                <div className='text-gray-500 mb-4'>{content?.title ?? ''}</div>
                                <div className='text-gray-500 mb-4'>{content?.description ?? ''}</div>
                                <div className='text-gray-500 mb-4'>{content?.contentType ?? ''}</div>
                                <div className='text-gray-500 mb-4'>{content?.status ?? ''}</div>
                                <div className='text-gray-500 mb-4'>{content?.url ?? ''}</div>
                                <div className='text-gray-500 mb-4'>{content?.dateCreated ?? ''}</div>
                                <div className='text-gray-500 mb-4'>{content?.dateUpdated ?? ''}</div>
                            </div>
                        </main>

                        <aside>
                            <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                                <h3 className='text-xl font-bold mb-6'>Manage Content</h3>
                                <NavLink
                                    to={`/edit-content/${content?.id}`}
                                    className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none mt-4 block'
                                >
                                    Edit Content
                                </NavLink>
                                <NavLink
                                    onClick={() => onDeleteClick(content?.id)}
                                    className='bg-red-500 hover:bg-red-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none mt-4 block'
                                >
                                    Delete Content
                                </NavLink>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
}

ContentPage.propTypes = {
    deleteContent: PropTypes.func.isRequired,
};

export default ContentPage;