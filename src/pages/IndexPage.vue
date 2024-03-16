<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-table
        title="Orders"
        :rows="rows"
        :columns="columns"
        row-key="name"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import orderService from 'src/services/order.service';

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      rows: [],
      columns: []
    }
  },
  created() {
    this.fetchData();
    this.setColumns();
  },
  methods: {
    setColumns() {
      this.columns = [
        {
          name: 'id',
          label: 'ID do pedido',
          align: 'left',
          field: 'id',
          sortable: true
        },
        {
          name: 'person_id',
          label: 'ID da pessoa',
          align: 'center',
          field: 'person_id',
          sortable: true
        },
        {
          name: 'description',
          label: 'Descrição',
          align: 'left',
          field: 'description',
          sortable: true
        },
        {
          name: 'value',
          label: 'Total',
          align: 'left',
          field: 'value',
          sortable: true
        },
        {
          name: 'is_paid',
          label: 'Pago',
          align: 'left',
          field: 'is_paid',
          sortable: true
        },
        {
          name: 'created_at',
          label: 'Data de criação',
          align: 'left',
          field: 'created_at',
          sortable: true
        },
        {
          name: 'adress',
          label: 'Endereço',
          align: 'left',
          field: 'adress',
          sortable: true
        }
      ]
    },
    async fetchData() {
      this.rows = await orderService.getAll();
    }
  },
})
</script>
