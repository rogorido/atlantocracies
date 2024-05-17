import { useFilterStore } from "@/stores/filterStore";

export const useSelectManagement = () => {
  const storefilter = useFilterStore();
  const { filter } = storeToRefs(storefilter);

  const items = ref([]);
  const selectedItems = ref();

  // es mejor que watch(filter)
  // https://pinia.vuejs.org/core-concepts/state.html
  storefilter.$subscribe((mutation, state) => {
    if (Object.keys(storefilter.filter).length === 0) {
      selectedItems.value = [];
    }
  });

  return { items, selectedItems, filter };
};
