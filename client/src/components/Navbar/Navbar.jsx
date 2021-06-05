import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { NavLink } from 'react-router-dom'

import {logout} from '../../redux/reducers/userReducer'
import {useTypedSelector} from "../../hooks/useTypedSelector"
import {getFiles, searchFile} from "../../redux/actions/file"
import {setIsLoader} from "../../redux/reducers/appReducer"

import Logo from '../../assets/img/Logo.png'

import './navbar.scss'

const Navbar = () => {
    const isAuth = useTypedSelector(state => state.user.isAuth)
    const currentDir = useTypedSelector(state => state.files.currentDir)
    const [search, setSearch] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)

    const dispatch = useDispatch()

    const searchHandler = (e) => {
        setSearch(e.target.value)
        !searchTimeout && clearTimeout(searchTimeout)
        dispatch(setIsLoader(true))
        e.target.value!== '' ? setTimeout((value) => {
            dispatch(searchFile(value))
        }, 300, e.target.value):
            dispatch(getFiles(currentDir))
    }
    console.log(search)
    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="Logo" className="navbar__logo"/>
                <div className="navbar__header"> Cloud</div>
                {!isAuth && <div className="navbar__login">
                    <NavLink to="/login">Войти</NavLink>
                </div>}
                {!isAuth && <div className="navbar__registration">
                    <NavLink to="/registration">Регистрация</NavLink>
                </div>}
                {isAuth && <input
                    value={search}
                    onChange={(e) => searchHandler(e)}
                    className='navbar__search'
                    type="text"
                    placeholder="Название файла..."/>}
                {isAuth &&
                <div className="navbar__login" onClick={() => dispatch(logout())}>Выход</div>}
            </div>
        </div>
    )
}
export default Navbar
