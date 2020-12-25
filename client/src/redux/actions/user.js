import axios from 'axios'

export const registration = async (email, password) => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth/registration',
      {
        email,
        password,
      }
    )
    alert(res.data.message)
  } catch (e) {
    alert(e.res.data.message)
  }
}
