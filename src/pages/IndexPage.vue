<template>
  <q-page class="order">
    <div class="row flex justify-between items-center q-pa-md order__header">
      <h1 class="q-my-sm order__header-title">Pedidos</h1>
      <div size="16px">
        <q-btn
          label="Registrar pedido"
          icon="mdi-plus"
          color="warning"
          size="20px"
        />
      </div>
    </div>
    <div class="row q-pa-md order__table">
      <q-table
        class="order__table-list"
        :rows="rows"
        :columns="columns"
        row-key="name"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import orderService from "src/services/order.service";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      rows: [],
      columns: [],
    };
  },
  created() {
    this.fetchData();
    this.setColumns();
  },
  methods: {
    setColumns() {
      this.columns = [
        {
          name: "id",
          label: "ID do pedido",
          align: "left",
          field: "id",
          sortable: true,
        },
        {
          name: "person_id",
          label: "ID da pessoa",
          align: "center",
          field: "person_id",
          sortable: true,
        },
        {
          name: "description",
          label: "Descrição",
          align: "left",
          field: "description",
          sortable: true,
        },
        {
          name: "address",
          label: "Endereço",
          align: "left",
          field: "address",
          sortable: true,
        },
        {
          name: "value",
          label: "Total",
          align: "left",
          field: "value",
          format: (val) => `R$ ${val.toFixed(2)}`,
          sortable: true,
        },
        {
          name: "delivery_status",
          label: "Status de entrega",
          align: "left",
          field: "delivery_status",
          sortable: true,
        },
        {
          name: "payment_status",
          label: "Status de pagamento",
          align: "left",
          field: "payment_status",
          sortable: true,
        },
        {
          name: "is_paid",
          label: "Pago",
          align: "left",
          field: "is_paid",
          sortable: true,
        },
        {
          name: "created_at",
          label: "Data de criação",
          align: "left",
          field: "created_at",
          sortable: true,
        },
        {
          name: "adress",
          label: "Endereço",
          align: "left",
          field: "adress",
          sortable: true,
        },
        {
          name: "actions",
          label: "Ações",
          align: "center",
          field: "actions",
        },
      ];
    },
    async fetchData() {
      this.rows = await orderService.getAll();
    },
  },
});
</script>

<style lang="scss" scoped>
.order {
  &__header {
    width: 100%;
    height: 10%;
  }

  &__header-title {
    color: $primary;
    text-align: center;
  }

  &__table {
    width: 100%;
    height: 90%;
  }

  &__table-list {
    width: 100%;
    height: 100%;
  }
}
</style>
