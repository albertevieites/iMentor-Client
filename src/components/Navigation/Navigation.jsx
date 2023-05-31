import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/auth.context'

import { Navbar } from 'react-bootstrap'
import './Navigation.css'


const Navigation = () => {

    const { user } = useContext(AuthContext)

if (user)
    return (
        <Navbar className='navbar' bg="white" variant="white" >

            <h5>iMentor</h5>

            <Link to={`/chats/${user._id}`}><img className='img' src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654785964/iMentor/Vector_paufg6.png" alt=""/></Link>

        </Navbar>

    )
}

export default Navigation