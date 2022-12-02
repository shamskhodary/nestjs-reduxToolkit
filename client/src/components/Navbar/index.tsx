import { FC } from 'react'
import './index.css'

const Navbar:FC = () => (
  <header>
    <div className="title">
      <h1>Train of Thoughts</h1>
    </div>
    <ul>
      <li>Home</li>
      <li>About</li>
      <li>Signup</li>
      <li>Login</li>
    </ul>
  </header>
)

export default Navbar
