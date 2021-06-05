import React, {useEffect} from 'react';
import Navbar from "./Navbar/Navbar";
import './app.scss'
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Registration from "./Authorization/Registration";
import Login from "./Authorization/Login";
import {useDispatch} from "react-redux";
import {auth} from '../redux/actions/user'
import Disk from "./Disk/Disk";
import {useTypedSelector} from "../hooks/useTypedSelector";

function App() {
    const isAuth = useTypedSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])


    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar/>
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