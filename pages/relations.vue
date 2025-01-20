<template>
  <div>
    <h1 class="text-center">Relations</h1>

    <RelationsTable
      :relations="relations"
      @rowSelect="onRowSelect"
      tabStyle="max-width: 50rem"
    />
  </div>
</template>

<script setup>
import { useRelationsStore } from "../stores/relationsStore";

const relationsstore = useRelationsStore();

const relations = ref([]);
const loaded = ref(false);
const selectedRelation = ref(null);

// const config = useRuntimeConfig();
// const api = config.public.apiBaseUrl;

if (!relationsstore.initialized) {
  await relationsstore.fetchRelations();
}

relations.value = relationsstore.relations;
loaded.value = true;

// TODO: la cuestioón es qué hacer con el slug. Tengo una función de chatgpt
// pero si lo paso así luego en la página [placebyid] no puedo acceder al nombre
// con lo que debería meterlo en un store... o pasarlo con un parámetro, pero no
// veo cómo es posible... es posible con query, pero eso es otra cosa...
function probar() {
  return navigateTo(`/relation/${selectedRelation.value}`);
}

const onRowSelect = (event) => {
  // console.log("onRowSelect", event.data._id);
  selectedRelation.value = event.data._id;
  // relationsstore.relationSelected(selectedRelation.value);
  relationsstore.relationSelected(event.data._id);
  probar();
};
</script>
