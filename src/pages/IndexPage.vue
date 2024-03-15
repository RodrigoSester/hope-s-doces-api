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
import { api } from 'src/boot/axios';

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
          name: 'name',
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'price',
          label: 'Price',
          align: 'left',
          field: 'price',
          sortable: true
        },
        {
          name: 'quantity',
          label: 'Quantity',
          align: 'left',
          field: 'quantity',
          sortable: true
        },
        {
          name: 'total',
          label: 'Total',
          align: 'left',
          field: 'total',
          sortable: true
        }
      ]
    },
    async fetchData() {
      const response = await api.get('http://localhost:3000/orders', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoicm9kcmlnb3dzZXN0ZXJoZWltQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiUm9kcmlnbyBXZWJlciBTZXN0ZXJoZWltIiwiaWF0IjoxNzEwNTMzNDMxLCJleHAiOjE3MTA2MTk4MzF9.F0JcDTh1Oaco5r-d6l9894_pvrCQE82XXxrXgchpDaA'
        }
      });
      console.log(response.data);
      this.rows = response.data;
    }
  },
})
</script>
