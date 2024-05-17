import { useFilterStore } from "@/stores/filterStore";

/**
 * Function for managing selection based on multiselect option.
 *
 * @param {boolean} multiselect - Flag indicating if multiselect is enabled or not
 * @return {Object} Object containing items, selectedItems, and filter.
 */
export const useSelectManagement = (multiselect) => {
  const storefilter = useFilterStore();
  const { filter } = storeToRefs(storefilter);

  const items = ref([]);
  const selectedItems = ref();

  // es mejor que watch(filter)
  // https://pinia.vuejs.org/core-concepts/state.html
  storefilter.$subscribe((mutation, state) => {
    if (Object.keys(storefilter.filter).length === 0) {
      if (multiselect) {
        selectedItems.value = [];
      } else {
        selectedItems.value = "All";
      }
    }
  });

  return { items, selectedItems, filter };
};
