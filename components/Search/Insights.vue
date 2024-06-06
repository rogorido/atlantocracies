<template>
  <div>
    <h2 id="insights" class="mt-5 text-center uppercase">Insights</h2>
    <TabView>
      <TabPanel header="Birth years in decades">
        <div class="grid">
          <div class="col-6">
            <h2>Birth years</h2>
            <Chart class="graph" v-if="loaded" type="bar" :data="insightsData.decadesBirthData" />
          </div>
          <div class="col-5">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
              reiciendis exercitationem! Illo sunt, natus adipisci quo rem
              eveniet optio! Esse nobis necessitatibus nihil temporibus laborum!
              Voluptas neque optio veritatis incidunt.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
              voluptates voluptatem reiciendis in asperiores quo quia quam
              blanditiis, temporibus assumenda corrupti omnis maiores enim.
              Ipsum accusamus aliquam aperiam rerum doloremque?
            </p>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Gender">
        <div class="grid">
          <div class="col-6">
            <h2>Table</h2>
            <DataTable :value="insightsData.gendersData" stripedRows :rows="10" selectionMode="single" dataKey="_id"
              tableStyle="min-width: 50rem" v-if="loaded">
              <Column key="gender" field="gender" header="Gender"></Column>
              <Column key="country" field="count" header="Total"></Column>
              <Column key="percent" field="percent" header="%"></Column>
            </DataTable>
          </div>
          <div class="col-6">
            <h2>Gender</h2>
            <GendersChart class="graph" v-if="loaded" :chartData="insightsData.gendersChartData" :options="options" />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Birth places (historical)">
        <div class="grid">
          <div class="col-6">
            <h2>Birth places (historical)</h2>

            <Chart v-if="loaded" class="graph" type="pie" :data="insightsData.histBirthsChartData" :options="options" />
          </div>
          <div class="col-6">
            <h2>Table</h2>
            <DataTable :value="insightsData.histBirthsData" paginator stripedRows :rows="10"
              :rowsPerPageOptions="[5, 10, 20, 50]" selectionMode="single" dataKey="_id" tableStyle="min-width: 50rem">
              <Column key="_id" field="_id" header="Country"></Column>
              <Column key="country" field="count" header="Total"></Column>
              <Column key="percent" field="percent" header="%"></Column>
            </DataTable>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Positions">
        <div class="grid">
          <div class="col-6">
            <h2>Has positions</h2>

            <h2>Table</h2>
            <DataTable :value="insightsData.hasPositionsData" stripedRows :rows="10" selectionMode="single"
              dataKey="_id" tableStyle="min-width: 50rem" v-if="loaded">
              <Column key="hasPositions" field="hasPositions" header="Positions"></Column>
              <Column key="count" field="count" header="Total" sortable></Column>
              <Column key="percent" field="percent" header="%" sortable></Column>
            </DataTable>
            <Chart v-if="loaded" type="pie" :data="insightsData.hasPositionsChartData" :options="options" />
          </div>
          <div class="col-6">
            <h2>Positions and geographical distribution</h2>
            <p v-if="insightsData.positionsTableTree.length > 0">
              There are {{ insightsData.positionsTableTree.length }} different
              positions.
            </p>
            <TreeTable :value="insightsData.positionsTableTree" :paginator="true" :rows="10"
              :rowsPerPageOptions="[10, 20, 30, 40]">
              <template #empty> No positions found. </template>
              <Column field="name" header="Name" sortable expander></Column>
              <Column field="count" header="Total" sortable></Column>
            </TreeTable>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Titles">
        <div class="grid">
          <div class="col-6">
            <h2>Has titles</h2>

            <Chart v-if="loaded" type="pie" :data="insightsData.hasTitlesChartData" :options="options" />
          </div>
          <div class="col-6">
            <h2>Table</h2>
            <DataTable :value="insightsData.hasTitlesData" stripedRows :rows="10" selectionMode="single" dataKey="_id"
              tableStyle="min-width: 50rem" v-if="loaded">
              <Column key="hasTitles" field="hasTitles" header="Titles"></Column>
              <Column key="count" field="count" header="Total"></Column>
              <Column key="percent" field="percent" header="%"></Column>
            </DataTable>
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
import Chart from "primevue/chart";
import { usePersonsStore } from "@/stores/personsStore";

// TODO: esto no funciona tal vez porque el Chart modifica el objeto
// y no lo hace o no lo puede hacer...
// const insightsData = inject("insightsData");
//

const store = usePersonsStore();
const { insightsData } = storeToRefs(store);

// const props = defineProps({
//   insightsData: { type: Object, required: true, default: null },
// });

// TODO: probablemente no se necesita esto...
const loaded = ref(false);

const options = { responsive: true, maintainAspectRatio: false };

if (insightsData) {
  console.log("insightsData", insightsData.value.positionsTableTree);
  loaded.value = true;
}
</script>

<style scoped>
.graph {
  width: 100%;
}
</style>
