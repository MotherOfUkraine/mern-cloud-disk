const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware')

const router = new Router()

router.post(
  '/registration',
  [
    check('email', 'Incorrect email').isEmail(),
    check(
      'password',
      'Password must be longer then 3 characters and shorted then 20'
    ).isLength({ min: 3, max: 20 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(res)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Incorrect data', errors })
      }
      const { email, password } = req.body
      console.log(req.body)

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with ${email} already exists` })
      }
      const hashedPassword = await bcrypt.hash(password, 8)
      const user = new User({ email, password: hashedPassword })
      await user.save()

      return res.status(201).json({ message: 'User was created successfully' })
    } catch (e) {
      console.log(e)
      res.send({ message: 'Server error' })
    }
  }
)

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) {
      return res.status(400).json({ message: 'Invalid password' })
    }
    const token = jwt.sign({ id: user.id }, config.get('SecretKey'), {
      expiresIn: '1h',
    })

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    })
  } catch (e) {
    console.log(e)
    res.send({ message: 'Server error' })
  }
})

router.get('/auth', authMiddleware,
    async (req, res) => {
      try {
        const user = await User.findOne({_id: req.user.id})
        const token = jwt.sign({id: user.id}, config.get("SecretKey"), {expiresIn: "1h"})
        return res.json({
          token,
          user: {
            id: user.id,
            email: user.email,
            diskSpace: user.diskSpace,
            usedSpace: user.usedSpace,
            avatar: user.avatar
          }
        })
      } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
      }
    })

module.exports = router
