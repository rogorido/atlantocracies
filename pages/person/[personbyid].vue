<template>
  <div v-if="pending">Loading data</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <h1 class="text-center">
      {{ data.persondetails ? data.persondetails.name : "" }}
    </h1>
    <TabView>
      <TabPanel header="Relations">
        <div class="grid">
          <div class="col-6">
            <h2>Relations</h2>
            <PersonsRelationsTable :relations="data.persondetails.relations" />
          </div>
          <div class="col-6">
            <PersonsRelationsGraph :personsrelated="data.personnetwork" />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Events">
        <div class="grid">
          <div class="col-6">
            <h2>Events</h2>
            <PersonsEventsTable :events="data.persondetails.events" />
          </div>
          <div>
            <PersonsEventsTimeLine
              :eventstimeline="data.personeventstimeline"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Positions">
        <div class="col-6">
          <h2>Positions</h2>
          <PersonsPositionsTable :positions="data.persondetails.positions" />
        </div>
      </TabPanel>
      <TabPanel header="Titles">
        <div class="grid">
          <div class="col-6">
            <h2>Titles</h2>
            <PersonsTitlesTable :titles="data.persondetails.titles" />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Places">
        <div class="grid">
          <div class="col-6">
            <h2>Places</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
              aspernatur maiores id quo corporis in molestiae magni dignissimos
              porro vel eos nemo quas, doloremque asperiores quod repudiandae
              aperiam possimus sed! Fugiat ea dolorum deleniti suscipit maiores,
              labore quisquam praesentium eius assumenda sapiente optio nisi
              tenetur officiis. Explicabo fuga, esse delectus officiis
              perspiciatis odit sunt asperiores architecto laudantium,
              reiciendis deleniti ad? Distinctio dolorem officia vel voluptates
              adipisci repudiandae consequuntur maxime vitae quisquam a veniam
              non quam ex perferendis reprehenderit, voluptatem natus.
              Quibusdam, voluptate! Expedita enim harum consequatur beatae id
              sint deserunt?
            </p>
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePersonsStore } from "../../stores/personsStore";

//import { createSlug } from "../../utils/createSlug.ts";
//console.log(createSlug(useRoute().params.placebyid));

const loaded = ref(false);
const store = usePersonsStore();

const eventstimeline = ref({});
const relationsnetwork = ref({});

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

// with useLazyFetch the page is loaded while the data is being fetched
const { data, pending, error } = await useLazyFetch(
  `${api}/persons/personsbyid/${useRoute().params.personbyid}`
);
const loadPersonsData = async () => {
  try {
    eventstimeline.value = data.personeventstimeline;
    relationsnetwork.value = data.personnetwork;

    loaded.value = true;
  } catch (err) {
    console.log("error en mymap5", err);
  }
};

const columns = [
  { field: "name", header: "Name" },
  { field: "gender", header: "Gender" },
  { field: "histBirth", header: "Birth territory" },
  { field: "wasMarried", header: "Was married" },
  //  { field: "hasFather", header: "Has father" },
  { field: "hasMother", header: "Has mother" },
  { field: "tiposEventos", header: "Eventos" },
];

const getName = computed(() => {
  personData.value.name;
});
</script>
