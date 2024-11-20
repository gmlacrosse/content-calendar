import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ContentsPage from './pages/ContentsPage';
import ContentPage from './pages/ContentPage';
import AddContentPage from './pages/AddContentPage';
import EditContentPage from './pages/EditContentPage';
import axios from 'axios';

const App = () => {

  const API_ENDPOINTS = {
    CONTENT: '/api/content/',
  };

  const addContent = async (addContent) => {
    try {
      const response = await axios.post(`${API_ENDPOINTS.CONTENT}`, addContent);
      console.log(response);
      router.push(`/content`);
    } catch (error) {
      console.error(error);
    }
    return;
  };

  const deleteContent = async (id) => {
    try {
      await axios.delete(`${API_ENDPOINTS.CONTENT}/${id}`);
      router.push('/content');
    }
    catch (error) {
      console.log(error);
    }
    return;
  }

  const updateContent = async (updateContent) => {
    try {
      const response = await axios.put(`${API_ENDPOINTS.CONTENT}/${updateContent.id}`, updateContent);
      console.log(response);
      router.push(`/content/${updateContent.id}`);
    } catch (error) {
      console.error(error);
    }
    return;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/content' element={<ContentsPage />} />
        <Route
          path='/add-content'
          element={<AddContentPage addContentSubmit={addContent} />} />
        <Route
          path='/edit-content/:id'
          element={<EditContentPage
            updateContentSubmit={updateContent}
            loader={async ({ params }) => {
              const { id } = params;
              const response = await fetch(`${API_ENDPOINTS.CONTENT}/${id}`);
              return response.json();
            }} />} />
        <Route
          path='/content/:id'
          element={<ContentPage
            deleteContent={deleteContent}
            loader={async ({ params }) => {
              const { id } = params;
              const response = await fetch(`${API_ENDPOINTS.CONTENT}/${id}`);
              return response.json();
            }} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;

}

export default App