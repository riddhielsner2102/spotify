import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Footer';
import Nav from './components/Nav';
const SignUp = lazy(() => import('./components/SignUp'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const Login = lazy(() => import('./components/Login'));
const AddProduct = lazy(() => import('./components/AddProduct'));
const Products = lazy(() => import('./components/Products'));
const UpdateProduct = lazy(() => import('./components/UpdateProduct'));
const CreateAlbumForm = lazy(() => import('./components/Albums/CreateAlbum'));
const AlbumListing = lazy(() => import('./components/Albums/AlbumListing'));
const UpdateAlbum = lazy(()=> import('./components/Albums/UpdateAlbum'));

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PrivateRoute />
            </Suspense>
          }
        >
          <Route path='/' element={<Products />}></Route>
          <Route path='/addproduct' element={<AddProduct />}></Route>
          <Route path='/logout' element={<h1>Logout</h1>}></Route>
          <Route path='/update/:id' element={<UpdateProduct />}></Route>
          <Route path='/createalbum' element={<CreateAlbumForm />}></Route>
          <Route path="/albumListing" element={<AlbumListing />}></Route>
          <Route path="/updatealbum/:id" element={<UpdateAlbum />}></Route>
          <Route path='/profile' element={<h1>Set Your Profile Here</h1>}></Route>
        </Route>
        <Route path='/signup' element={<Suspense fallback={<div>Loading...</div>}><SignUp /></Suspense>}></Route>
        <Route path='/login' element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
