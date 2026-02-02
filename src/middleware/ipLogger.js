const ipLogger = (req, res, next) =>{
    const IP = req.ip
    console.log('ipLogger middleware working')
    res.send('hello', + IP)

    next()
}


module.exports = ipLogger