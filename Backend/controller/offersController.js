
import db from "../config/db.js"
import { notifyNewOffers } from "../notification/mails.js";

export const addOffers = async (req, res) => {
    const { title, price, description, image_url, start_date, end_date, products } = req.body;
    
    const insertOfferQuery = `INSERT INTO offers (title, price, description, image_url, start_date, end_date) VALUES (?,?,?,?,?,?)`;
  
    try {
      const [offerResult] = await db.promise().query(insertOfferQuery, [title, price, description, image_url, start_date, end_date]);
      const insertId = offerResult.insertId;
  
      // Insert products into offer_products table
      await Promise.all(
        products.map(product => {
          const insertProductQuery = `INSERT INTO offer_products (offer_id, product_id, quantity) VALUES (?, ?, ?)`;
          return db.promise().query(insertProductQuery, [insertId, product.product_id, product.quantity]);
        })
      );
  
      // Fetch the newly inserted offer
      const [offerData] = await db.promise().query(`SELECT * FROM offers WHERE id = ?`, [insertId]);
  
      const offerInfo = { title, price, description, image_url, start_date, end_date };
      await notifyNewOffers(offerInfo);
  
      return res.status(200).json(offerData);
      
    } catch (error) {
      console.error(error);
      return res.status(500).send(error.message);
    }
  };
  
export const getOffers=(req,res)=>{
    const q = `SELECT 
    o.id AS offer_id,
    o.title,
    o.price AS offer_price,
    o.description,
    o.image_url,
    o.start_date,
    o.end_date,
    o.is_active,
    JSON_OBJECT(
        'product_names', GROUP_CONCAT(p.name SEPARATOR ', '),
        'product_quantities', GROUP_CONCAT(op.quantity SEPARATOR ', ')
    ) AS products
FROM 
    offers o
JOIN 
    offer_products op ON o.id = op.offer_id
JOIN 
    products p ON op.product_id = p.id
GROUP BY 
    o.id
ORDER BY 
    o.start_date DESC;
`
    db.query(q,(error,data)=>{
        if(error){return res.send(error)}
        if(data.length===0)return res.status(404).json({message:'not found offers'})
        return res.status(200).json(data);
    })
   
}

export const getOffersActive=(req,res)=>{
    const q = `SELECT * FROM offers WHERE is_active = TRUE`
    db.query(q,(error,data)=>{
        if(error){return res.send(error)}
        if(data.length===0)return res.status(404).json({message:'not found offers'})
        return res.status(200).json(data);
    })
   
}
export const getOffersInactive=(req,res)=>{
    const q = `SELECT * FROM offers WHERE is_active = FALSE`
    db.query(q,(error,data)=>{
        if(error){return res.send(error)}
        if(data.length===0)return res.status(404).json({message:'not found offers'})
        return res.status(200).json(data);
    })
   
}


export const getOffersId=(req,res)=>{
    const offerId = req.params.id;
    const q = `SELECT * FROM offers WHERE id=?`
    db.query(q,[offerId],(error,data)=>{
        if(error){return res.send(error)}
        if(data.length===0)return res.status(404).json({message:'not found offers'})
        return res.status(200).json(data);
    })
   
}

export const deleteOffer=(req,res)=>{
    const offerId = req.params.id;
    const q = `SELECT * FROM offers WHERE id=?`
    db.query(q,[offerId],(error,data)=>{
        if(error){return res.send(error)}
        if(data.length===0) {return res.status(404).json({message:'not found offers'})}
        const q = `DELETE FROM offers WHERE id=?`
        db.query(q,[offerId],(error,data)=>{
        if(error){return res.send(error)}
        return res.status(200).json({message:'offer delete successfully'})
        })
    })
   
}

export const updateInactive=(req,res)=>{
    const offerId = req.params.id;
    const q = `SELECT * FROM offers WHERE id=?`
    db.query(q,[offerId],(error,data)=>{
        if(error){return res.send(error)}
        if(data.length===0) {return res.status(404).json({message:'not found offers'})}
        const q = `UPDATE offers SET is_active = FALSE WHERE id = ?;`
        db.query(q,[offerId],(error,data)=>{
        if(error){return res.send(error)}
        return res.status(200).json({message:'offer has been inactive'})
        })
    })
   
}
export const updateActive=(req,res)=>{
    const offerId = req.params.id;
    const q = `SELECT * FROM offers WHERE id=?`
    db.query(q,[offerId],(error,data)=>{
        if(error){return res.send(error)}
        if(data.length===0) {return res.status(404).json({message:'not found offers'})}
        const q = `UPDATE offers SET is_active = TRUE WHERE id = ?;`
        db.query(q,[offerId],(error,data)=>{
        if(error){return res.send(error)}
        return res.status(200).json({message:'offer has been active'})
        })
    })
   
}


export const updateOffers=(req,res)=>{
    const offerId = req.params.id;
    const offerTitle = req.body.title;
    const offerPrice = req.body.price;
    const offerStartDate = req.body.start_date;
    const offerStatus =req.body.status;
    const offerEndDate = req.body.end_date;
    const q = `SELECT * FROM offers WHERE id=?`
    db.query(q,[offerId],(error,data)=>{
        if(error){return res.send(error)}
        if(data.length===0) {return res.status(404).json({message:'not found offers'})}
        const q = `UPDATE offers SET title = ?, price = ?, start_date = ?, end_date = ?, is_active = ? WHERE id = ?;`
        db.query(q,[offerTitle,offerPrice,offerStartDate,offerEndDate,offerStatus,offerId],(error,data)=>{
        if(error){return res.send(error)}
        return res.status(200).json({message:'offer has been changed successfully'})
        })
    })
   
}

