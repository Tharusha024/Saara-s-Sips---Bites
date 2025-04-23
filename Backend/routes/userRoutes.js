import express, { Router } from "express"
import { deleteUser, getAdmin, getuserID, getUsers, getUsersName, UpdateName } from "../controller/userController.js";

const routes = express.Router()
routes.get("/",getUsers);
routes.get("/id/:id",getuserID)
routes.get("/name/:name",getUsersName)
routes.get("/admin",getAdmin)
routes.delete("/:id",deleteUser)
routes.patch("/updateName",UpdateName)


export default routes