<template>
  <div>
    <h1 class="text-center">Analyzing groups</h1>

    <div class="flex gap-3 mt-4">
      <NuxtLink to="#insights">
        <Button label="View insights" rounded />
      </NuxtLink>

      <NuxtLink to="#relations">
        <Button label="View relations" rounded />
      </NuxtLink>

      <NuxtLink to="#marriages">
        <Button label="View marriages" rounded />
      </NuxtLink>

      <NuxtLink to="#places">
        <Button label="View related places" rounded />
      </NuxtLink>
    </div>

    <!-- Macro tabla de personas. -->
    <SearchMacroTablePersons />

    <hr />
    <div id="insights">
      <h2 class="text-center uppercase">Global insights</h2>
      <SearchInsights />
    </div>

    <hr class="simplehr" />
    <div v-if="status === 'pending'">Loading data...</div>
    <section id="relations" v-else>
      <h3 class="text-center uppercase">Relations</h3>
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

const { data, status, error } = await useFetch(`${api}/groups`, {
  method: "POST",
  body: filter.value,
});

// console.log(data.value.personsrelationscyto);

provide("persons", data.value.personsDetails);
</script>

<style scoped>
hr {
  border: none;
  height: 20px;
  background-color: #cd4f35; /* Color de la línea */
  margin: 20px 0; /* Espaciado superior e inferior */
}
hr.simplehr {
  border: none;
  height: 5px;
  background-color: #cd4f35; /* Color de la línea */
  margin: 20px 0; /* Espaciado superior e inferior */
}
</style>
