import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/prisma";

class ClientController {
  async CreateClientController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const createdClient = await prisma.client.create({
        data: req.body,
      });

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
      const deletedClient = await prisma.client.delete({
        where: { id: id },
      });

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
      const allClients = await prisma.client.findMany();

      res.status(200).json(allClients);
    } catch (error) {
      next(error);
    }
  }
  async GetClientController(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const clientData = await prisma.client.findUnique({
        where: { id: id },
      });

      res.status(200).json(clientData);
    } catch (error) {
      next(error);
    }
  }
  async GetUF(req: Request, res: Response, next: NextFunction) {
    try {
      const ufList = await prisma.uF.findMany({
        orderBy: {
          uf: "asc",
        },
      });

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
      const { input } = req.params;
      const searchResult = await prisma.client.findMany({
        where: { full_name: input },
      });

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
      const updatedClient = await prisma.client.update({
        where: { id: id },
        data: req.body,
      });

      res.status(200).json(updatedClient);
    } catch (error) {
      next(error);
    }
  }
}

export { ClientController };
