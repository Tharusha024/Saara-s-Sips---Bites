import express from "express"
import { addProduct, deleteProduct, getProduct, getProductId, getProductPrice, getProductStatus, updateProductId, updateProductStatusAvailable, updateProductStatusOutOfStock } from "../controller/productController.js"

const routes = express.Router()

routes.get("/",getProduct)
routes.get("/status",getProductStatus)
routes.get("/id/:id",getProductId)
routes.get("/price",getProductPrice)
routes.post("/",addProduct)
routes.delete("/:id",deleteProduct)
routes.put("/",updateProductId)
routes.patch("/available/:id",updateProductStatusAvailable)
routes.patch("/out_of_stock/:id",updateProductStatusOutOfStock)

export default routes