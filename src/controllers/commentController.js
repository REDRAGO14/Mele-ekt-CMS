const {model} = require('mongoose')
const Comment = require('../Schema/CommentSchema')
const express = require('express')
const app = express()
app.use(express.json())

exports.Add_Comment = async (req, res) => {
    const blogId = req.params.id
    const commenter = req.user.id
    const {comment} = req.body
   try {
     const newComment = new Comment({
        commenter: commenter,
        blog: blogId, //forginkey
        comment: comment,
    })

    await newComment.save()
    return res.status(201).json({
        message: "comment added successfully✅"
    })
   } catch (error) {
    console.log(error)
    return res.status(500).json({
        message: "internal server error"
        
    })
   }
}