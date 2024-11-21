import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditContentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [contentType, setContentType] = useState('ARTICLE');
  const [status, setStatus] = useState('IDEA');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [dateUpdated, setDateUpdated] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      const API_ENDPOINTS = {
        CONTENT: `http://localhost:5000/api/content/${id}`,
      };
      const apiUrl = `${API_ENDPOINTS.CONTENT}`;
      try {
        const response = await axios.get(apiUrl);
        const data = await response.data;
        setTitle(data.title);
        setDescription(data.description);
        setContentType(data.contentType);
        setStatus(data.status);
        setUrl(data.url);
        setDateCreated(data.dateCreated);
        setDateUpdated(data.dateUpdated);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContent();
  }, [id,]);


  const submitUpdatedContent = async (theUpdatedContent) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/content/${id}`, theUpdatedContent);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    return;
  }

  const submitForm = (e) => {
    e.preventDefault();

    setDateUpdated(new Date());

    const updatedContent = {
      id,
      title,
      contentType,
      status,
      description,
      url,
      dateCreated,
      dateUpdated,
    };

    submitUpdatedContent(updatedContent);

    toast.success("Content Updated");

    return navigate(`/content/${id}`);
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2x1 py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Update Content
            </h2>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <input
                className="border rounded w-full py-2 px-3 mb-2"
                type="text"
                value={title}
                id="title"
                name="title"
                placeholder="Title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                className="border rounded w-full py-2 px-3 mb-2"
                rows="4"
                type="text"
                value={description}
                id="description"
                name="description"
                placeholder="Description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="url"
                className="block text-gray-700 font-bold mb-2"
              >
                URL
              </label>
              <input
                className="border rounded w-full py-2 px-3 mb-2"
                type="text"
                value={url}
                id="url"
                name="url"
                placeholder="https://example.com"
                required
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <label htmlFor="contentType">Content Type</label>
            <select
              id="contentType"
              className="border rounded w-full py-2 px-3"
              value={contentType}
              name="contentType"
              required
              onChange={(e) => setContentType(e.target.value)}
            >
              <option value="ARTICLE">ARTICLE</option>
              <option value="VIDEO">VIDEO</option>
              <option value="PODCAST">PODCAST</option>
              <option value="EVENT">EVENT</option>
            </select>
            <label htmlFor="status">Status</label>
            <select
              className="border rounded w-full py-2 px-3"
              value={status}
              id="status"
              name="status"
              required
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="IDEA">IDEA</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>

            <div className='bg-white text-3xl mt-6'>
              <button className='bg-indigo-500 rounded-md text-center w-full text-white' type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditContentPage;
