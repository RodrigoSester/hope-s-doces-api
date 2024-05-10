<template>
  <q-chip
    outline
    square
    size="16px"
    class="status-chip"
    :style="getStyle()"
    :label="$t(`common.status.${status}`)"
  />
</template>

<script>
import { defineComponent } from "vue";
import statusChipColorsEnum from "src/enums/statusChipColors.enums";

export default defineComponent({
  name: "StatusChip",
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  methods: {
    getStyle() {
      return statusChipColorsEnum[this.status.toUpperCase()];
    },
  },
});
</script>

<style lang="scss" scoped>
.status-chip {
  font-weight: 500;
}
</style>
