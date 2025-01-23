<template>
  <DataTable
    :value="positions"
    paginator
    stripedRows
    :rows="10"
    filterDisplay="row"
    v-model:filters="filters"
    @rowSelect="onRowSelect"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    selectionMode="single"
    dataKey="_id"
  >
    <Column field="_id" header="Title" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          class="p-column-filter"
          placeholder="Search by position"
        />
      </template>
    </Column>

    <Column field="count" header="Total" style="min-width: 3rem" sortable />
  </DataTable>
  <Toast />
</template>

<script setup>
import { usePositionsStore } from "../stores/positionsStore";
import { useAuthStore } from "../stores/auth";
import { FilterMatchMode } from "@primevue/core/api";

const positionsstore = usePositionsStore();
const authStore = useAuthStore();

const toast = useToast();

const selectedPosition = ref(null);

const props = defineProps({
  positions: {
    type: Array,
    required: true,
    default: () => [],
  },
});

function goToSite() {
  return navigateTo(`/position/${selectedPosition.value}`);
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
    selectedPosition.value = e.data._id;
    positionsstore.positionSelected(e.data._id);
    goToSite();
  }
};

const filters = ref({
  _id: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>
