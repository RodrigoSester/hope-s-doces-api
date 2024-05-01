<template>
  <q-page class="order">
    <div class="row flex justify-between items-center q-pa-md order__header">
      <h1 class="q-my-sm order__header-title">
        {{ $t("common.plural.order") }}
      </h1>
      <div size="16px">
        <q-btn
          :label="
            $t('common.buttons.register', {
              entity: $t('common.singular.order'),
            })
          "
          icon="mdi-plus-thick"
          color="warning"
          size="16px"
        />
      </div>
    </div>
    <div class="row q-pa-md order__table">
      <q-table
        class="order__table-list"
        table-header-class="bg-primary order__table-header"
        icon-first-page="mdi-page-first"
        icon-prev-page="mdi-chevron-left"
        icon-next-page="mdi-chevron-right"
        icon-last-page="mdi-page-last"
        separator="cell"
        row-key="name"
        :no-data-label="$t('common.table.noData')"
        :no-results-label="$t('common.table.noResults')"
        :rows-per-page-label="$t('common.table.rowsPerPage')"
        :rows-per-page-options="perPageOptions"
        :pagination-label="
          () =>
            $t('common.table.pagination', {
              page: pagination.page,
              pages: pagination.rowsNumber,
            })
        "
        v-model:pagination="pagination"
        :rows="rows"
        :columns="columns"
        :loading="loading"
      >
      </q-table>
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
      loading: false,
      rows: [],
      columns: [],
      perPageOptions: [10, 25, 50],
      pagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      },
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
          align: "center",
          field: "id",
          sortable: true,
          headerClasses: "order__table-header__id",
        },
        {
          name: "person_id",
          label: "Pessoa",
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
          name: "value",
          label: "Total",
          align: "left",
          field: "value",
          // format: (val) => `R$ ${val.toFixed(2)}`,
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
          name: "delivered_at",
          label: "Entregue em",
          align: "left",
          field: "delivered_at",
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
          name: "paid_at",
          label: "Pago em",
          align: "left",
          field: "paid_at",
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
      this.loading = true;

      try {
        const response = await orderService.getAll();

        this.rows = response;
        console.log("LOG: -> fetchData -> this.rows:", response);
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
::v-deep .order {
  &__header {
    width: 100%;
    height: 10%;
  }

  &__header-title {
    color: $primary;
    text-align: center;
    font-size: 60px;
  }

  &__table {
    width: 100%;
    height: 90%;
  }

  &__table-header {
    &__id {
      max-width: 100px;
      text-wrap: wrap;
    }

    th {
      font-size: 16px;
    }
  }

  &__table-list {
    width: 100%;
    height: 100%;
  }
}
</style>
