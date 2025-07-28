<script lang="ts">
import { RouterView } from 'vue-router'
import WeatherGreetings1 from '@/components/WeatherGreetings1.vue';
export default {
  components: {
    WeatherGreetings1,
    RouterView,
  },
}
</script>

<template>
  <header class="sticky top-0 backdrop-blur-2xl z-20">
    <WeatherGreetings1 />
  </header>
  <RouterView />
</template>
