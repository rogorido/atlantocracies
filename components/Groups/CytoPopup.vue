<template>
  <div class="popup" :style="style">
    <button class="close-btn" @click="$emit('close')">&times;</button>
    <p><strong>ID:</strong> {{ data.id }}</p>
    <p><strong>Label:</strong> {{ data.label }}</p>
    <p><strong>Other Field:</strong> {{ data.otherField }}</p>
  </div>
</template>

<script setup>

const props = defineProps(
  {
    data: {
      type: Object,
      required: true
    },
    style: {
      type: Object,
      required: true
    }
  })
</script>

<style scoped>
.popup {
  position: absolute;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  z-index: 1000;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}
</style>
