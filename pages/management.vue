<template>
  <div>
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
import { ref } from "vue";

const management = ref({});
const loaded = ref(false);

const loadData = async () => {
  try {
    const { data } = await useFetch("http://127.0.0.1:8008/management");

    management.value = data.value;

    loaded.value = true;
  } catch (err) {
    console.log("error en mymap5", err);
  }
};

const columns = [
  { field: "_id", header: "Field" },
  { field: "count", header: "Count" },
];

loadData();
</script>
