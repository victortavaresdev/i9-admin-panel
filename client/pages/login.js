Login = {
  template: `
    <section class="login">
      <login-form></login-form>
    </section>
    
    `,
  mounted: function () {
    const token = JSON.parse(localStorage.getItem("authTokens"));
    if (token?.accessToken) this.$router.push("/admin-panel");
  },
};

Vue.component("login", Login);
