import { Router } from "express";
import { ClientController } from "../controllers/ClientController";

const clientRouter = Router();

const clientController = new ClientController();

clientRouter.get("/", clientController.GetAllClientsController);
clientRouter.get("/uf", clientController.GetUF);
clientRouter.get("/:id", clientController.GetClientController);
clientRouter.get("/search/:input", clientController.SearchClientController);

clientRouter.post("/", clientController.CreateClientController);

clientRouter.put("/:id", clientController.UpdateClientController);

clientRouter.delete("/:id", clientController.DeleteClientController);

export { clientRouter };
