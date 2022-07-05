AdminPanelHeader = {
  template: `
        <header class="admin-panel-header">
          <div class="geral-box">
            <span>Geral</span>
          </div>

          <div class="user-box">
            <span class="logout-btn" @click="logoutUser">Logout</span>
          </div>
        </header>
    
        `,
  methods: {
    logoutUser() {
      localStorage.removeItem("authTokens");
      this.$router.push("/");
    },
  },
};

Vue.component("admin-panel-header", AdminPanelHeader);
