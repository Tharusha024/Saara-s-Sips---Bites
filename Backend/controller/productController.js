import {db} from '../config/db.js'
import { notifyNewProduct } from '../notification/mails.js';

export const addProduct =(req,res)=>{
    const categoryName=req.body.category_name;
    const categoryQuery =`SELECT id FROM categories WHERE name=?`;
    db.query(categoryQuery,[categoryName],(error,data)=>{
        if(error){
            return res.send(error)
        }
        if (data.length === 0) return res.status(404).json({ message: "Category not found" });
        const category_id = data[0].id;
 

    const q=`INSERT INTO products (name,category_id,price,image_url,description) VALUES (?,?,?,?,?)`;
    const name=req.body.name;
    const price=req.body.price;
    const image_url=req.body.image_url;
    const description=req.body.description;
    const values =[name,category_id,price,image_url,description]
    db.query(q,values,(error,data)=>{
        if(error){
            return res.send(error)
        }
        const product = {name,price,image_url,description}
        notifyNewProduct(product);
        const q = `SELECT * FROM products WHERE id=?`
        db.query(q,[data.insertId],(error,data)=>{
            if(error){
                return res.send(error);
            }
            return res.status(200).json(data)
    })
})
}
    )}


export const getProduct =(req,res)=>{
 const q =`SELECT * FROM products`

 db.query(q,(error,data)=>{
    if(error){
        return res.send(error)
    }
    return res.status(200).json(data)
 })
}

export const getProductId =(req,res)=>{
    const q =`SELECT * FROM products WHERE id=?`
    db.query(q,[req.params.id],(error,data)=>{
        if (error) return res.status(500).json({ error: error.message });
        if (data.length === 0) return res.status(404).json({ message: "Product not found" });
        return res.status(200).json(data[0]);
    })
 
}

export const getProductStatus =(req,res)=>{
    const q = `SELECT * FROM products WHERE status = ?`
    const value = ['Available']

    db.query(q,value,(error,data)=>{
        if(error){
            return res.send(error)
        }
        return res.status(200).json(data)
    })
}

export const deleteProduct =(req,res)=>{
    const q=`DELETE FROM products WHERE id=?`
    db.query(q,[req.params.id],(error,data)=>{
        if(error){
            return res.send(error)
        }
        if (data.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found or already deleted" });
        }
        return res.status(200).json({message:'product delete successfull'})
    })
 
}

export const updateProductId =(req,res)=>{
    const productId = req.body.id;
    const q =`UPDATE products 
            SET name = ?, category_id = ?, price = ?, image_url = ?, description = ?, updated_at = NOW()
            WHERE id = ?;`;
    const values = [req.body.name,req.body.category_id,req.body.price,req.body.image_url,req.body.description,productId];

    db.query(q,values,(error,data)=>{
        if(error){
            return res.send(error)
        }
        if (data.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        const q=`SELECT * FROM products WHERE id=?`
        db.query(q,[productId],(error,data)=>{
            if(error){
                return res.send(error)
            }
            return res.status(200).json({message:'product is updated',data})
        })
        

    })
        
 
}

export const updateProductStatusAvailable =(req,res)=>{
    const productId = req.params.id;
 const q = `UPDATE products SET status = 'Available' WHERE id=?`
  db.query(q,[productId],(error,data)=>{
    if(error){
        return res.send(error)
    }
    if (data.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
    }
    const q=`SELECT * FROM products WHERE id=?`
    db.query(q,[productId],(error,data)=>{
        if(error){
            return res.send(error)
        }
        return res.status(200).json({message:'product status is changed successfull',data})
    })
    
  })
}

export const updateProductStatusOutOfStock =(req,res)=>{
    const productId = req.params.id;
    const q = `UPDATE products SET status = 'Out of Stock' WHERE id=?`
    db.query(q,[productId],(error,data)=>{
        if(error){
            return res.send(error)
        }
        if (data.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        const q=`SELECT * FROM products WHERE id=?`
        db.query(q,[productId],(error,data)=>{
            if(error){
                return res.send(error)
            }
            return res.status(200).json({message:'product status is changed successfull',data})
        })
        
      })
   }

  export const getProductPrice = (req, res) => {
    let {min,max} =req.query;
    const q = `SELECT * FROM products WHERE price BETWEEN ? AND ?;`;
    db.query(q,[min,max],(error, data) => {
        if (error) return res.status(500).json({ error: error.message });
        if (data.length === 0) return res.status(404).json({ message: "Product not found" });
        return res.status(200).json(data);
    });
};