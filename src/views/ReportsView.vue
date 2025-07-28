<script setup lang="ts">
import FilterData from '@/components/FilterData.vue'
import RankingData from '@/components/RankingData.vue'
</script>

<template>
  <main class="w-[500px] mt-6 md:w-10/12 md:mx-auto overflow-hidden mx-auto">
    <section>
      <RankingData />
      <FilterData class="px-16 md:px-0" />
    </section>
  </main>
</template>
