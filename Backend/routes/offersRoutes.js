import express from "express"
import { addOffers, deleteOffer, getOffers, getOffersActive, getOffersId, getOffersInactive, updateActive, updateInactive, updateOffers } from "../controller/offersController.js"

const routes = express.Router()
routes.post("/",addOffers)
routes.get("/",getOffers)
routes.get("/active",getOffersActive)
routes.get("/inactive",getOffersInactive)
routes.get("/:id",getOffersId)
routes.delete("/:id",deleteOffer)
routes.patch("/active/:id",updateActive)
routes.patch("/inactive/:id",updateInactive)
routes.put("/:id",updateOffers)



export default routes