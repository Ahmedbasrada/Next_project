import dbConnect from "utils/db.connect";
import Post from "models/post";



const handler = async (req,res)=>{
    
    await dbConnect()

    const {id} = req.query
    
    const question = Post.findById(id)
    .populate("user", "name")
    .populate("tag", "name slug")
    .exec


    const answer = Post.findById(id)
    .populate("user","name")
    .exec

    res.status(200).json({
        data: {
            ...question.toJSON(), answers
        }
    })

}

export default (handler)