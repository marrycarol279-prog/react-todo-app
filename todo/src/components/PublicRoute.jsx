import { Navigate } from 'react-router-dom'

function PublicRoute({ children }) {
  const token = localStorage.getItem("Token")
  return token ? <Navigate to="/" /> : children
}

export default PublicRoute