import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Articles from './components/Articles/Articles'
import ArticleDetail from './components/ArticleDetail/ArticleDetail'
import Podcasts from './components/Podcasts/Podcasts'
import Videos from './components/Videos/Videos'
import Organizations from './components/Organizations/Organizations'
import Navbar from './components/Navbar/Navbar'
import ReadingList from './components/ReadingList/ReadingList'
import UserProfile from './components/UserProfile/UserProfile'
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/reading-list" element={<ReadingList />} />
        <Route path="/user/:username" element={<UserProfile />} />
      </Routes>
    </Router>
  )
}

export default App
