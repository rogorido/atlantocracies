<template>
  <section>
    <h2 class="text-center">Explore our page</h2>

    <div class="grid oferta" @click="goToSite('/sections')">
      <div class="col-12 md:col-6 imageshown">
        <img
          src="@/assets/svg/pattern_03.svg"
          alt="houses"
          style="border-radius: 10% 30% 50% 70%"
        />
      </div>
      <div class="col-12 md:col-6 descriptionshown">
        <h3>Macrofilter</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
          voluptas optio impedit quibusdam quaerat numquam aut, aperiam
          dignissimos eius. Expedita, omnis quam accusamus quaerat voluptatum
          perspiciatis aperiam quo veritatis distinctio.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
          voluptas optio impedit quibusdam quaerat numquam aut, aperiam
          dignissimos eius. Expedita, omnis quam accusamus quaerat voluptatum
          perspiciatis aperiam quo veritatis distinctio.
        </p>
      </div>
    </div>

    <div class="grid oferta" @click="goToSite('/sections')">
      <div class="col-12 md:col-6 imageshown">
        <img
          src="@/assets/svg/pattern_04.svg"
          alt="houses"
          style="border-radius: 10% 30% 50% 70%"
        />
      </div>
      <div class="col-12 md:col-6 descriptionshown">
        <h3>Macrofilter</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
          voluptas optio impedit quibusdam quaerat numquam aut, aperiam
          dignissimos eius. Expedita, omnis quam accusamus quaerat voluptatum
          perspiciatis aperiam quo veritatis distinctio.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
          voluptas optio impedit quibusdam quaerat numquam aut, aperiam
          dignissimos eius. Expedita, omnis quam accusamus quaerat voluptatum
          perspiciatis aperiam quo veritatis distinctio.
        </p>
      </div>
    </div>

    <div class="grid oferta" @click="goToSite('/sections')">
      <div class="col-12 md:col-6 imageshown">
        <img
          src="@/assets/svg/pattern_05.svg"
          alt="houses"
          style="border-radius: 10% 30% 50% 70%"
        />
      </div>
      <div class="col-12 md:col-6 descriptionshown">
        <h3>Places</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
          voluptas optio impedit quibusdam quaerat numquam aut, aperiam
          dignissimos eius. Expedita, omnis quam accusamus quaerat voluptatum
          perspiciatis aperiam quo veritatis distinctio.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
          voluptas optio impedit quibusdam quaerat numquam aut, aperiam
          dignissimos eius. Expedita, omnis quam accusamus quaerat voluptatum
          perspiciatis aperiam quo veritatis distinctio.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToSite = (site) => {
  router.push(site);
};
</script>

<style lang="scss" scoped>
img {
  height: 300px;
}

@media (min-width: 701px) {
  .oferta:nth-of-type(2n) {
    .imageshown {
      order: 2;
    }
    .descriptionshown {
      order: 1;
    }
  }
}

@media (max-width: 700px) {
  .oferta {
    flex-direction: column;
    .imageshown {
      order: 1;
    }
    .descriptionshown {
      order: 2;
      padding-top: 20px;
    }
  }

  .q-img {
    height: 300px;
  }
}
</style>
