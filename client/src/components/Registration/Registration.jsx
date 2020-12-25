import React, { useState } from 'react'
import './registration.scss'
import Input from '../../utils/Input/Input'
import { registration } from '../../redux/actions/user'
const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="registration">
      <div className="registration__header">Регистрация</div>
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
        className="registration_btn"
        onClick={() => {
          registration(email, password)
        }}
      >
        Войти
      </button>
    </div>
  )
}

export default Registration
