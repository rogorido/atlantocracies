<template>
  <div>
    <h1 class="text-center">Analyzing groups</h1>
    <SearchMacroTablePersons />

    <h2 class="text-center uppercase">Global insights</h2>
    <SearchInsights />
    <div v-if="pending">Cargando datos...</div>
    <section v-else>
      <TabView>
        <TabPanel header="Relations">
          <GroupsRelationsMain
            :personsrelatedcyto="data.personsrelationscyto"
            :personsrelated="data.personsrelationstable"
            :placesrelated="data.placesrelated"
          />
        </TabPanel>

        <!-- <TabPanel header="Events" -->
        <!--   ><DataTable -->
        <!--     :value="management.events" -->
        <!--     paginator -->
        <!--     stripedRows -->
        <!--     :rows="10" -->
        <!--     :rowsPerPageOptions="[5, 10, 20, 50]" -->
        <!--     dataKey="_id" -->
        <!--     tableStyle="max-width: 30rem" -->
        <!--   > -->
        <!--     <Column -->
        <!--       v-for="col of columns" -->
        <!--       :key="col.field" -->
        <!--       :field="col.field" -->
        <!--       :header="col.header" -->
        <!--     ></Column> -->
        <!--   </DataTable> -->
        <!-- </TabPanel> -->
        <!-- <TabPanel header="Positions" -->
        <!--   ><DataTable -->
        <!--     :value="management.positions" -->
        <!--     paginator -->
        <!--     stripedRows -->
        <!--     :rows="10" -->
        <!--     :rowsPerPageOptions="[5, 10, 20, 50]" -->
        <!--     dataKey="_id" -->
        <!--     tableStyle="max-width: 30rem" -->
        <!--   > -->
        <!--     <Column -->
        <!--       v-for="col of columns" -->
        <!--       :key="col.field" -->
        <!--       :field="col.field" -->
        <!--       :header="col.header" -->
        <!--     ></Column> -->
        <!--   </DataTable> -->
        <!-- </TabPanel> -->
        <!-- <TabPanel header="Titles" -->
        <!--   ><DataTable -->
        <!--     :value="management.titles" -->
        <!--     paginator -->
        <!--     stripedRows -->
        <!--     :rows="10" -->
        <!--     :rowsPerPageOptions="[5, 10, 20, 50]" -->
        <!--     dataKey="_id" -->
        <!--     tableStyle="max-width: 30rem" -->
        <!--   > -->
        <!--     <Column -->
        <!--       v-for="col of columns" -->
        <!--       :key="col.field" -->
        <!--       :field="col.field" -->
        <!--       :header="col.header" -->
        <!--     ></Column> -->
        <!--   </DataTable> -->
        <!-- </TabPanel> -->
      </TabView>
    </section>
    <ScrollTop target="window" :threshold="100" icon="pi pi-arrow-up" />
  </div>
</template>

<script setup>
// import { usePersonsStore } from "@/stores/personsStore";
import { useFilterStore } from "@/stores/filterStore";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

// const store = usePersonsStore();
// const { persons } = storeToRefs(store);

const storefilter = useFilterStore();
const { filter } = storeToRefs(storefilter);

const { data, pending, error } = await useFetch(`${api}/groups`, {
  method: "POST",
  body: filter.value,
});

console.log(data.value.personsrelationscyto);

provide("persons", data.value.personsDetails);
</script>
