import db from "../config/db.js"


export const getUsers=(req,res) =>{
   const q = `SELECT * FROM users WHERE role='user'`
   db.query(q,(error,data)=>{
    if(error){
        return res.send(error)
    }
    if(data.length===0) return res.status(404).json({ message: "Users not found" })
    return res.status(200).json(data);
   })
}
export const getAdmin=(req,res) =>{
    const q = `SELECT * FROM users WHERE role='admin'`
    db.query(q,(error,data)=>{
     if(error){
         return res.send(error)
     }
     if(data.length===0) return res.status(404).json({ message: "Users not found" })
     return res.status(200).json(data);
    })
 }

 export const getuserID=(req,res) =>{
    const userId = req.params.id;
    const q = `SELECT * FROM users WHERE id=?`
    db.query(q,[userId],(error,data)=>{
     if(error){
         return res.send(error)
     }
     if(data.length===0) return res.status(404).json({ message: "Users not found" })
     return res.status(200).json(data);
    })
 }

 export const getUsersName=(req,res) =>{
    const userName = req.params.name;
    const q = `SELECT * FROM users WHERE name=?`
    db.query(q,[userName],(error,data)=>{
     if(error){
         return res.send(error)
     }
     if(data.length===0) return res.status(404).json({ message: "Users not found" })
     return res.status(200).json(data);
    })
 }

 export const deleteUser=(req,res) =>{
    const userName = req.params.id;
    const q = `DELETE FROM users WHERE id=?`
    db.query(q,[userName],(error,data)=>{
     if(error){
         return res.send(error)
     }

     return res.status(200).json({message:"Delete user successfully"});
    })
 }
 export const UpdateName=(req,res) =>{
    const userName = req.body.name;
    const userNewName = req.body.newname;
    const q = `SELECT id FROM users WHERE name=?`
    db.query(q,[userName],(error,data)=>{
        if(error){
            return res.send(error) 
        }
        if(data.length===0){
            return res.status(404).json({ message: "User name not found" })
        }
        const userId = data[0].id;
        const q =`UPDATE users SET name = ? WHERE id = ? AND NOT EXISTS (SELECT * FROM (SELECT 1 FROM users WHERE name = ? AND id != ?) AS temp)`;
        db.query(q,[userNewName,userId,userNewName,userId],(error)=>{
            if(error){return res.send(error)}
            return res.status(200).json({message:"user name update successfully"})
        })
    })
 }