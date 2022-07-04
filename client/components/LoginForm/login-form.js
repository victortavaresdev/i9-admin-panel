LoginForm = {
  template: `
      <div>
        <form class="register-form" @submit.prevent v-if="register_form">
            <img src="../assets/img/logo.png" alt="logo" class="logo" />
            <input type="text" v-model="user_data.name" placeholder="Insira seu nome" class="register-form-input" />
            <input type="text" v-model="user_data.username" placeholder="Insira seu usuário" class="register-form-input" />
            <input type="password" v-model="user_data.password" placeholder="Insira sua senha" class="register-form-input" />

            <button class="register-form-button" @click="register_user">Registrar</button>
            <button class="register-form-button" @click="toggle_register_form">Cancelar</button>
        </form>
        <form class="login-form" @submit.prevent v-else>
            <img src="../assets/img/logo.png" alt="logo" class="logo" />
            <input type="text" v-model="user_data.username" placeholder="Insira seu usuário" class="login-form-input" />
            <input type="password" v-model="user_data.password" placeholder="Insira sua senha" class="login-form-input" />

            <p v-show="message" class="login-message"> {{message}} </p>

            <button class="login-form-button" @click="login_user">Entrar</button>
     
            <span class="bar"></span>
            <p class="to-register-form">Não tem conta? <span @click="toggle_register_form">Registre-se</span></p>
        </form>
      </div>
  
      `,
  data() {
    return {
      user_data: {
        name: "",
        username: "",
        password: "",
      },
      message: "",
      register_form: false,
      BASE_URL: app.$data.BASE_URL,
    };
  },
  methods: {
    async register_user() {
      const name = this.user_data.name;
      const username = this.user_data.username;
      const password = this.user_data.password;

      const userData = {
        name: name,
        username: username.toLowerCase(),
        password: password,
      };

      const ifInputValid = name && username && password;

      if (ifInputValid.trim()) {
        const REGISTER_USER_API = `${this.BASE_URL}/api/auth/register`;
        await axios.post(REGISTER_USER_API, userData);

        this.clearInputForm();
        this.register_form = false;
      }
    },
    async login_user() {
      const username = this.user_data.username;
      const password = this.user_data.password;

      const userData = {
        username: username,
        password: password,
      };

      const ifInputValid = username && password;

      if (ifInputValid.trim()) {
        const LOGIN_USER_API = `${this.BASE_URL}/api/auth/login`;
        const response = await axios.post(LOGIN_USER_API, userData);

        const authTokens = {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken?.id,
        };

        if (!authTokens.accessToken) {
          this.message = "Usuário ou senha incorreta!";
          setTimeout(() => (this.message = ""), 3000);

          return;
        }

        localStorage.setItem("authTokens", JSON.stringify(authTokens));
        axios.defaults.headers.common["Authorization"] =
          "Bearer: " + authTokens.accessToken;

        this.clearInputForm();
        this.$router.push("/admin-panel");
      }
    },
    clearInputForm() {
      this.user_data.name = "";
      this.user_data.username = "";
      this.user_data.password = "";
    },
    toggle_register_form() {
      this.register_form = !this.register_form;
    },
  },
};

Vue.component("login-form", LoginForm);
