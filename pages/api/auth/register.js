import dbConnect from "utils/db.connect";
import cookies from "utils/cookies";
import User from "models/user";


const handler =async (req, res) =>{
    if(req.method !== "POST"){
        res.status(400).json()
        return
    }

    
   try {
    await dbConnect()
    const {name, email, password} = req.body
    const user = await User.create({name, email, password})
    const result = user.signJwt()
    res.cookie("accessToken",result.token, {httpOnly: true})
    res.status(200).json()
   } catch (e) {
    console.log(e)
    res.status(400).json()
   }
}




export default cookies(handler)