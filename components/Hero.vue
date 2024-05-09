<template>
  <div class="contenedor">
    <div class="wrap">
      <div class="box">
        <span>Escucha ahora...</span>
        <h1>NUESTRO NUEVO PODCAST</h1>
        <p>
          Lorem, ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
          dolore ea aut fugit officiis nesciunt nulla, voluptate perferendis
          maiores!.
        </p>
        <div class="botones">
          <a href="#" class="btn1">Suscríbete</a>
          <a href="#" class="btn2">Escúchalo</a>
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
  background-image: url("art-institute-of-chicago-YdNZ9iHXUbo-unsplash.jpg");
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
  color: #fff;
  text-align: left;
  align-self: center;
}
.contenedor .wrap .box span {
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 300;
}
.contenedor .wrap .box h1 {
  font-size: 32px;
  line-height: 0.9;
  padding-bottom: 10px;
}
.contenedor .wrap .box p {
  font-size: 15px;
  line-height: 1.2;
}
.contenedor .wrap .box .botones {
  display: flex;
  margin-top: 30px;
  flex-flow: row wrap;
}
.contenedor .wrap .box .botones .btn1 {
  flex-basis: 30%;
  border: solid 2px;
  border-radius: 20px;
  padding: 10px 30px 10px 30px;
  margin-right: 20px;
  text-align: center;
  text-decoration: none;
  color: #fff;
}
.contenedor .wrap .box .botones .btn2 {
  flex-basis: 30%;
  background-color: #fff;
  border: solid 2px;
  border-radius: 20px;
  padding: 10px 30px 10px 30px;
  text-align: center;
  text-decoration: none;
  color: #000;
}
</style>
