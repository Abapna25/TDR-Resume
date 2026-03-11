import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Tyler from './pages/resume/Tyler'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Tyler />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}