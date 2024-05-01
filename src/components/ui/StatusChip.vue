<template>
  <q-chip
    outline
    square
    size="16px"
    class="status-chip"
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
    getColor() {
      return statusChipColorsEnum[this.status.toUpperCase()].color;
    },
    getTextColor() {
      return statusChipColorsEnum[this.status.toUpperCase()].textColor;
    },
  },
});
</script>

<style lang="scss" scoped>
.status-chip {
  font-weight: 500;
}
</style>
