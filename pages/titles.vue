<template>
  <div>
    <h1 class="text-center">Titles</h1>

    <TitlesTable
      :titles="titles"
      @rowSelect="onRowSelect"
      tabStyle="max-width: 50rem"
    />
  </div>
</template>

<script setup>
import { useTitlesStore } from "../stores/titlesStore";

const titlesstore = useTitlesStore();

const titles = ref([]);
const loaded = ref(false);
const selectedTitle = ref(null);

// const config = useRuntimeConfig();
// const api = config.public.apiBaseUrl;

if (!titlesstore.initialized) {
  await titlesstore.fetchTitles();
}

// titles in store is an object with 2 arrays: titlestypes and titlescontinents.
titles.value = titlesstore.titles.titlestypes;
loaded.value = true;

// TODO: la cuestioón es qué hacer con el slug. Tengo una función de chatgpt
// pero si lo paso así luego en la página [placebyid] no puedo acceder al nombre
// con lo que debería meterlo en un store... o pasarlo con un parámetro, pero no
// veo cómo es posible... es posible con query, pero eso es otra cosa...
function probar() {
  return navigateTo(`/title/${selectedTitle.value}`);
}

const onRowSelect = (event) => {
  // console.log("onRowSelect", event.data._id);
  selectedTitle.value = event.data._id;
  // titlesstore.titleSelected(selectedtitle.value);
  titlesstore.titleSelected(event.data._id);
  probar();
};
</script>
