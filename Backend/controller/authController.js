import {db} from "../config/db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { notifyNewUser } from "../notification/mails.js"
export const register = (req,res)=>{

    // check user existing
  const q = "SELECT * FROM users WHERE email =? OR name =?"
  db.query(q,[req.body.email,req.body.name],(error,data)=>{
    if(error) return res.json(error);
    if(data.length) return res.status(409).json("user alredy exist!");
    // hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = `INSERT INTO users (name,email,password) VALUES (?)`
    const values = [req.body.name,req.body.email,hash]

    db.query(q,[values], (error,data)=>{
        if(error) return res.json(error);
        const userName = req.body.name;
        const userEmail= req.body.email;
        const userInfo ={userName,userEmail}
        notifyNewUser(userInfo);
        return res.status(200).json("user has been created")
    })
  })
}

export const login = (req,res)=>{
    //check user name 
    const q = `SELECT * FROM users WHERE name=?;`;
    db.query(q,[req.body.name],(error,data) =>{
        if(error) return res.json(error);
        if(data.length ===0) return res.status(404).json("user not found!");
        //password check
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password");
        const token = jwt.sign({id:data[0].id},"jwt key");
        const {password, ...other} = data[0]
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json(other)
    
    })
}


export const logout = (req,res)=>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true,
    }).status(200).json("User has been logged out.")
}