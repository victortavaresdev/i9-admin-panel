import { NextFunction, Request, Response } from "express";
import { ClientService } from "../services";

const clientService = new ClientService();

class ClientController {
  async CreateClientController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const createdClient = await clientService.CreateClientService(body);

      res.status(200).json(createdClient);
    } catch (error) {
      next(error);
    }
  }
  async DeleteClientController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const deletedClient = await clientService.DeleteClientService(id);

      res.status(204).json(deletedClient);
    } catch (error) {
      next(error);
    }
  }
  async GetAllClientsController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const allClients = await clientService.GetAllClientsService();

      res.status(200).json(allClients);
    } catch (error) {
      next(error);
    }
  }
  async GetClientController(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const clientData = await clientService.GetClientService(id);

      res.status(200).json(clientData);
    } catch (error) {
      next(error);
    }
  }
  async GetUFController(req: Request, res: Response, next: NextFunction) {
    try {
      const ufList = await clientService.GetUFService();

      res.status(200).json(ufList);
    } catch (error) {
      next(error);
    }
  }
  async SearchClientController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name } = req.params;
      const searchResult = await clientService.SearchClientService(name);

      res.status(200).json(searchResult);
    } catch (error) {
      next(error);
    }
  }
  async UpdateClientController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedClient = await clientService.UpdateClientService(id, body);

      res.status(200).json(updatedClient);
    } catch (error) {
      next(error);
    }
  }
}

export { ClientController };
