<template>
  <q-page class="login">
    <div class="q-pa-md fixed-center justify-center">
      <h1 class="login__title">Hope's Doces</h1>
      <q-card class="rounded-borders">
        <q-card-section>
          <q-form @submit="login">
            <q-input
              v-model="username"
              label="Username"
              outlined
              class="q-mb-md"
            />
            <q-input v-model="email" label="E-mail" outlined class="q-mb-md" />
            <q-input
              v-model="password"
              label="Senha"
              type="password"
              outlined
              class="q-mb-md"
            />
            <q-btn
              type="submit"
              label="Entrar"
              color="primary"
              class="q-mb-md"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import authServices from "src/services/auth.services";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      username: "",
    };
  },
  methods: {
    async login() {
      const body = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      await authServices.register(body);
    },
  },
});
</script>

<style lang="scss" scoped>
.login {
  &__title {
    color: $primary !important;
    text-align: center;
  }
}
</style>
