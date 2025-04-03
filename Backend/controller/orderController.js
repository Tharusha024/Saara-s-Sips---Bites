import db from "../config/db.js";
export const addOrder = async (req, res) => {
    const { user_id, products } = req.body;
    let totalPrice = 0;

    if (!user_id || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "Invalid request data" });
    }

    try {
        // Ensure user exists
        const q = `SELECT id FROM users WHERE id = ?`;
        db.query(q, [user_id], (error, data) => {
            if (error) {
                return res.status(500).send(error);
            }
            if (data.length === 0) {
                return res.status(404).json({ message: "User invalid" });
            }

            const q = `INSERT INTO orders (user_id, total_price) VALUES (?, ?)`;
            db.query(q, [user_id, totalPrice], (error, data) => {
                if (error) {
                    return res.status(500).send(error);
                }

                const orderId = data.insertId;
                const productIds = products.map(p => p.product_id);

                const q = `SELECT id AS product_id, name AS product_name, price AS product_price 
                FROM products WHERE id IN (?)`;
                db.query(q, [productIds], (error, productData) => {
                    if (error) {
                        return res.status(500).send(error);
                    }
                    if (productData.length === 0) {
                        return res.status(404).json({ message: "Invalid product IDs" });
                    }

                    // Calculate total price and insert order items
                    let totalItemPrice = 0;
                    const insertPromises = products.map(item => {
                        const product = productData.find(p => p.product_id === item.product_id);
                        if (product) {
                            const itemPrice = product.product_price * item.quantity;
                            totalPrice += itemPrice;

                            const q = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`;
                            return new Promise((resolve, reject) => {
                                db.query(q, [orderId, item.product_id, item.quantity, itemPrice], (error, data) => {
                                    if (error) {
                                        return reject(error);
                                    }
                                    resolve(data.insertId);
                                });
                            });
                        }
                    });

                    // Wait for all inserts to complete
                    Promise.all(insertPromises)
                        .then(() => {
                            // Update the total price of the order
                            const q = `UPDATE orders SET total_price = ? WHERE id = ?`;
                            db.query(q, [totalPrice, orderId], (error) => {
                                if (error) {
                                    return res.status(500).send(error);
                                }
                                return res.status(200).json({ message: "Order placed successfully", orderId });
                            });
                        })
                        .catch((err) => {
                            return res.status(500).json({ error: "Error inserting order items", details: err.message });
                        });
                });
            });
        });
    } catch (error) {
        return res.status(500).json({ error: "Database query failed", details: error.message });
    }
};


export const getOrder=(req,res)=>{
    const q =`SELECT 
    o.id AS order_id, 
    o.status AS order_status, 
    o.total_price, 
    o.created_at AS order_created_at, 
    o.updated_at AS order_updated_at, 
    u.name AS user_name, 
    u.email, 
    u.id AS user_id, 
    JSON_OBJECT(
        'product_names', GROUP_CONCAT(p.name SEPARATOR ', '),
        'product_quantities', GROUP_CONCAT(t.quantity SEPARATOR ', ')
    ) AS products
FROM orders o 
JOIN users u ON u.id = o.user_id 
JOIN order_items t ON o.id = t.order_id 
JOIN products p ON t.product_id = p.id 
GROUP BY o.id, u.id;
`
    db.query(q,(error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json(data)
    })

}

export const getOrderId=(req,res)=>{
    const q =`SELECT 
    o.id AS order_id, 
    o.status AS order_status, 
    o.total_price, 
    o.created_at AS order_created_at, 
    o.updated_at AS order_updated_at, 
    u.name AS user_name, 
    u.email, 
    u.id AS user_id, 
    JSON_OBJECT(
        'product_names', GROUP_CONCAT(p.name SEPARATOR ', '),
        'product_quantities', GROUP_CONCAT(t.quantity SEPARATOR ', ')
    ) AS products   
    FROM orders o 
    JOIN users u ON u.id = o.user_id 
    JOIN order_items t ON o.id = t.order_id 
    JOIN products p ON t.product_id = p.id 
    WHERE o.id=?
    GROUP BY o.id, u.id ;`

    db.query(q,[req.params.id],(error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json(data)
    })
}

export const getOrderUser=(req,res)=>{
    const q =`SELECT 
    o.id AS order_id, 
    o.status AS order_status, 
    o.total_price, 
    o.created_at AS order_created_at, 
    o.updated_at AS order_updated_at, 
    u.name AS user_name, 
    u.email, 
    u.id AS user_id, 
    JSON_OBJECT(
        'product_names', GROUP_CONCAT(p.name SEPARATOR ', '),
        'product_quantities', GROUP_CONCAT(t.quantity SEPARATOR ', ')
    ) AS products   
    FROM orders o 
    JOIN users u ON u.id = o.user_id 
    JOIN order_items t ON o.id = t.order_id 
    JOIN products p ON t.product_id = p.id 
    WHERE u.id=?
    GROUP BY o.id, u.id ;`
    
    db.query(q,[req.params.user_id],(error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json(data)
    })
}
export const getOrderStatus=(req,res)=>{
    const q =`SELECT 
    o.id AS order_id, 
    o.status AS order_status, 
    o.total_price, 
    o.created_at AS order_created_at, 
    o.updated_at AS order_updated_at, 
    u.name AS user_name, 
    u.email, 
    u.id AS user_id, 
    JSON_OBJECT(
        'product_names', GROUP_CONCAT(p.name SEPARATOR ', '),
        'product_quantities', GROUP_CONCAT(t.quantity SEPARATOR ', ')
    ) AS products   
    FROM orders o 
    JOIN users u ON u.id = o.user_id 
    JOIN order_items t ON o.id = t.order_id 
    JOIN products p ON t.product_id = p.id 
    WHERE o.status=?
    GROUP BY o.id, u.id ;`
    
    db.query(q,[req.params.status],(error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json(data)
    })
}

export const updateOrderStatusCompleted=(req,res)=>{
    const order_id =req.params.id;
    const q=`SELECT id FROM orders WHERE id=?`
        db.query(q,[order_id],(error,data)=>{
            if(error){
                return res.status(500).send(error);  
            }
            if(data.length===0) {return  res.status(404).json({ message: "Order id is invalid" });}
            const q =`UPDATE orders SET status = 'completed',completed_at = CURRENT_TIMESTAMP WHERE id=?`
            db.query(q,[order_id],(error)=>{
                if(error){
                    return res.status(500).send(error);
                } 
                return res.status(200).json({message:"order status change into completed"})
            })
        })

}
export const updateOrderStatusCancel=(req,res)=>{
    const order_id =req.params.id;
    const q=`SELECT id FROM orders WHERE id=?`
        db.query(q,[order_id],(error,data)=>{
            if(error){
                return res.status(500).send(error);  
            }
            if(data.length===0) {return  res.status(404).json({ message: "Order id is invalid" });}
            const q =`UPDATE orders SET status = 'canceled' WHERE id=?`
            db.query(q,[order_id],(error)=>{
                if(error){
                    return res.status(500).send(error);
                } 
                return res.status(200).json({message:"order has been cancelled"})
            })
        })

}
export const updateOrderStatusPanding=(req,res)=>{
    const order_id =req.params.id;
    const q=`SELECT id FROM orders WHERE id=?`
        db.query(q,[order_id],(error,data)=>{
            if(error){
                return res.status(500).send(error);  
            }
            if(data.length===0) {return  res.status(404).json({ message: "Order id is invalid" });}
            const q =`UPDATE orders SET status = 'pending' WHERE id=?`
            db.query(q,[order_id],(error)=>{
                if(error){
                    return res.status(500).send(error);
                } 
                return res.status(200).json({message:"order has been panding"})
            })
        })

}

export const deleteOrder=(req,res)=>{
        const order_id =req.params.id;
        const q=`SELECT id FROM orders WHERE id=?`
        db.query(q,[order_id],(error,data)=>{
            if(error){
                return res.status(500).send(error);  
            }
            if(data.length===0) {return  res.status(404).json({ message: "Order id is invalid" });}
            const q =`DELETE FROM orders WHERE id=?`
            db.query(q,[order_id],(error)=>{
                if(error){
                    return res.status(500).send(error);
                } 
                return res.status(200).json({message:"order delete successfully"})
            })
        })
       
}
export const getDaliyIncomeToday=(req,res)=>{
        const q=`SELECT SUM(total_price) AS total_income`


}
export const getDaliyIncome=(req,res)=>{



}