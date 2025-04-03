import express from "express"
import { addOrder, deleteOrder, getDaliyIncome, getDaliyIncomeToday, getOrder, getOrderId, getOrderStatus, getOrderUser, updateOrderStatusCancel, updateOrderStatusCompleted, updateOrderStatusPanding } from "../controller/orderController.js"

const routes = express.Router()
routes.post("/",addOrder)
routes.get("/",getOrder)
routes.get("/id/:id",getOrderId)
routes.get("/user/:user_id",getOrderUser)
routes.get("/status/:status",getOrderStatus)
routes.get("/income/",getDaliyIncomeToday)
routes.get("/income/:date",getDaliyIncome)
routes.patch("/status/completed/:id",updateOrderStatusCompleted)
routes.patch("/status/cancel/:id",updateOrderStatusCancel)
routes.patch("/status/panding/:id",updateOrderStatusPanding)
routes.delete("/:id",deleteOrder)
export default routes