import User from "models/user";
import dbConnect from "./db.connect";
import  Jwt  from "jsonwebtoken";


async function check(req, res){
    await dbConnect()
    const decoded = Jwt.verify(req.cookies?.accessToken, process.env.JWT_SECRET)

    if(decoded?.id){
        const user = await User.findById(decoded.id)
        if(user) return user
    }
    throw new Error()
}


const auth = (h) => async (req,res) =>{
    try{
        req.user = await check(req,res)
        return h(req,res)
    }catch(e){
        res.status(401).json()
    }
}


export default auth