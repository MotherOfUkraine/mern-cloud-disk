import React, { useState } from 'react'
import './auth.scss'
import Input from '../../utils/Input/Input'
import { registration } from '../../redux/actions/user'

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="auth">
      <div className="auth__header">Регистрация</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Введите email"
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Введите пароль"
      />
      <button
        className="auth_btn"
        onClick={() => {
          registration(email, password)
        }}
      >
        Зарегистрироваться
      </button>
    </div>
  )
}

export default Registration
