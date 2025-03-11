<template>
  <footer>
    <div class="institutions">
      <div>
        <a href="https://www.upo.es">
          <img
            alt="UPO"
            src="@/assets/012-25UPO_institucional_VER_fondo_oscuro.png"
          />
        </a>
      </div>

      <div>
        <a href="https://beneficiarios.fondoseuropeos-agenciaidea.es/">
          <img
            alt="Andalucía se mueve"
            src="@/assets/logo-andalucia-se-mueve-con-europa-768x381-1.png"
        /></a>
      </div>
      <div class="feder">
        <p>
          Esta web ha sido cofinanciada por Fondo Europeo de Desarrollo Regional
          (FEDER) y por la Consejería de Economía, Conocimiento, Empresas y
          Universidad, de la Junta de Andalucía, en marco del programa operativo
          FEDER Andalucía 2014-2020. Objetivo específico 1.2.3. «Fomento y
          generación de conocimiento frontera y de conocimiento orientado a los
          retos de la sociedad, desarrollo de tecnologías emergentes») en marco
          del proyecto de investigación de referencia UPO-1264973. Porcentaje de
          cofinanciación FEDER 80%.
        </p>
      </div>
      <div>
        <a
          href="https://www.juntadeandalucia.es/organismos/universidadinvestigacioneinnovacion.html"
        >
          <img alt="Junta de Andalucía" src="@/assets/logo_junta.png" />
        </a>
      </div>
      <div>
        <a
          href="https://www.europarl.europa.eu/factsheets/es/sheet/95/el-fondo-europeo-de-desarrollo-regional-feder-"
        >
          <img alt="Unión Europea - Feder" src="@/assets/UE2-1024x868-1.png" />
        </a>
      </div>
    </div>

    <!-- API and UI -->
    <div class="ownflex">
      <div>
        <a href="https://github.com/rogorido/atlantocracies"
          >AtlantoUI version</a
        >: {{ uiversion }}
      </div>
      <div>
        <NuxtLink to="/about/contact">Contact</NuxtLink>
      </div>
      <div>
        <a href="https://github.com/rogorido/apiatlantocracies">API version</a>:
        {{ stats.version }}
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useStatsStore } from "../stores/statsStore";
const config = useRuntimeConfig();
const uiversion = config.public.uiVersion;

const stats = ref({});
const statsstore = useStatsStore();

if (!statsstore.initialized) {
  await statsstore.fetchStats();
}
stats.value = statsstore.stats;
</script>

<style scoped>
footer {
  background-color: #e9dd52;
  padding: 2rem;
}

.ownflex {
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  max-width: 1200px;
  display: flex;
  margin: 0 auto;
}

.institutions {
  display: flex;
  /*   justify-content: space-evenly; */
  justify-content: center;
  gap: 1rem;
  align-items: center;
  padding: 0 1rem;
  /*   flex-wrap: wrap; */
}

.institutions .feder {
  flex: 2;
  /*   color: white; */
  font-size: 0.8rem;
}

.institutions .feder p {
  max-width: 100%;
}

/* .institutions > * {
  flex: 1;
} */

.institutions > * {
  flex: 0 1 150px;
}

a {
  text-decoration: none;
}

img {
  max-width: 100%;
}
</style>
