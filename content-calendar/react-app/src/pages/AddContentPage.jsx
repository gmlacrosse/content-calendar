import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddContentPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [contentType, setContentType] = useState('ARTICLE');
  const [status, setStatus] = useState('IDEA');
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const submitAddContent = async (theContent) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/content`,
        theContent
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    return;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const addContent = {
      title,
      contentType,
      status,
      description,
      url,
    };

    submitAddContent(addContent);

    toast.success("Content Added");

    return navigate(`/content`);
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2x1 py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Add Content
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
              onChange={(e) => setContentType(e.target.value)}
              required
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
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="IDEA">IDEA</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>

            <div className="bg-white text-3xl mt-6">
              <button
                className="bg-indigo-700 rounded-md text-center w-full text-white"
                type="submit"
              >
                Add Content
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddContentPage;