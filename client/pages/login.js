Login = {
  template: `
    <section class="login">
      <login-form></login-form>
    </section>
    
    `,
  mounted: function () {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    if (authTokens) this.$router.push("/admin-panel");
  },
};

Vue.component("login", Login);
