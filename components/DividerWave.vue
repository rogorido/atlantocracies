<template>
  <div>
    <div class="custom-shape-divider-wave-top">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.custom-shape-divider-wave-top {
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-wave-top svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 85px;
}

.custom-shape-divider-wave-top .shape-fill {
  fill: #e9dd52;
}

@media (max-width: 768px) {
  .custom-shape-divider-wave-top svg {
    height: 40px;
  }
}
</style>
