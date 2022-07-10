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

        if (authTokens?.accessToken) {
          const REFRESH_TOKEN_API = `${app.$data.BASE_URL}/api/auth/refresh-token`;
          const refresh_token = {
            refresh_token: authTokens.refreshToken,
          };
          const response = await axios.post(REFRESH_TOKEN_API, refresh_token);
          const newToken = response.data.accessToken;
          const updatedAccessToken = {
            accessToken: newToken,
          };

          localStorage.setItem(
            "authTokens",
            JSON.stringify(updatedAccessToken)
          );
          axios.defaults.headers.common["Authorization"] =
            "Bearer: " + updatedAccessToken.accessToken;
        }
      }, 3600000);
    },
  },
  mounted: function () {
    this.generateNewToken();
    const token = JSON.parse(localStorage.getItem("authTokens"));
    if (!token?.accessToken) this.$router.push("/");
  },
};

Vue.component("admin-panel", AdminPanel);
