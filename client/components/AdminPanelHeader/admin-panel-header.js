AdminPanelHeader = {
  template: `
        <header class="admin-panel-header">
          <div class="geral-box">
            <span>Geral</span>
          </div>

          <div class="user-box">
            <span class="logout-btn" @click="logout_user">Logout</span>
          </div>
        </header>
    
        `,
  methods: {
    logout_user() {
      localStorage.removeItem("authTokens");
      this.$router.push("/");
    },
  },
};

Vue.component("admin-panel-header", AdminPanelHeader);
