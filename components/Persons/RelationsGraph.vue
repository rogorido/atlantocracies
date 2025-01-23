<template>
  <div>
    <div id="cyto" ref="cyto"></div>
    <GroupsCytoPopup
      v-if="showPopup"
      :data="popupData"
      :style="popupStyle"
      @close="showPopup = false"
    />
  </div>
</template>

<script setup>
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";

cytoscape.use(fcose);

const props = defineProps({
  personsrelatedcyto: { type: Object, required: true, default: () => {} },
});

// Popup data and style
const showPopup = ref(false);
const popupData = reactive({
  id: "",
  label: "",
  otherField: "",
});
const popupStyle = reactive({
  top: "0px",
  left: "0px",
});

let network = null;
const cyto = ref(null);
const tiposrels = ref([]);

onMounted(() => {
  // console.log("the props are: ", JSON.stringify(props, null, 2));

  var elements = {
    nodes: props.personsrelatedcyto.nodes,
    edges: props.personsrelatedcyto.edges,
  };

  network = cytoscape({
    container: cyto.value,
    elements,
    layout: {
      name: "fcose",
    },
    style: [
      // the stylesheet for the graph
      {
        selector: "node",
        style: {
          "background-color": "#666",
          // label: "data(namePerson)",
        },
      },

      {
        selector: ".mainperson",
        style: {
          "background-color": "red",
          shape: "square",
        },
      },
      {
        selector: ".Matrimonio",
        style: { "line-color": "red", "line-style": "dashed" },
      },
      {
        selector: ".parent",
        style: { "line-color": "green", "line-style": "dashed" },
      },
    ],
  });

  network.on("tap", "node", function (evt) {
    const node = evt.target;
    popupData.id = node.data("id");
    popupData.label = node.data("label");
    popupData.otherField = node.data("otherField");
    popupData.isNode = true;

    const position = node.renderedPosition();
    const containerRect = cyto.value.getBoundingClientRect();

    // Lío q hay que hacer para que calcule teniendo en cuenta todo el DOM
    // idea de chaptgpt
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    popupStyle.top = `${position.y + containerRect.top + scrollTop}px`;
    popupStyle.left = `${position.x + containerRect.left + scrollLeft}px`;

    showPopup.value = true;
  });

  network.on("tap", "edge", function (evt) {
    const edge = evt.target;
    console.log(edge.data("id"));
    popupData.type = edge.data("type");
    // para que el popup represente una cosa u otra...
    popupData.isNode = false;

    // edges no tiene una renederPosition. Hay que calcular la media de los dos nodes.
    let position;
    const sourcePos = edge.source().renderedPosition();
    const targetPos = edge.target().renderedPosition();
    position = {
      x: (sourcePos.x + targetPos.x) / 2,
      y: (sourcePos.y + targetPos.y) / 2,
    };

    const containerRect = cyto.value.getBoundingClientRect();

    // Lío q hay que hacer para que calcule teniendo en cuenta todo el DOM
    // idea de chaptgpt
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    popupStyle.top = `${position.y + containerRect.top + scrollTop}px`;
    popupStyle.left = `${position.x + containerRect.left + scrollLeft}px`;

    showPopup.value = true;
  });

  // esto borra el popup al pulsar fuera
  network.on("tap", (event) => {
    if (event.target === network) {
      showPopup.value = false;
    }
  });

  const typeRelsValues = props.personsrelatedcyto.edges.map(
    (item) => item.data.type,
  );
  const uniqueSet = new Set(typeRelsValues);

  tiposrels.value = Array.from(uniqueSet);
});

onUnmounted(() => {
  network.removeAllListeners();
});
</script>

<style scoped>
#cyto {
  width: 800px;
  height: 400px;
  border: 1px solid lightgray;
}
</style>
