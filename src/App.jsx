import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Articles from './components/Articles/Articles'
import ArticleDetail from './components/ArticleDetail/ArticleDetail'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </Router>
  )
}

export default App
