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
        selectionMode="single"
        dataKey="_id"
        @rowSelect="onRowSelect"
        tableStyle="min-width: 50rem"
      >
        <Column
          v-for="col of columnsRel"
          :key="col.field"
          :field="col.field"
          :header="col.header"
          sortable
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
          v-for="col of columnsPositions"
          :key="col.field"
          :field="col.field"
          :header="col.header"
          sortable
        ></Column>
      </DataTable>
    </div>
  </div>
  <!-- Detalles  -->
  <section class="details-section">
    <div v-if="details">
      <h2>{{ details._id }}</h2>
      <p>Number of informations: {{ details.totalInformations }}</p>
      <div class="grid">
        <div class="col-4">
          <DataTable :value="details.positions">
            <Column field="info" header="Position"></Column
          ></DataTable>
        </div>
        <div class="col-4">
          <DataTable :value="details.titlesInf">
            <Column field="info" header="Titles"></Column
          ></DataTable>
        </div>
        <div class="col-4">
          <DataTable :value="details.placesInf">
            <Column field="info" header="Place"></Column
          ></DataTable>
        </div>
      </div>
      {{ details }}
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

const details = ref({});

// with useLazyFetch the page is loaded while the data is being fetched
const { data, pending, error } = await useFetch(
  `${api}/relations/${useRoute().params.relationbyid}`,
);

if (data) {
  console.log(data.value.positions);
}

const columnsRel = [
  { field: "_id", header: "Person" },
  { field: "totalInformations", header: "Informations" },
];
const columnsPositions = [
  { field: "_id", header: "Position" },
  { field: "count", header: "Total" },
];

// TODO: la cuestioón es qué hacer con el slug. Tengo una función de chatgpt
// pero si lo paso así luego en la página [placebyid] no puedo acceder al nombre
// con lo que debería meterlo en un store... o pasarlo con un parámetro, pero no
// veo cómo es posible... es posible con query, pero eso es otra cosa...
function probar() {
  // return navigateTo(`/place/${selectedPlace.value}`, {
  //   open: { target: "_blank" },
  // });

  return navigateTo(`/person/${selectedPerson.value}`);
}

const onRowSelect = (event) => {
  details.value = event.data;

  // esto se puede hacer mejor con algo así para no repetir el código similar:
  // function transformArrays(object, fields) {
  //  fields.forEach(field => {
  //    if (Array.isArray(object[field])) {
  //      object[field] = object[field].map(item => {
  //        return { value: item }; // o cualquier otra clave
  //      });
  //    }
  //  });
  //}
  //
  details.value.positions = details.value.positions.map((position) => {
    return { info: position };
  });

  details.value.titlesInf = details.value.titlesInf.map((title) => {
    return { info: title };
  });

  details.value.placesInf = details.value.placesInf.map((place) => {
    return { info: place };
  });

  // Desplazar el foco hacia la sección de detalles
  setTimeout(() => {
    const detailsSection = document.querySelector(".details-section");
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
};
</script>
