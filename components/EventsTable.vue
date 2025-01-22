<template>
  <div>
    <DataTable
      :value="events"
      paginator
      v-model:filters="filters"
      @rowSelect="onRowSelect"
      stripedRows
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      filterDisplay="row"
      selectionMode="single"
      dataKey="_id"
      tableStyle="min-width: 50rem"
    >
      <Column field="_id" header="Event" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by event"
          />
        </template>
      </Column>

      <Column field="count" header="Total" style="min-width: 3rem" sortable />
    </DataTable>
  </div>
  <Toast />
</template>

<script setup>
import { useEventsStore } from "../stores/eventsStore";
import { useAuthStore } from "../stores/auth";
import { FilterMatchMode } from "@primevue/core/api";

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

const filters = ref({
  _id: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>
