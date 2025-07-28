<script setup lang="ts">
import FilterData from '@/components/FilterData.vue'
import RankingData from '@/components/RankingData.vue'
</script>

<template>
  <main class="mx-auto mt-6 px-12 md:w-10/12">
    <section>
      <RankingData />
      <!-- <div class="w-fit hidden"> -->
      <FilterData />
      <!-- </div> -->
    </section>
  </main>
</template>
