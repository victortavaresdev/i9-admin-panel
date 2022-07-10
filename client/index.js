const Login = { template: "<login></login>" };
const AdminPanel = { template: "<admin-panel></admin-panel>" };

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/admin-panel",
    component: AdminPanel,
  },
  {
    path: "*",
    component: Login,
  },
];

const router = new VueRouter({
  routes: routes,
  mode: "history",
});

const app = new Vue({
  el: "#app",
  router: router,
  data() {
    return {
      BASE_URL: "http://localhost:3000",
    };
  },
});
