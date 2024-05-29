<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Style, Fill, Stroke, Circle as CircleStyle } from "ol/style";
import { fromLonLat } from "ol/proj";
import Overlay from "ol/Overlay";

const props = defineProps({
  places: { type: Array, required: true },
  coordenadas: { type: Array, required: true },
  multipoint: { type: Boolean, required: true },
});

const mapContainer = ref(null);
const popupContent = ref(null);
const overlay = ref(null);

onMounted(() => {
  const features = props.places.map((item) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat(item.coords)),
      place: item.place,
      totalbirths: item.totalbirths,
      totaldeaths: item.totaldeaths,
      totalevents: item.totalevents,
      totalpositions: item.totalpositions,
      totalrelations: item.totalrelations,
      totalplaces: item.totalplaces,
    });
    return feature;
  });

  const vectorSource = new VectorSource({
    features: features,
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({ color: "rgba(255, 0, 0, 0.5)" }),
        stroke: new Stroke({ color: "#ff0000", width: 1 }),
      }),
    }),
  });

  const map = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      vectorLayer,
    ],
    view: new View({
      center: fromLonLat([0, 0]),
      zoom: 2,
    }),
  });

  const popup = document.createElement("div");
  popup.className = "ol-popup";
  popupContent.value = document.createElement("div");
  popup.appendChild(popupContent.value);
  overlay.value = new Overlay({
    element: popup,
    positioning: "bottom-center",
    stopEvent: false,
    offset: [0, -10],
  });
  map.addOverlay(overlay.value);

  map.on("pointermove", (event) => {
    const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => {
      return feature;
    });

    if (feature) {
      const coordinates = feature.getGeometry().getCoordinates();
      overlay.value.setPosition(coordinates);
      popupContent.value.innerHTML = `
            <strong>${feature.get("place")}</strong><br/>
            Total: ${feature.get("totalplaces")}<br/>
            Total births: ${feature.get("totalplaces")}<br/>
            Total deaths: ${feature.get("totaldeaths")}<br/>
            Total events: ${feature.get("totalevents")}<br/>
            Total relations: ${feature.get("totalrelations")}<br/>
            Total positions: ${feature.get("totalpositions")}<br/>
          `;
      popup.style.display = "block";
    } else {
      popup.style.display = "none";
    }
  });
});

// TODO: cómo usarlo con lo nuevo?
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

// calculateData();
</script>

<style>
.map-container {
  width: 100%;
  height: 600px;
}

.ol-popup {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border: 1px solid #ccc;
  min-width: 100px;
  position: relative;
  bottom: 12px;
}
</style>
