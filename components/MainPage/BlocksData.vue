<template>
  <div class="grid">
    <div class="col-12 lg:col-5">
      <div class="flex showdata">
        <div>Total persons:</div>
        <div class="numero">
          {{ stats.totalPersons != null ? stats.totalPersons : 0 }}
        </div>
      </div>
      <div class="flex showdata">
        <div>Total places</div>
        <div class="numero">
          {{ stats.totalPlaces != null ? stats.totalPlaces : 0 }}
        </div>
      </div>

      <div class="flex showdata">
        <div>Total type of positions</div>
        <div class="numero">
          {{ stats.totalPositions != null ? stats.totalPositions : 0 }}
        </div>
      </div>

      <div class="flex showdata">
        <div>Total type of events</div>
        <div class="numero">
          {{ stats.totalEvents != null ? stats.totalEvents : 0 }}
        </div>
      </div>

      <div class="flex showdata">
        <div>Total type of relations</div>
        <div class="numero">
          {{ stats.totalRelations != null ? stats.totalRelations : 0 }}
        </div>
      </div>

      <div class="flex showdata">
        <div>Total type of titles</div>
        <div class="numero">
          {{ stats.totalTitles != null ? stats.totalTitles : 0 }}
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-7">
      <h2 class="text-center uppercase">Atlantocracies</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
        aspernatur maiores id quo corporis in molestiae magni dignissimos porro
        vel eos nemo quas, doloremque asperiores quod repudiandae aperiam
        possimus sed! Fugiat ea dolorum deleniti suscipit maiores, labore
        quisquam praesentium eius assumenda sapiente optio nisi tenetur
        officiis. Explicabo fuga, esse delectus officiis perspiciatis odit sunt
        asperiores architecto laudantium, reiciendis deleniti ad? Distinctio
        dolorem officia vel voluptates adipisci repudiandae consequuntur maxime
        vitae quisquam a veniam non quam ex perferendis reprehenderit,
        voluptatem natus. Quibusdam, voluptate! Expedita enim harum consequatur
        beatae id sint deserunt?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
        aspernatur maiores id quo corporis in molestiae magni dignissimos porro
        vel eos nemo quas, doloremque asperiores quod repudiandae aperiam
        possimus sed! Fugiat ea dolorum deleniti suscipit maiores, labore
        quisquam praesentium eius assumenda sapiente optio nisi tenetur
        officiis. Explicabo fuga, esse delectus officiis perspiciatis odit sunt
        asperiores architecto laudantium, reiciendis deleniti ad? Distinctio
        dolorem officia vel voluptates adipisci repudiandae consequuntur maxime
        vitae quisquam a veniam non quam ex perferendis reprehenderit,
        voluptatem natus. Quibusdam, voluptate! Expedita enim harum consequatur
        beatae id sint deserunt?
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ stats: { type: Object, required: true } });
</script>

<style scoped>
.numero {
  font-size: 1.9rem;
  color: #fff;
  background-color: #af2f14;
  width: 50px;
  border-radius: 50% 20% / 10% 40%;
  text-align: right;
}

.showdata {
  border: 3px dashed var(--primary-color);
  padding: 10px;
  justify-content: space-between;
  font-size: 1.8rem;
  align-items: center;
  margin-bottom: 10px;
}
</style>
