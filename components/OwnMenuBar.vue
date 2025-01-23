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
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useConfirm } from "primevue/useconfirm";

const authStore = useAuthStore();

const confirm = useConfirm();
const toast = useToast();

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
  {
    label: "Login",
    icon: "pi pi-users",
    route: "/login",
  },
]);

onMounted(() => {
  authStore.checkAuth();

  if (authStore.isAuthenticated) {
    const lastitem = {
      label: "Logout",
      icon: "pi pi-users",
      command: confirmlogout,
    };

    items.value.splice(items.value.length - 1, 1, lastitem);
  }
});

authStore.$subscribe((mutation, state) => {
  console.log("ha cambiado");

  let lastitem = {};

  if (authStore.isAuthenticated) {
    lastitem = {
      label: "Logout",
      icon: "pi pi-users",
      command: confirmlogout,
    };
  } else {
    lastitem = {
      label: "Login",
      icon: "pi pi-users",
      route: "/login",
    };
  }

  items.value.splice(items.value.length - 1, 1, lastitem);
});

const confirmlogout = () => {
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Log out",
    },
    accept: () => {
      authStore.logout();
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "You have been logged out.",
        life: 3000,
      });
    },
    reject: () => {},
  });
};
</script>

<style scoped>
.p-menubar {
  position: sticky;
  top: 0;
  z-index: 1;
  justify-content: center;
}
</style>
