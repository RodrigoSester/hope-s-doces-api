<template>
  <q-page class="login">
    <div class="q-pa-md fixed-center justify-center">
      <h1 class="login__title">Hope's Doces</h1>
      <q-card class="rounded-borders">
        <q-card-section>
          <q-form @submit="login">
            <span class="input"> E-mail* </span>
            <q-input
              outlined
              v-model="email"
              type="email"
              class="q-mb-md"
              :rules="emailRules"
            />
            <span class="input"> Senha* </span>
            <q-input
              v-model="password"
              type="password"
              outlined
              class="q-mb-md"
              :rules="rules"
            />
            <q-btn
              type="submit"
              label="Entrar"
              color="primary"
              class="q-mb-md"
              to="/orders"
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
      rules: [(val) => val.length > 0 || "Campo obrigatório"],
      emailRules: [(val, rules) => rules.email(val) || "E-mail inválido"],
    };
  },
  methods: {
    async login() {
      const body = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      await authServices.login(body);
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
