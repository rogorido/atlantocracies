<template>
  <div v-if="status === 'pending'">Loading data...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <h1 class="text-center">Management</h1>
    <TabView>
      <TabPanel header="Relations">
        <DataTable
          :value="management.relations"
          paginator
          stripedRows
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          dataKey="_id"
          tableStyle="max-width: 30rem"
        >
          <Column
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
          ></Column>
        </DataTable>
      </TabPanel>

      <TabPanel header="Events"
        ><DataTable
          :value="management.events"
          paginator
          stripedRows
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          dataKey="_id"
          tableStyle="max-width: 30rem"
        >
          <Column
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
          ></Column>
        </DataTable>
      </TabPanel>
      <TabPanel header="Positions"
        ><DataTable
          :value="management.positions"
          paginator
          stripedRows
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          dataKey="_id"
          tableStyle="max-width: 30rem"
        >
          <Column
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
          ></Column>
        </DataTable>
      </TabPanel>
      <TabPanel header="Titles"
        ><DataTable
          :value="management.titles"
          paginator
          stripedRows
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          dataKey="_id"
          tableStyle="max-width: 30rem"
        >
          <Column
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
          ></Column>
        </DataTable>
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

const { data: management, status, error } = await useFetch(`${api}/management`);

const columns = [
  { field: "_id", header: "Field" },
  { field: "count", header: "Count" },
];
</script>
