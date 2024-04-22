<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 600px"
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
          <ol-geom-multi-point :coordinates="coordinates"></ol-geom-multi-point>
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

const props = defineProps({ coordenadas: Array });

// we have to reverse the coordinates...
coordinates.value = props.coordenadas.map((coord) => coord.reverse());

// Calcular el bounding box
const boundingBox = boundingExtent(coordinates.value);

// Calcular el centro del bounding box
center.value = getCenter(boundingBox);

//view.fit(boundingBox, { duration: 2000 });
</script>
