<template>
  <div>
    <h1 class="text-center">Titles</h1>

    <div class="grid">
      <div class="col-6">
        <p>
          Our datababase contains information about the titles held by the
          persons. If you click on a row, you will get details about the
          selected title (which persons held it, where and when was it granted,
          etc.).
        </p>
        <p v-show="!authStore.isAuthenticated">
          You have to be
          <Button as="router-link" label="logged in" to="/login" />logged in
          order to see the details!
        </p>
      </div>
      <div class="col-6">
        <TitlesTable
          :titles="titles"
          @rowSelect="onRowSelect"
          tabStyle="max-width: 50rem"
        />
      </div>
    </div>
    <Toast />
  </div>
</template>

<script setup>
import { useTitlesStore } from "../stores/titlesStore";
import { useAuthStore } from "../stores/auth";
const titlesstore = useTitlesStore();

const titles = ref([]);
const loaded = ref(false);
const selectedTitle = ref(null);
const authStore = useAuthStore();

const toast = useToast();

if (!titlesstore.initialized) {
  await titlesstore.fetchTitles();
}

// titles in store is an object with 2 arrays: titlestypes and titlescontinents.
titles.value = titlesstore.titles.titlestypes;
loaded.value = true;

function goToSite() {
  return navigateTo(`/title/${selectedTitle.value}`);
}

const onRowSelect = (event) => {
  // console.log("onRowSelect", event.data._id);
  if (!authStore.isAuthenticated) {
    toast.add({
      severity: "error",
      summary: "Not authenticated!",
      detail: "You have to log in to see the details!",
      life: 3000,
    });
  } else {
    selectedTitle.value = event.data._id;
    titlesstore.titleSelected(event.data._id);
    goToSite();
  }
};
</script>
