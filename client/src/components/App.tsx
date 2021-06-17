import React, {useEffect} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import {useDispatch} from "react-redux"

import Navbar from "./Navbar/Navbar"
import Disk from "./Disk/Disk"
import Registration from "./Authorization/Registration"
import Login from "./Authorization/Login"

import {auth} from '../redux/actions/user'
import {useTypedSelector} from "../hooks/useTypedSelector"

import './app.scss'

function App() {
    const isAuth = useTypedSelector(state => state.user.isAuth)
    const isLoader = useTypedSelector(state => state.app.isLoader)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])


    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar/>
                {
                    isLoader && <div className="center">
                        <div className="lds-dual-ring"/>
                    </div>
                }
                <div className="wrap">
                    {!isAuth ?
                    <Switch>
                        <Route path="/registration" component={Registration}/>
                        <Route path="/login" component={Login}/>
                        <Redirect to="/login" />
                    </Switch>:
                        <Switch>
                            <Route exact path="/" component={Disk}/>
                            <Redirect to="/"/>
                        </Switch>
                    }
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App