const isAdmin = (req, res, next) =>{
 const role = req.user.role
 if(role === "admin"){
    next()
 }else{
    return res.status(403).json({
        message: "this page is forbidden"
    })
    next()
 }
}

module.exports = isAdmin