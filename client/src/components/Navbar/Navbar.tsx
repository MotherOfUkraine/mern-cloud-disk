import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { NavLink } from 'react-router-dom'

import {logout} from '../../redux/reducers/userReducer'
import {useTypedSelector} from "../../hooks/useTypedSelector"
import {getFiles, searchFile} from "../../redux/actions/file"
import {setIsLoader} from "../../redux/reducers/appReducer"
import {sizeFormat} from "../../utils/sizeFormat"

import './navbar.scss'

const Navbar = () => {
    const isAuth = useTypedSelector(state => state.user.isAuth)
    const {usedSpace, diskSpace} = useTypedSelector(state => state.user.currentUser)
    const {dirId} = useTypedSelector(state => state.files.currentDir)
    const [search, setSearch] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(0)

    const dispatch = useDispatch()

    const searchHandler = (e: any) => {
        setSearch(e.target.value)
        !searchTimeout && clearTimeout(searchTimeout)
        dispatch(setIsLoader(true))
        e.target.value !== '' ? setSearchTimeout(setTimeout((value: string) => {
                dispatch(searchFile(value))
            }, 300, e.target.value)) :
            dispatch(getFiles(dirId, 'name'))
    }
    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar__logo"> Cloud</div>
                {!isAuth && <div className="navbar__right">
                    <div className="navbar__login">
                        <NavLink to="/login">Log in</NavLink>
                    </div>
                    <div className="navbar__registration">
                        <NavLink to="/registration">Sign up</NavLink>
                    </div>
                </div>
                }
                {isAuth && <> <input
                    value={search}
                    onChange={(e) => searchHandler(e)}
                    className='navbar__search'
                    type="text"
                    placeholder="Item name"/>
                    <div className="navbar__right">
                        <div className="navbar__disk-space">
                            {sizeFormat(usedSpace)}/{sizeFormat(diskSpace)}
                        </div>
                        <div className="navbar__login" onClick={() => dispatch(logout())}>Log out
                        </div>
                    </div>
                </>
                }
            </div>
        </div>
    )
}
export default Navbar
