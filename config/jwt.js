import jwt from "jsonwebtoken";


const generateToken = (userId)=> {
  const token = jwt.sign({ id : userId } , process.env.ACCESS_TOKEN , { expiresIn : process.env.ACCESS_TOKEN_EXPIRE });
  return token;
}


export default generateToken;