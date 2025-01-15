import { useFilterStore } from "@/stores/filterStore";

/**
 * Function for managing selection based on multiselect option.
 *
 * @param {boolean} typeoffield - Flag indicating if multiselect is enabled or not
 * @return {Object} Object containing items, selectedItems, and filter.
 */
export const useSelectManagement = (typeoffield) => {
  const storefilter = useFilterStore();
  const { filter } = storeToRefs(storefilter);

  const items = ref([]);
  const selectedItems = ref();

  // es mejor que watch(filter)
  // https://pinia.vuejs.org/core-concepts/state.html
  // NOTE: esto funciona cuando hacemos un reset o cuando se borra completamente
  // un filtro y se queda en cero. Dependiendo del tipo de campo hay que hacer una cosa u otra.
  storefilter.$subscribe((mutation, state) => {
    if (Object.keys(storefilter.filter).length === 0) {
      if (typeoffield === "multiselect") {
        selectedItems.value = [];
      } else if (typeoffield === "options") {
        selectedItems.value = "All";
      } else if (typeoffield === "dates") {
        selectedItems.value = [1400, 1900];
      }
    }
  });

  return { items, selectedItems, filter };
};
