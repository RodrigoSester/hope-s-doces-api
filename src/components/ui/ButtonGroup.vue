<template>
  <q-btn round :icon="iconButton" size="16">
    <q-menu anchor="bottom start">
      <q-item
        clickable
        v-for="action in actions"
        :key="action"
        @click="action.callback"
      >
        <q-item-section>
          <q-icon left :name="action.icon" size="16"></q-icon>
          <q-item-label>{{ action.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  name: "OrderPage",
  props: {
    actions: {
      type: Array,
      required: true,
    },
    iconButton: {
      type: String,
      required: true,
    },
  },
};
</script>
