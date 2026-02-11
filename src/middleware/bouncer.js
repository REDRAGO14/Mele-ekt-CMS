const jwt = require('jsonwebtoken')
require('dotenv').config({path: '../../.env'})

const JWT_SECRET  = process.env.Jwt_Sectet

const verifyToken = (req, res, next) =>  {
const token = req.header('Authorization')?.replace('Bearer ', '');
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verifyToken;

