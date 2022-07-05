AdminPanelContent = {
  template: `
          <main class="admin-panel-content">

            <div class="modal-create-client" v-show="modal.create_client">
              <div class="modal-create-client-box">
                <header class="modal-create-client-header">
                  <h2>Criar Cliente</h2>
                  <span @click="toggleModalCreateClient">X</span>
                </header>
                <main class="modal-create-client-main">
                  <form @submit.prevent="createClient(); toggleModalCreateClient();">
                    <h2>Dados de identificação</h2>
                    <div class="create-client-grid">
                      <input type="text" v-model="client_data.full_name" aria-label="Nome Completo" placeholder="Nome Completo" required />
                      <input type="text" v-model="client_data.profession" aria-label="Profissão" placeholder="Profissão" required />
                      <input type="text" v-model="client_data.marital_status" aria-label="Estado Civil" placeholder="Estado Civil" required />
                      <input type="number" v-model="client_data.cpf" aria-label="CPF" placeholder="CPF" required />
                      <input type="number" v-model="client_data.phone" aria-label="Telefone" placeholder="Telefone" required />
                    </div>

                    <h2>Endereço</h2> 
                    <div class="create-client-grid">
                      <input type="number" v-model="client_data.cep" aria-label="CEP" placeholder="CEP" required />
                      <select name="uf" v-model="client_data.uf" required>
                        <option value="" disabled> Escolha um Estado </option>
                        <option v-for="uf in uf_list" :value="uf.uf" :key="uf.id"> {{uf.uf}} </option>
                      </select>
                      <input type="text" v-model="client_data.city" aria-label="Cidade" placeholder="Cidade" required />
                      <input type="text" v-model="client_data.neighborhood" aria-label="Bairro" placeholder="Bairro" required />
                      <input type="text" v-model="client_data.street" aria-label="Rua" placeholder="Rua" required />
                      <input type="text" v-model="client_data.number" aria-label="Número" placeholder="Número" required />
                    </div>

                    <button>Salvar</button>
                  </form>
                </main>
              </div>
            </div>

            <div class="modal-edit-client" v-show="modal.edit_client">
              <div class="modal-edit-client-box">
                <header class="modal-edit-client-header">
                  <h2>Editar Cliente</h2>
                  <span @click="toggleModalEditClient">X</span>
                </header>
                <main class="modal-edit-client-main">
                  <form @submit.prevent="editClient(); toggleModalEditClient();">
                    <h2>Dados de identificação</h2>
                    <div class="edit-client-grid">
                      <input type="text" v-model="client_data.full_name" aria-label="Nome Completo" placeholder="Nome Completo" />
                      <input type="text" v-model="client_data.profession" aria-label="Profissão" placeholder="Profissão" />
                      <input type="text" v-model="client_data.marital_status" aria-label="Estado Civil" placeholder="Estado Civil" />
                      <input type="number" v-model="client_data.cpf" aria-label="CPF" placeholder="CPF" />
                      <input type="number" v-model="client_data.phone" aria-label="Telefone" placeholder="Telefone" />
                    </div>

                    <h2>Endereço</h2> 
                    <div class="edit-client-grid">
                      <input type="number" v-model="client_data.cep" aria-label="CEP" placeholder="CEP" />
                      <select name="uf" v-model="client_data.uf">
                        <option value="" disabled> Escolha um Estado </option>
                        <option v-for="uf in uf_list" :value="uf.uf" :key="uf.id"> {{uf.uf}} </option>
                      </select>
                      <input type="text" v-model="client_data.city" aria-label="Cidade" placeholder="Cidade" />
                      <input type="text" v-model="client_data.neighborhood" aria-label="Bairro" placeholder="Bairro" />
                      <input type="text" v-model="client_data.street" aria-label="Rua" placeholder="Rua" />
                      <input type="text" v-model="client_data.number" aria-label="Número" placeholder="Número" />
                    </div>

                    <button>Salvar</button>
                  </form>
                </main>
              </div>
            </div>

            <div class="modal-delete-client" v-show="modal.delete_client">
              <div class="modal-delete-client-box">
                <h2>Você deseja excluir esse cliente?</h2>
                <div class="modal-delete-client-btns">
                  <button @click="deleteClient(); toggleModalDeleteClient();">deletar !</button>
                  <button @click="toggleModalDeleteClient">cancelar</button>
                </div>
              </div>
            </div>

            <div class="admin-panel-content-tabs">
              <a href="#" class="workspace-tab">Área de Trabalho</a>
              <a href="#" class="workspace-tab">Cliente</a>
            </div>

            <div class="admin-panel-content-searchBar">
              <select class="searchBar-select" name="">
                <option value="name">Nome</option>
              </select>
              <input class="searchBar-input" type="text" aria-label="Digite sua busca" placeholder="Digite sua busca" v-model="search_value" />
              <div class="searchBar-btn-group"> 
                <button v-if="search_data.length" @click="clearSearchInput">
                  <img src="../../assets/icons/close.svg" alt="Close Icon" />   
                </button>
                <button v-else @click="searchClient">
                  <img src="../../assets/icons/search.svg" alt="Search Icon" />                
                 </button>
              </div>
              <button class="searchBar-add-client" @click="toggleModalCreateClient(); clearFormInput();"> 
                <img src="../../assets/icons/add.svg" alt="Add Icon" />  
              </button>
            </div>

            <div class="list-items">
              <div v-if="search_data.length">
                <div class="search-item" v-for="search in search_data" :key="search.id">
                  <div>
                    <p>Nome: <span> {{search.full_name}} </span> </p>
                  </div>
                  <div>
                    <p>CPF: <span> {{search.cpf}} </span> </p>
                  </div>
                  <button @click="toggleModalEditClient(); clientID(search.id); getClientInfo();">
                    <img src="../../assets/icons/edit.svg" alt="Edit Icon" />  
                  </button>
                  <button @click="toggleModalDeleteClient(); clientID(search.id);">
                    <img src="../../assets/icons/trash.svg" alt="Trash Icon" />  
                  </button>
                </div>
              </div>

              <div v-else-if="clients_list.length === 0" class="no-client-registered">
                <p>Nenhum cliente cadastrado!</p>
              </div>

              <div v-else>
                <div class="search-item" v-for="client in clients_list" :key="client.id">
                  <div>
                    <p>Nome: <span> {{client.full_name}} </span> </p>
                  </div>
                  <div>
                    <p>CPF: <span> {{client.cpf}} </span> </p>
                  </div>
                  <button @click="toggleModalEditClient(); clientID(client.id); getClientInfo();">
                    <img src="../../assets/icons/edit.svg" alt="Edit Icon" />  
                  </button>
                  <button @click="toggleModalDeleteClient(); clientID(client.id);">
                    <img src="../../assets/icons/trash.svg" alt="Trash Icon" />  
                  </button>
                </div>
              </div>
            </div>

          </main>
      
          `,
  data() {
    return {
      clients_list: [],
      client_id: null,
      client_data: {
        full_name: "",
        profession: "",
        marital_status: "",
        cpf: "",
        phone: "",
        cep: "",
        uf: "",
        city: "",
        neighborhood: "",
        street: "",
        number: "",
      },
      uf_list: [],
      search_value: "",
      search_data: [],
      modal: {
        create_client: false,
        edit_client: false,
        delete_client: false,
      },
    };
  },
  methods: {
    async getAllClients() {
      try {
        const GET_CLIENTS_URL = `${app.$data.BASE_URL}/api/clients`;
        const response = await axios.get(GET_CLIENTS_URL);
        this.clients_list = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getUF() {
      try {
        const GET_UF_LIST_URL = `${app.$data.BASE_URL}/api/clients/uf`;

        const response = await axios.get(GET_UF_LIST_URL);
        this.uf_list = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createClient() {
      try {
        const POST_CLIENT_URL = `${app.$data.BASE_URL}/api/clients`;
        const client = this.client_data;

        await axios.post(POST_CLIENT_URL, client);

        this.clearFormInput();
        this.getAllClients();
      } catch (error) {
        console.log(error);
      }
    },
    async editClient() {
      try {
        const id = this.client_id;
        const UPDATE_CLIENT_URL = `${app.$data.BASE_URL}/api/clients/${id}`;
        const client_data = this.client_data;

        await axios.put(UPDATE_CLIENT_URL, client_data);

        this.clearFormInput();
        this.clearSearchInput();
        this.getAllClients();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteClient() {
      try {
        const id = this.client_id;
        const DELETE_CLIENT_URL = `${app.$data.BASE_URL}/api/clients/${id}`;

        await axios.delete(DELETE_CLIENT_URL);

        this.clearSearchInput();
        this.getAllClients();
      } catch (error) {
        console.log(error);
      }
    },
    async getClientInfo() {
      try {
        const id = this.client_id;
        const GET_CLIENT_URL = `${app.$data.BASE_URL}/api/clients/${id}`;

        const response = await axios.get(GET_CLIENT_URL);
        const client_data = response.data;

        const client = this.client_data;

        client.full_name = client_data.full_name;
        client.profession = client_data.profession;
        client.marital_status = client_data.marital_status;
        client.cpf = client_data.cpf;
        client.phone = client_data.phone;
        client.cep = client_data.cep;
        client.uf = client_data.uf;
        client.city = client_data.city;
        client.neighborhood = client_data.neighborhood;
        client.street = client_data.street;
        client.number = client_data.number;
      } catch (error) {
        console.log(error);
      }
    },
    async searchClient() {
      try {
        const search_value = this.search_value;
        const formattedValue = search_value.trim();

        if (formattedValue !== "") {
          const SEARCH_CLIENT_API = `${app.$data.BASE_URL}/api/clients/search/${formattedValue}`;

          const response = await axios.get(SEARCH_CLIENT_API);
          this.search_data = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    clientID(id) {
      this.client_id = id;
    },
    clearSearchInput() {
      this.search_data = [];
      this.search_value = "";
    },
    clearFormInput() {
      this.client_data.full_name = "";
      this.client_data.profession = "";
      this.client_data.marital_status = "";
      this.client_data.cpf = "";
      this.client_data.phone = "";
      this.client_data.cep = "";
      this.client_data.uf = "";
      this.client_data.city = "";
      this.client_data.neighborhood = "";
      this.client_data.street = "";
      this.client_data.number = "";
    },
    toggleModalCreateClient() {
      this.modal.create_client = !this.modal.create_client;
    },
    toggleModalEditClient() {
      this.modal.edit_client = !this.modal.edit_client;
    },
    toggleModalDeleteClient() {
      this.modal.delete_client = !this.modal.delete_client;
    },
  },
  mounted: function () {
    this.getAllClients();
    this.getUF();
  },
};

Vue.component("admin-panel-content", AdminPanelContent);
