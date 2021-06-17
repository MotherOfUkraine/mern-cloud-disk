import React, { useState } from 'react'

import Input from '../../utils/Input/Input'

import { registration } from '../../redux/actions/user'

import './auth.scss'

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

    const registrationHandler = (email: string, password: string) => {
      registration(email, password)
    }
  return (
    <div className="auth">
      <div className="auth__header">Registration</div>
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
        onClick={() => registrationHandler(email, password)}
      >
       Sign up
      </button>
    </div>
  )
}

export default Registration
