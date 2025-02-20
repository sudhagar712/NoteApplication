const express = require('express')
const Note = require('../models/notes')
const middleWare = require('../middleware/middleware')
const router = express.Router()

router.post('/add', middleWare, async(req,res)=>{
    try {
        const {title , description } = req.body
        const newNote = new Note({
            title,
            description,
            userId: req.user.id
        })

        await newNote.save()
         
        res.status(200).json({message:"Note Created Successfully" })

    } catch (error) {
        res.status(400).json({message:"Error in adding  Notes" })

    }
    

})


// get ALL Notes
router.get('/', async(req,res)=> {
    try{
    const notes = await Note.find()
    return res.status(200).json({Success:'true', notes})

    }catch(error){
 return res.status(500).json({Success:'false', message: 'no Notes Found'})
    }
})


// Update Notes 

router.put('/:id', async(req,res)=> {
    try{

        const {id} = req.params;
        const updateNotes = await Note.findByIdAndUpdate(id, req.body)
        return res.status(200).json({success: true, message: "updated Success" , updateNotes })


    }
    catch(error){
return res.status(500).json({success: false, message: "update Failed" })

    }

} )



// delete Notes


router.delete('/:id', async(req,res)=> {
    try{

        const {id} = req.params;
        const DeleteNotes = await Note.findByIdAndDelete(id, req.body)
        return res.status(200).json({success: true, message: "Delete successfully" , DeleteNotes })


    }
    catch(error){
return res.status(500).json({success: false, message: "Delete Failed" })

    }

} )









module.exports = router



