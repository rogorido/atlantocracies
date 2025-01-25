<template>
  <div class="p-container-fluid">
    <div v-if="status === 'pending'">Loading data...</div>
    <div v-else-if="status === 'error'">{{ error }}</div>
    <div v-else>
      <h1 class="text-center">
        {{ data.persondetails ? data.persondetails.name : "" }}
      </h1>
      <div class="grid">
        <div class="col-12 lg:col-6">
          <Fieldset legend="Personal data" :toggleable="true">
            <table>
              <tbody>
                <tr>
                  <td>Treatment</td>
                  <td>{{ data.persondetails.treatment }}</td>
                </tr>
                <tr>
                  <td>Birth date</td>
                  <td>{{ data.persondetails.datebirth }}</td>
                </tr>
                <tr>
                  <td>Death date</td>
                  <td>{{ data.persondetails.datedeath }}</td>
                </tr>
                <tr>
                  <td>Place birth</td>
                  <td>
                    {{ data.persondetails.placebirth }}
                  </td>
                </tr>
                <tr>
                  <td>Country birth</td>
                  <td>
                    {{ data.persondetails.countryBirth }}
                  </td>
                </tr>
                <tr>
                  <td>Continent birth</td>
                  <td>
                    {{ data.persondetails.continentBirth }}
                  </td>
                </tr>
                <tr>
                  <td>Historical Birth country</td>
                  <td>
                    {{ data.persondetails.histBirth }}
                  </td>
                </tr>
                <tr>
                  <td>Has father in the database</td>
                  <td>
                    {{ data.persondetails.hasFather }}
                  </td>
                </tr>
                <tr>
                  <td>Has mother in the database</td>
                  <td>
                    {{
                      data.persondetails.hasMother
                        ? data.persondetails.hasMother
                        : "No data"
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Wrote his/her last will</td>
                  <td>
                    {{
                      data.persondetails.hizoTestamento
                        ? data.persondetails.hizoTestamento
                        : "No data"
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </Fieldset>
        </div>
        <div class="col-12 lg:col-6">
          <Fieldset legend="Profesional data" :toggleable="true">
            <table>
              <tbody>
                <tr>
                  <td>Number of Events</td>
                  <td>{{ data.persondetails.numberOfEvents }}</td>
                </tr>

                <tr>
                  <td>Number of Relations</td>
                  <td>{{ data.persondetails.numberOfRelations }}</td>
                </tr>

                <tr>
                  <td>Number of Positions</td>
                  <td>{{ data.persondetails.numberOfPositions }}</td>
                </tr>

                <tr>
                  <td>Number of Titles</td>
                  <td>{{ data.persondetails.numberOfTitles }}</td>
                </tr>
              </tbody>
            </table>
          </Fieldset>
        </div>
      </div>
      <Fieldset
        legend="Other data"
        class="gray"
        :toggleable="true"
        :collapsed="true"
      >
        <p>ID of the person: {{ data.persondetails.personId }}</p>
        <p>Internal ID of the person: {{ data.persondetails._id }}</p>
        <p>
          Data found in the source: {{ data.persondetails.source }}, p.
          {{ data.persondetails.pageFr }}.
        </p>
      </Fieldset>
      <Tabs value="0" scrollable>
        <TabList>
          <Tab value="0">Relations</Tab>
          <Tab value="1">Events</Tab>
          <Tab value="2">Positions</Tab>
          <Tab vanlue="3">Titles</Tab>
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
          <div class="center-table">
            <h2>Events</h2>
            <PersonsEventsTable :events="data.persondetails.events" />
            <!-- <div class="col-6"> -->
            <!--   <PersonsEventsTimeLine -->
            <!--     :eventstimeline="data.personeventstimeline" -->
            <!--   /> -->
            <!-- </div> -->
          </div>
        </TabPanel>

        <!-- Positions -->
        <TabPanel value="2">
          <div class="center-table">
            <h2>Positions</h2>
            <PersonsPositionsTable :positions="data.persondetails.positions" />
          </div>
        </TabPanel>

        <!-- Titles -->
        <TabPanel value="3">
          <div class="center-table">
            <h2>Titles</h2>
            <PersonsTitlesTable :titles="data.persondetails.titles" />
          </div>
        </TabPanel>

        <!-- Places -->
        <TabPanel value="4">
          <div class="grid">
            <div class="col-12 lg:col-6">
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
const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

// with useLazyFetch the page is loaded while the data is being fetched
const { data, status, error } = await useLazyFetch(
  `${api}/persons/personsbyid/${useRoute().params.personbyid}`,
);
</script>

<style scoped>
.center-table {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.gray {
  color: gray;
}

table {
  max-width: 100%;
  width: 100%;
}

tr {
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #d6eeee;
}

tr:nth-child(odd) {
  background-color: #eee;
}

th {
  background-color: #555;
  color: #fff;
}

th,
td {
  text-align: left;
  padding: 0.5em 1em;
}
</style>
