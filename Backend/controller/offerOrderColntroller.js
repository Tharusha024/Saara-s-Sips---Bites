export const getOffersOrders=(req,res)=>{
    const q = `SELECT * FROM offer_orders`
    db.query(q,(error,data)=>{
        if(error){return res.send(error)}
        if(data.length===0)return res.status(404).json({message:'not found offers Orders'})
        return res.status(200).json(data);
    })
   
}
export const getOffersOrdersId=(req,res)=>{
    offerOrderId=req.param.id;
    const q = `SELECT * FROM offer_orders WHERE id =?`
    db.query(q,[userId],(error,data)=>{
        if(error){return res.send(error)}
        if(data.length===0)return res.status(404).json({message:'not found offers Orders'})
        return res.status(200).json(data);
    })
   
}

export const getOffersOrdersUserId=(req,res)=>{
    userId=req.param.user_id;
    const q = `SELECT * FROM offer_orders WHERE user_id =?`
    db.query(q,[userId],(error,data)=>{
        if(error){return res.send(error)}
        if(data.length===0)return res.status(404).json({message:'not found offers Orders'})
        return res.status(200).json(data);
    })
   
}

export const getOffersOrdersOfferId=(req,res)=>{
    offerId=req.param.offer_id;
    const q = `SELECT * FROM offer_orders WHERE  offer_id=?`
    db.query(q,[offerId],(error,data)=>{
        if(error){return res.send(error)}
        if(data.length===0)return res.status(404).json({message:'not found offers Orders'})
        return res.status(200).json(data);
    })
   
}

export const addOffersOrder=(req,res)=>{
   
   
}