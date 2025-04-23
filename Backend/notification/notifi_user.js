import db from "../config/db.js";


export const getNotifiableUsers =async() =>{
    return new Promise((resolve,reject)=>{
        const query = `SELECT email FROM users WHERE notifications_enabled = TRUE`;

        db.query(query,(error,data)=>{
            if(error) reject (error);
            else {
                const emails = data.map(row =>row.email);
                resolve(emails)
            }
        })
    })

}

export const getNotifiableAdmin =async() =>{
    return new Promise((resolve,reject)=>{
        const query = `SELECT email FROM users WHERE role ='admin' AND notifications_enabled = TRUE`;

        db.query(query,(error,data)=>{
            if(error) reject (error);
            else {
                const emails = data.map(row =>row.email);
                resolve(emails)
            }
        })
    })

}