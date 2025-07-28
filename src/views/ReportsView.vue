<script setup lang="ts">
import FilterData from '@/components/FilterData.vue'
import RankingData from '@/components/RankingData.vue'
</script>

<template>
  <main class="responsive-main mt-6 md:w-10/12 md:mx-auto overflow-hidden mx-auto">
    <section>
      <RankingData />
      <FilterData class="px-9 lg:px-12" />
    </section>
  </main>
</template>

<style>
/* Default: let Tailwind handle layout */

/* If screen width is less than 375px, fix main width to 375px */
@media screen and (max-width: 374px) {
  .responsive-main {
    width: 375px;
  }
}

/* If screen width is 390px or more, allow full width */
@media screen and (min-width: 375px) {
  .responsive-main {
    width: 100vw;
  }
}
</style>
