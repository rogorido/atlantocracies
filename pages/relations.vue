<template>
  <div class="p-container">
    <h1 class="text-center">Relations</h1>

    <div class="grid">
      <div class="col-12 lg:col-6">
        <div class="flex showdata">
          <div>Total type of relations</div>
          <div class="numero">
            {{ relations.length }}
          </div>
        </div>
        <p>
          Our datababase contains information about the titles held by the
          persons. If you click on a row, you will get details about the
          selected title (which persons held it, where and when was it granted,
          etc.).
        </p>
        <p v-show="!authStore.isAuthenticated">
          You have to be
          <Button as="router-link" label="logged in" to="/login" /> in order to
          see the details!
        </p>
      </div>
      <div class="col-12 lg:col-6">
        <RelationsTable :relations="relations" @rowSelect="onRowSelect" />
      </div>
    </div>
    <Toast />
  </div>
</template>

<script setup>
import { useRelationsStore } from "../stores/relationsStore";
import { useAuthStore } from "../stores/auth";

const relationsstore = useRelationsStore();
const authStore = useAuthStore();

const relations = ref([]);
const loaded = ref(false);
const selectedRelation = ref(null);

const toast = useToast();

if (!relationsstore.initialized) {
  await relationsstore.fetchRelations();
}

relations.value = relationsstore.relations;
loaded.value = true;

// TODO: la cuestioón es qué hacer con el slug. Tengo una función de chatgpt
// pero si lo paso así luego en la página [placebyid] no puedo acceder al nombre
// con lo que debería meterlo en un store... o pasarlo con un parámetro, pero no
// veo cómo es posible... es posible con query, pero eso es otra cosa...
function goToSite() {
  return navigateTo(`/relation/${selectedRelation.value}`);
}

const onRowSelect = (event) => {
  if (!authStore.isAuthenticated) {
    toast.add({
      severity: "error",
      summary: "Not authenticated!",
      detail: "You have to log in to see the details!",
      life: 3000,
    });
  } else {
    selectedRelation.value = event.data._id;
    relationsstore.relationSelected(event.data._id);
    goToSite();
  }
};
</script>

<style scoped>
.numero {
  font-size: 1.9rem;
  color: #fff;
  background-color: #af2f14;
  width: 80px;
  border-radius: 50% 20% / 10% 40%;
  text-align: right;
}

.showdata {
  border: 3px dashed var(--primary-color);
  padding: 10px;
  justify-content: space-between;
  font-size: 1.6rem;
  align-items: center;
  margin-bottom: 10px;
}
</style>
