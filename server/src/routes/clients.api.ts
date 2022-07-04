import { Router } from "express";
import { ClientController } from "../controllers/ClientController";

const clientRouter = Router();

const clientController = new ClientController();

clientRouter.get("/clients", clientController.GetAllClientsController);
clientRouter.get("/clients/uf", clientController.GetUF);
clientRouter.get("/clients/:id", clientController.GetClientController);
clientRouter.get(
  "/clients/search/:input",
  clientController.SearchClientController
);

clientRouter.post("/clients", clientController.CreateClientController);

clientRouter.put("/clients/:id", clientController.UpdateClientController);

clientRouter.delete("/clients/:id", clientController.DeleteClientController);

export { clientRouter };
