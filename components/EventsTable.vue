<template>
  <div>
    <DataTable
      :value="events"
      paginator
      @rowSelect="onRowSelect"
      stripedRows
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      selectionMode="single"
      dataKey="_id"
      tableStyle="min-width: 50rem"
    >
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      ></Column>
    </DataTable>
  </div>
  <Toast />
</template>

<script setup>
import { useEventsStore } from "../stores/eventsStore";
import { useAuthStore } from "../stores/auth";

const eventsstore = useEventsStore();

const authStore = useAuthStore();

const events = ref([]);
const loaded = ref(false);
const selectedEvent = ref(null);

const toast = useToast();

if (!eventsstore.initialized) {
  await eventsstore.fetchEvents();
}

events.value = eventsstore.events;
loaded.value = true;
// console.log(events.value);

function goToSite() {
  return navigateTo(`/event/${selectedEvent.value}`);
}

const onRowSelect = (e) => {
  if (!authStore.isAuthenticated) {
    toast.add({
      severity: "error",
      summary: "Not authenticated!",
      detail: "You have to log in to see the details!",
      life: 3000,
    });
  } else {
    selectedEvent.value = e.data._id;
    eventsstore.eventSelected(e.data._id);
    goToSite();
  }
};

const columns = [
  { field: "_id", header: "Event" },
  { field: "count", header: "Total" },
];
</script>
