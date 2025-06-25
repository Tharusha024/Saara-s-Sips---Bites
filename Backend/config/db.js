import mysql from 'mysql2';
import dotenv from 'dotenv'

dotenv.config();
export const db =mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306
})

db.connect((error)=>{
    if(error){
        console.log("datacbase connecting faild");
        console.log(error);
        return;
    }
    console.log("databae connected");

    db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,(error) =>{
        if(error){
            console.log("faild create database");
            console.log(error);
            return;
        }
        console.log("successfully creating database");
        db.changeUser({database:process.env.DB_NAME},(error)=>{
            if(error){
                console.log("error selecting database",error);
                return;
            }

            createUserTable();
    });
   
    });
    
});

function createUserTable(){
    const SQL = `CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        notifications_enabled BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;
    db.query(SQL,(error) =>{
        if(error){
            console.log('failed create user table',error);
            return;
        }
        console.log('successfull create user table');
        createCategories();
        
    });
};
function createCategories(){
    const sql =`CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;

db.query(sql,(error)=>{
    if(error){
        console.log('failed create categories table',error);
        return;
    }
    console.log('successfull create categories table'); 
    createProductTable();
})
};

function createProductTable(){
    const sql =`CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category_id INT,  -- Changed from category VARCHAR to category_id INT
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    description TEXT,
    status VARCHAR(20) DEFAULT 'Available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    );`;
    db.query(sql,(error) =>{
        if(error){
            console.log('failed create product table',error);
            return;
        }
        console.log('successfull create product table');
        createOrderTable();

    });
};

function createOrderTable(){
    const sql =`CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        status ENUM('pending', 'completed', 'canceled') DEFAULT 'pending',
        total_price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        completed_at TIMESTAMP NULL DEFAULT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`;
    db.query(sql,(error)=>{
        if(error){
            console.log('failed create order table',error);
            return;
        }
        console.log('successfull create order table');
        createOrderItemsTable();
    });
};
function createOrderItemsTable(){
    const sql =` CREATE TABLE IF NOT EXISTS order_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );`;
    db.query(sql,(error)=>{
        if(error){
            console.log('failed create order items table',error);
            return;
        }
        console.log('successfull create order items table');
        createOffersTable()
    });
};
function createOffersTable(){
    const sql =`CREATE TABLE IF NOT EXISTS offers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    start_date DATE,
    end_date DATE
    );`;
    db.query(sql,(error)=>{
        if(error){
            console.log('failed create offers table',error);
            return;
        }
        console.log('successfull create offers table');
        createOfferProductsTable()
    });
};
function createOfferProductsTable(){
    const sql =`CREATE TABLE IF NOT EXISTS offer_products (
                id INT PRIMARY KEY AUTO_INCREMENT,
                offer_id INT,
                product_id INT,
                quantity INT DEFAULT 1,
                FOREIGN KEY (offer_id) REFERENCES offers(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
                );`;
    db.query(sql,(error)=>{
        if(error){
            console.log('failed create offer products table',error);
            return;
        }
        console.log('successfull create offer products table');
        createOffersOrdersTable()
    });
};
function createOffersOrdersTable(){
    const sql =`CREATE TABLE IF NOT EXISTS offer_orders (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                offer_id INT NOT NULL,
                offer_price DECIMAL(10, 2) NOT NULL,
                status ENUM('pending', 'completed', 'canceled') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (offer_id) REFERENCES offers(id) ON DELETE CASCADE
        );`;
    db.query(sql,(error)=>{
        if(error){
            console.log('failed create offer orders table',error);
            return;
        }
        console.log('successfull create offers orders table');
        
    });
};

export default db;



    