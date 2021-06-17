import React, { useState } from 'react'

import Input from '../../utils/Input/Input'

import {useDispatch} from 'react-redux'
import {login} from '../../redux/actions/user'

import './auth.scss'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const loginHandler = (email: string, password: string) => {
        dispatch(login(email, password))
    }
    return (
        <div className="auth">
      <div className="auth__header">Authorization</div>
      <Input
          value={email}
          setValue={setEmail}
          type="text"
          placeholder="Your email"
      />
      <Input
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="Password"
      />
      <button
          className="auth_btn"
          onClick={() => loginHandler(email, password) }
      >
        Log in
      </button>
    </div>
    )
}

export default Login
