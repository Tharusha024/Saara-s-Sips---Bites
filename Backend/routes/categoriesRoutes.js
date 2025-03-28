import express from "express"
import { addCategory, deleteCategory, getCategory, getCategoryId, getProductCategory, updateCategory } from "../controller/categoriesController.js"

const routes = express.Router()
routes.post("/",addCategory)
routes.get("/",getCategory)
routes.get("/id/:id",getCategoryId)
routes.get("/product/:name",getProductCategory)
routes.put("/id/:id",updateCategory)
routes.delete("/:id",deleteCategory)


export default routes