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
    CONTENT: 'http://localhost:5000/api/content',
  };

  const deleteContent = async (id) => {
    try {
      await axios.delete(`${API_ENDPOINTS.CONTENT}/${id}`);
    }
    catch (error) {
      console.log(error);
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
          element={<AddContentPage />} />
        <Route
          path='/edit-content/:id'
          element={<EditContentPage />} />
        <Route
          path='/content/:id'
          element={<ContentPage
            deleteContent={deleteContent} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;

}

export default App