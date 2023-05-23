import LoginPage from 'features/auth/pages/LoginPage'
import { PrivateRoute } from 'features/components/Common'
import { AdminLayout } from 'features/components/Layout'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/admin/*" element={<AdminLayout />} />
        </Route>

        <Route>Not Found</Route>
      </Routes>
    </div>
  )
}

export default App
