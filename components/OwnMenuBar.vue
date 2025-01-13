<template>
  <Menubar :model="items">
    <template #item="{ item, props, hasSubmenu }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
      <a
        v-else
        v-ripple
        :href="item.url"
        :target="item.target"
        v-bind="props.action"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
      </a>
    </template>
  </Menubar>
  <nav v-if="authStore.isAuthenticated">
    <button @click="authStore.logout">Logout</button>
  </nav>
  <nav v-else class="flex gap-4">
    <NuxtLink to="/login" class="text-blue-500 hover:text-blue-600">
      Login
    </NuxtLink>
    <!-- <NuxtLink to="/signup" class="text-blue-500 hover:text-blue-600"> -->
    <!--   Sign Up -->
    <!-- </NuxtLink> -->
  </nav>
</template>

<script setup>
const authStore = useAuthStore();

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    route: "/",
  },
  {
    label: "Search",
    icon: "pi pi-search",
    route: "/search",
  },
  {
    label: "Places",
    icon: "pi pi-map",
    route: "/places",
  },
  {
    label: "Positions",
    icon: "pi pi-users",
    route: "/positions",
  },
  {
    label: "Events",
    icon: "pi pi-map",
    route: "/events",
  },
  {
    label: "Relations",
    icon: "pi pi-users",
    route: "/relations",
  },
  {
    label: "Titles",
    icon: "pi pi-users",
    route: "/titles",
  },
  {
    label: "About",
    icon: "pi pi-bullseye",
    items: [
      {
        label: "About",
        icon: "pi pi-bullseye",
        route: "/about",
        fin: true,
      },
      {
        label: "Docs",
        icon: "pi pi-wallet",
        route: "/docs",
      },
      {
        label: "Management",
        icon: "pi pi-th-large",
        route: "/management",
      },
    ],
  },
]);

onMounted(() => {
  authStore.checkAuth();
});
</script>

<style scoped>
.p-menubar {
  position: sticky;
  top: 0;
  z-index: 1;
  justify-content: center;
}
</style>
