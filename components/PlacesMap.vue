<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 600px"
    v-if="loaded"
  >
    <ol-view
      ref="view"
      :center="center"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-multi-point
            v-if="multipoint"
            :coordinates="coordinates"
          ></ol-geom-multi-point>
          <ol-geom-point v-else :coordinates="coordinates"></ol-geom-point>
          <ol-style>
            <ol-style-circle :radius="radius">
              <ol-style-fill :color="fill"></ol-style-fill>
              <ol-style-stroke
                :color="stroke"
                :width="strokeWidth"
              ></ol-style-stroke>
            </ol-style-circle>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { boundingExtent, getCenter } from "ol/extent";

const center = ref();
const projection = ref("EPSG:4326");
const zoom = ref(3);
const radius = ref(10);
const strokeWidth = ref(10);
const stroke = ref("#ff0000");
const fill = ref("#ffffff");
const view = ref();

const coordinates = ref();
const loaded = ref(false);

const props = defineProps({
  coordenadas: { type: Array, required: true },
  multipoint: { type: Boolean, required: true },
});

// console.log(
//   "las coordendas que llegan son: ",
//   JSON.stringify(props.coordenadas, null, 2)
// );

// console.log(loaded.value);

const calculateData = () => {
  if (props.multipoint) {
    coordinates.value = props.coordenadas;

    // Calcular the bounding box and its center
    const boundingBox = boundingExtent(coordinates.value);
    center.value = getCenter(boundingBox);

    loaded.value = true;
  } else {
    coordinates.value = props.coordenadas[0];
    center.value = props.coordenadas[0];

    loaded.value = true;
  }
};

calculateData();
</script>
