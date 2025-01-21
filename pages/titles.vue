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

if (!titlesstore.initialized) {
  await titlesstore.fetchTitles();
}

// titles in store is an object with 2 arrays: titlestypes and titlescontinents.
titles.value = titlesstore.titles.titlestypes;
loaded.value = true;

function probar() {
  return navigateTo(`/title/${selectedTitle.value}`);
}

const onRowSelect = (event) => {
  // console.log("onRowSelect", event.data._id);
  selectedTitle.value = event.data._id;
  titlesstore.titleSelected(event.data._id);
  probar();
};
</script>
