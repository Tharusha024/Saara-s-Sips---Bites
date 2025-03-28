import db from "../config/db.js"

export const addCategory =(req,res)=>{
    const {name} =req.body
        const q = `INSERT IGNORE INTO categories (name) VALUES (?)`
        db.query(q,[name],(error,data)=>{
            if(error){
                return res.send(error);
            }
            const q = `SELECT * FROM categories WHERE id=?`
            db.query(q,[data.insertId],(error,data)=>{
                if(error){
                    return res.send(error);
                }
                if (data.length === 0) return res.status(404).json({ message: "Category already exists!" });
                return res.status(200).json(data)
            })
        })

}

export const getCategory =(req,res)=>{
    const q =`SELECT * FROM categories`
    db.query(q,(error,data)=>{
        if(error){
            return res.send(error);
        }
        return res.status(200).json(data)
    })


}
export const getCategoryId =(req,res)=>{
    const cotegoryId = req.params.id;
    const q=`SELECT * FROM categories WHERE id=?`
    db.query(q,[cotegoryId],(error,data)=>{
        if(error){
            return res.send(error);
        }
        if (data.length === 0) return res.status(404).json({ message: "Invalid category id!" });
        return res.status(200).json(data[0])
    })


}
export const getProductCategory =(req,res)=>{
    const category_name = req.params.name;
    const q =`SELECT p.id,p.name,p.price,p.image_url,p.description,p.status,c.name AS category_name FROM products p JOIN categories c ON p.category_id=c.id WHERE c.name=?`
    db.query(q,[category_name],(error,data)=>{
        if(error){
            return res.send(error);
        }
        if (data.length === 0) return res.status(404).json({ message: "Not Found Product" });
        return res.status(200).json(data)
    })
}

export const updateCategory =(req,res)=>{
    const category_id =req.params.id;
   const q = `UPDATE categories SET name = ?, updated_at = NOW() WHERE id = ?`
   const values =[req.body.name,category_id]
   db.query(q,values,(error,data)=>{
    if(error){
        return res.send(error);
    }
    const q =`SELECT * FROM categories WHERE id=?`
    db.query(q,[category_id],(error,data)=>{
        if(error){
        return res.send(error);}
        return res.status(200).json(data)
    })
   })


}

export const deleteCategory =(req,res)=>{
    const cotegoryId=req.params.id;
    const q =`DELETE FROM categories WHERE id=?`
    db.query(q,[cotegoryId],(error,data)=>{
        if(error){
            return res.send(error);
        }
        if (data.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found or already deleted" });
        }
        return res.status(200).json({message:"categories has been deleted"})
    })
}

