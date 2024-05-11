<template>
  <q-btn round :icon="iconButton" size="16px">
    <q-menu anchor="bottom start" max-width="500px">
      <q-item
        clickable
        v-for="action in actions"
        :key="action"
        @click="() => action.callback(item)"
      >
        <q-item-section no-wrap>
          <q-item-label>
            <q-icon left :name="action.icon" size="20px" />
            {{ action.label }}
          </q-item-label>
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
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
