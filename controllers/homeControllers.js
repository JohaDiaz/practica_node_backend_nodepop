import assert from 'node:assert'
import User from '../models/User.js'
import { query, validationResult } from 'express-validator'


export async function index(req, res, next) {
res.locals.users = await User.find()

res.locals.session = req.session

    res.render('home')
}


