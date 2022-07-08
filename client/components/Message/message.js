Message = {
  template: `
    <div class="message" :class="{ red: hasError }">
        <p>{{ message }}</p>  
    </div>
    `,
  props: {
    message: String,
    hasError: Boolean,
  },
};

Vue.component("message", Message);
