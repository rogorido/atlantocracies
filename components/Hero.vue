<template>
  <div class="contenedor">
    <div class="wrap">
      <div class="box">
        <h1>ATLANTOCRACIES</h1>
        <p>
          Lorem, ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
          dolore ea aut fugit officiis nesciunt nulla, voluptate perferendis
          maiores!.
        </p>
        <div class="botones">
          <NuxtLink to="/about" class="btn2">More information</NuxtLink>
          <NuxtLink href="/search" class="btn2">Explore our database</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.contenedor {
  display: flex;
  max-width: 100%;
  height: 30vh;
  background-image: url("@/assets/art-institute-of-chicago-YdNZ9iHXUbo-unsplash.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;
}
.contenedor .wrap {
  max-width: 1000px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: left;
}
.contenedor .wrap .box {
  flex-basis: 50%;
  color: black;
  text-align: left;
  align-self: center;
}
.contenedor .wrap .box span {
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 300;
}
.contenedor .wrap .box h1 {
  font-size: 50px;
  line-height: 0.9;
  padding-bottom: 10px;
  color: #af2f14;
  letter-spacing: 3px;
}
.contenedor .wrap .box p {
  font-size: 18px;
  line-height: 1.2;
}
.contenedor .wrap .box .botones {
  display: flex;
  margin-top: 30px;
}

.contenedor .wrap .box .botones .btn2 {
  background-color: #fff;
  border: solid 2px;
  border-radius: 20px;
  padding: 10px 30px 10px 30px;
  text-align: center;
  text-decoration: none;
  color: #000;
}
</style>
