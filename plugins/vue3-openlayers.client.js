import OpenLayersMap from "vue3-openlayers";

export default defineNuxtPlugin((app) => {
  app.vueApp.use(OpenLayersMap);
});
