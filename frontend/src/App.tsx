import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Blog from './pages/Blog';
import Blogs from './pages/Blogs';
import Publish from './pages/Publish';
import './App.css'
import Profile from './pages/Profile';
import User from './pages/User';



function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/publish/:id" element={<Publish />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog/author/:username" element={<User />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App