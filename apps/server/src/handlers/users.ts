import { Router } from 'express'

import { modelUser } from '@/models/user'

const router = Router()
const db = modelUser

router.get('', async(req, res) => {})
router.post('', async (req, res) => {})

export const usersRouter = router
