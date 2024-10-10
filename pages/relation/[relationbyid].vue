<template>
  <div>
    <h1 class="text-center">{{ useRoute().params.relationbyid }}</h1>
    <div class="grid">
      <div class="col-6"></div>
      <div class="col-6"></div>
    </div>
    <div v-if="pending">Loading data...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h2>Concrete data</h2>
      <DataTable
        paginator
        stripedRows
        :value="data.relationid"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        dataKey="_id"
        tableStyle="min-width: 50rem"
      >
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
      </DataTable>
      <h2>Positions</h2>
      <DataTable
        paginator
        stripedRows
        :value="data.positions"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        dataKey="_id"
        tableStyle="min-width: 50rem"
      >
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

// with useLazyFetch the page is loaded while the data is being fetched
const { data, pending, error } = await useFetch(
  `${api}/relations/${useRoute().params.relationbyid}`,
);

if (data) {
  console.log(data.value.positions);
}

const columns = [
  { field: "_id", header: "Event" },
  { field: "count", header: "Total" },
];
</script>
