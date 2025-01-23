<template>
  <header class="hero">
    <div class="hero-content">
      <h1 class="hero-title">Atlantocracies</h1>
      <p class="hero-subtitle">A brief description of your content</p>
      <div class="hero-btns">
        <a href="#" class="hero-button">Get Started</a>
        <a href="#" class="hero-button">Get Started</a>
      </div>
    </div>
  </header>
</template>

<style>
/* idea from https://codepen.io/vishaljaiswal/pen/XWGKBmK */
.hero {
  position: relative;
  /* background: url("@/assets/art-institute-of-chicago-YdNZ9iHXUbo-unsplash.jpg"); */
  background-image: url("@/assets/art-institute-of-chicago-YdNZ9iHXUbo-unsplash.jpg");
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
/*
     .hero::before {
     content: "";
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, 0.6);
     z-index: 1; 
     }
 */

.hero-content {
  text-align: center;
  color: #fff;
  /*  z-index: 2;  Ensure the content is on top of the overlay */
}

.hero-title {
  font-size: 3em;
  margin-bottom: 20px;
  letter-spacing: 3px;
  text-transform: uppercase;
  animation: fadeInUp 1s ease-in-out;
}

.hero-subtitle {
  font-size: 1.5em;
  margin-bottom: 30px;
  animation: fadeInUp 1s ease-in-out 0.5s;
}

.hero-btns {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.hero-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.2em;
  text-decoration: none;
  color: #fff;
  background-color: #3498db;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;
}

.hero-button:hover {
  background-color: #2980b9;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 1.7em;
    letter-spacing: 1px;
  }
  .hero-subtitle {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
}
</style>
