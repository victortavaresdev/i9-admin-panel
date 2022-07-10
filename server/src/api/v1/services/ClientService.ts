import { prisma } from "../utils";

class ClientService {
  async CreateClientService(body: any) {
    const createdClient = await prisma.client.create({
      data: body,
    });

    return createdClient;
  }
  async DeleteClientService(id: string) {
    const deletedClient = await prisma.client.delete({
      where: { id: id },
    });

    return deletedClient;
  }
  async GetAllClientsService() {
    const allClients = await prisma.client.findMany();

    return allClients;
  }
  async GetClientService(id: string) {
    const clientData = await prisma.client.findUnique({
      where: { id: id },
    });

    return clientData;
  }
  async GetUFService() {
    const ufList = await prisma.uF.findMany({
      orderBy: {
        uf: "asc",
      },
    });

    return ufList;
  }
  async SearchClientService(name: string) {
    const searchResult = await prisma.client.findMany({
      where: { full_name: name },
    });

    return searchResult;
  }
  async UpdateClientService(id: string, body: any) {
    const updatedClient = await prisma.client.update({
      where: { id: id },
      data: body,
    });

    return updatedClient;
  }
}

export { ClientService };
