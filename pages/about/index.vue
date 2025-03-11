<template>
  <div class="p-container">
    <h1 class="text-center">About</h1>

    <section>
      <div class="grid oferta" @click="goToSite('/about/team')">
        <div class="col-12 md:col-6 imageshown">
          <img
            src="@/assets/svg/pattern_03.svg"
            alt="houses"
            style="border-radius: 10% 30% 50% 70%"
          />
        </div>
        <div class="col-12 md:col-6 descriptionshown">
          <h3>Our Team</h3>
          <p>
            You can know more about the
            <NuxtLink to="/about/team">Team</NuxtLink> of Atlantocracies.
          </p>
        </div>
      </div>
      <div class="grid oferta" @click="goToSite('/about/software')">
        <div class="col-12 md:col-6 imageshown">
          <img
            src="@/assets/svg/pattern_04.svg"
            alt="houses"
            style="border-radius: 10% 30% 50% 70%"
          />
        </div>
        <div class="col-12 md:col-6 descriptionshown">
          <h3>Software used</h3>
          <p>
            You can know more about the
            <NuxtLink to="/about/software">software</NuxtLink> used in this
            page.
          </p>
        </div>
      </div>
      <div class="grid oferta" @click="goToSite('/about/contact')">
        <div class="col-12 md:col-6 imageshown">
          <img
            src="@/assets/svg/pattern_05.svg"
            alt="houses"
            style="border-radius: 10% 30% 50% 70%"
          />
        </div>
        <div class="col-12 md:col-6 descriptionshown">
          <h3>Contact</h3>
          <p>
            Visit our <NuxtLink to="/about/contact">contact page</NuxtLink>.
          </p>
        </div>
      </div>
    </section>
  </div>
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
  min-height: 300px;
  width: 95%;
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
