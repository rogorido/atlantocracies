<template>
  <div v-if="status === 'pending'">Loading data...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <h1 class="text-center">Management</h1>
    <Tabs value="0">
      <TabList>
        <Tab value="0">Relations</Tab>
        <Tab value="1">Events</Tab>
        <Tab value="2">Positions</Tab>
        <Tab value="3">Titles</Tab>
      </TabList>

      <TabPanel value="0">
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

      <!-- Events -->
      <TabPanel value="1"
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

      <!-- Positions -->
      <TabPanel value="2"
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

      <!-- Titles -->
      <TabPanel value="3"
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
    </Tabs>
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
