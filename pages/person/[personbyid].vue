<template>
  <div class="p-container-fluid">
    <div v-if="status === 'pending'">Loading data...</div>
    <div v-else-if="status === 'error'">{{ error }}</div>
    <div v-else>
      <h1 class="text-center">
        {{ data.persondetails ? data.persondetails.name : "" }}
      </h1>
      <p>Esto es una prueba {{ data.persondetails.gender }}</p>
      <Tabs value="0">
        <TabList>
          <Tab value="0">Relations</Tab>
          <Tab value="1">Events</Tab>
          <Tab value="2">Positions</Tab>
          <Tab value="3">Titles</Tab>
          <Tab value="4">Places</Tab>
        </TabList>

        <!-- Relations -->
        <TabPanel value="0">
          <div class="grid">
            <div class="col-12 lg:col-6">
              <h2>Relations</h2>
              <PersonsRelationsTable
                :relations="data.persondetails.relations"
              />
            </div>
            <div class="col-12 lg:col-6">
              <PersonsRelationsGraph :personsrelatedcyto="data.personnetwork" />
            </div>
          </div>
        </TabPanel>

        <!-- Events -->
        <TabPanel value="1">
          <div class="grid">
            <div class="col-6">
              <h2>Events</h2>
              <PersonsEventsTable :events="data.persondetails.events" />
            </div>
            <!-- <div class="col-6"> -->
            <!--   <PersonsEventsTimeLine -->
            <!--     :eventstimeline="data.personeventstimeline" -->
            <!--   /> -->
            <!-- </div> -->
          </div>
        </TabPanel>

        <!-- Positions -->
        <TabPanel value="2">
          <div class="col-6">
            <h2>Positions</h2>
            <PersonsPositionsTable :positions="data.persondetails.positions" />
          </div>
        </TabPanel>

        <!-- Titles -->
        <TabPanel value="3">
          <div class="grid">
            <div class="col-6">
              <h2>Titles</h2>
              <PersonsTitlesTable :titles="data.persondetails.titles" />
            </div>
          </div>
        </TabPanel>

        <!-- Places -->
        <TabPanel value="4">
          <div class="grid">
            <div class="col-6">
              <h2>Places</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Delectus aspernatur maiores id quo corporis in molestiae magni
                dignissimos porro vel eos nemo quas, doloremque asperiores quod
                repudiandae aperiam possimus sed! Fugiat ea dolorum deleniti
                suscipit maiores, labore quisquam praesentium eius assumenda
                sapiente optio nisi tenetur officiis. Explicabo fuga, esse
                delectus officiis perspiciatis odit sunt asperiores architecto
                laudantium, reiciendis deleniti ad? Distinctio dolorem officia
                vel voluptates adipisci repudiandae consequuntur maxime vitae
                quisquam a veniam non quam ex perferendis reprehenderit,
                voluptatem natus. Quibusdam, voluptate! Expedita enim harum
                consequatur beatae id sint deserunt?
              </p>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  </div>
</template>

<script setup>
// import { ref, computed } from "vue";
// import { usePersonsStore } from "../../stores/personsStore";

//import { createSlug } from "../../utils/createSlug.ts";
//console.log(createSlug(useRoute().params.placebyid));

// const loaded = ref(false);
// const store = usePersonsStore();

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

// with useLazyFetch the page is loaded while the data is being fetched
const { data, status, error } = await useLazyFetch(
  `${api}/persons/personsbyid/${useRoute().params.personbyid}`,
);
</script>
