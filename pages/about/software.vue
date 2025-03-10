<template>
  <div class="p-container">
    <h1 class="text-center">About the sofware</h1>

    <section>
      <div class="grid oferta">
        <div class="col-12 md:col-6 imageshown">
          <img
            src="@/assets/svg/pattern_03.svg"
            alt="houses"
            style="border-radius: 10% 30% 50% 70%"
          />
        </div>
        <div class="col-12 md:col-6 descriptionshown">
          <h2 class="text-center">Our software</h2>
          <p>The code used for this page has two aspects:</p>
          <ul>
            <li>
              Application Programming Interface (API) which communicates with
              the MongoDB where the data are stored. The API is written in
              javascript and is run under
              <a href="https://nodejs.org/">Nodejs</a>. The code is released
              under the
              <a href="https://www.gnu.org/licenses/agpl-3.0.html"
                >GNU Affero General Public License</a
              >
              (version 3.0) and is accesible
              <a href="https://github.com/rogorido/apiatlantocracies">here</a>.
            </li>
            <li>
              This website is programmed using the framework
              <a href="https://nuxt.com">Nuxtjs</a>, which is based on
              <a href="https://vuejs.com">Vuejs</a>. The code is released under
              the
              <a href="https://www.gnu.org/licenses/gpl-3.0.html"
                >GNU General Public License</a
              >
              (version 3.0) and is accesible
              <a href="https://github.com/rogorido/atlantocracies">here</a>.
            </li>
          </ul>
        </div>
      </div>

      <div class="grid oferta">
        <div class="col-12 md:col-6 imageshown">
          <img
            src="@/assets/svg/pattern_04.svg"
            alt="houses"
            style="border-radius: 10% 30% 50% 70%"
          />
        </div>
        <div class="col-12 md:col-6 descriptionshown">
          <h2 class="text-center">Sofware used</h2>

          <p>In the present page we have used the following software:</p>
          <ul>
            <li>
              As already noted, this website is programmed using the framework
              <a href="https://nuxt.com">Nuxtjs</a>, which is based on
              <a href="https://vuejs.com">Vuejs</a>.
            </li>
            <li>
              We use the library
              <a href="https://www.chartjs.org/">Chartjs</a> for our charts.
            </li>
            <li>
              We use the library
              <a href="https://openlayers.org/">Openlayers</a> for our maps.
            </li>
            <li>
              We use the library
              <a href="https://cytoscape.org/">Cytoscape</a> for visualizing
              networks and the
              <a href="https://github.com/iVis-at-Bilkent/cytoscape.js-fcose"
                >fcose algorithm</a
              >.
            </li>
            <li>
              We use the library
              <a href="https://primevue.org/">Primevue</a> for UI components.
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
img {
  height: 300px;
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
