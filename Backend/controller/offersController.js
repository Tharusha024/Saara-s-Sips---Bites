
import db from "../config/db.js"

export const addOffers =(req,res)=>{
    const title = req.body.title;
    const price = req.body.price;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const q = `INSERT INTO offers (title,price,start_date,end_date) VALUES (?,?,?,?)`
    db.query(q,[title,price,start_date,end_date],(error,data)=>{
        if(error){return res.send(error)}
        const insertId = data.insertId;
        const q =`SELECT * FROM offers WHERE id=?`
        db.query(q,[insertId],(error,data)=>{
        if(error){return res.send(error)}
        return res.status(200).json(data);    
        })
    })
   
}
export const getOffers=(req,res)=>{
    const q = `SELECT * FROM offers`
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


