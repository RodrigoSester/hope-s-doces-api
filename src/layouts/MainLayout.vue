<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="main-layout__title">
          {{ $t("title") }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item class="q-pa-md main-layout__drawer-header">
          {{ $t("menu") }}
        </q-item>

        <q-separator />

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: this.$t("common.plural.client"),
          icon: "mdi-account-group",
          link: "/clients",
        },
        {
          title: this.$t("common.plural.order"),
          icon: "mdi-package-variant",
          link: "/orders",
        },
        {
          title: this.$t("settings.title"),
          icon: "mdi-cogs",
          link: "/settings",
        },
      ],
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
});
</script>

<style lang="scss" scoped>
.main-layout {
  &__drawer-header {
    color: $text !important;
    font-weight: bold;
    font-size: 24px;
  }
}
</style>
