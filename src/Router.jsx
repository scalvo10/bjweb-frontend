import {
    createBrowserRouter,
    RouterProvider,
    redirect
  } from 'react-router-dom';
  import Layout from './pages/Layout';
  import AboutUs from './pages/AboutUs/AboutUs';
  import LandingPage from './pages/LandingPage/LandingPage';
  import Log_in from './pages/Forms/Log_in';
  import Register from './pages/Forms/Register';
  import Principal from './pages/Principal/Principal'
  import Reglas from './pages/Reglas/reglas'
  import Table from './pages/Table/table'
  import Log_out from './pages/Forms/Logout'
  
  function Router() {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <LandingPage />
          },
          {
            path: 'about-us',
            element: <AboutUs />
          },
          {
            path: 'log-in',
            element: <Log_in />
          },
          {
            path: 'register',
            element: <Register />
          },
          {
            path: 'log-out',
            element: <Log_out />
          },
          {
            path: 'principal',
            element: <Principal />
          },
          {
            path: 'reglas',
            element: <Reglas />
          },
          {
            path: 'table/:id/:seat',
            element: <Table />
          }
        ]
      },
      {
        path: '*', 
        loader: () => {
          return redirect('/')
        }
      }
    ])
  
    return (
      <RouterProvider router={router} />
    );
  }
  
  export default Router;