import auth from "utils/auth";
import Post from "models/post";



const handler = async (req,res)=>{
    
    if(req.method !=="POST")return res.status(405).json()

    const{title, content, tags} = req.body

    const question = await Post.create({
        question: {title},
        content,
        tags
    })

    res.status(201).json({
        data: question.id
    })
}

export default auth(handler)