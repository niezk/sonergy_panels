<template>
  <nav class="shadow-sm">
    <div id="greet-weather" class="mt-1 mx-4 py-2 rounded-2xl flex items-center justify-between">
      <div class="flex items-center">
        <IconSunny class="mr-2" />
        <div>
          <p class="h-3 font-extralight text-sm">Morning, Elaina</p>
          <h1 class="text-lg">Sunny 20&deg;C</h1>
        </div>
      </div>
      <div class="flex mx-3 gap-4">

        <RouterLink to="/" class="border shadow-inherit shadow border-gray-200 py-2 px-4 text-sm rounded-md hover:border-gray-400 hover:text-black text-gray-400 transition ">Home</RouterLink>
        <RouterLink to="/reports" class="border shadow-inherit shadow border-gray-200 py-2 px-4 text-sm rounded-md hover:border-gray-400 hover:text-black text-gray-400 transition ">Reports</RouterLink>

      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import IconSunny from '../components/icons/IconSunny.vue'
export default {
  components: {
    IconSunny,
    RouterLink,
  },
}
</script>
