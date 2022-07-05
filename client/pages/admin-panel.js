AdminPanel = {
  template: `
      <div>
        <admin-panel-header></admin-panel-header>
        <admin-panel-options></admin-panel-options>
        <admin-panel-content></admin-panel-content>
      </div>
  
      `,
  methods: {
    generateNewToken() {
      setInterval(async () => {
        const authTokens = JSON.parse(localStorage.getItem("authTokens"));
        const OneHour = 3600000;

        if (authTokens.accessToken) {
          const REFRESH_TOKEN_API = `${app.$data.BASE_URL}/api/auth/refresh-token`;
          const refresh_token = {
            refresh_token: authTokens.refreshToken,
          };
          const response = await axios.post(REFRESH_TOKEN_API, refresh_token);
          const newToken = response.data.accessToken;
          const updatedAccessToken = {
            accessToken: newToken,
          };
          console.log(`Novo Access Token: ${newToken}`);
          localStorage.setItem(
            "authTokens",
            JSON.stringify(updatedAccessToken)
          );
        }
      }, 10000);
    },
  },
  mounted: function () {
    // this.generateNewToken();
    const token = JSON.parse(localStorage.getItem("authTokens"));
    if (!token) this.$router.push("/");
  },
};

Vue.component("admin-panel", AdminPanel);
