<template>
  <main class="mt-2">
    <!-- Mobile & Desktop Container -->
    <div class="mx-4 md:mx-8 lg:mx-auto lg:max-w-7xl">
      <section>
        <h1 class="font-extralight text-3xl my-5 text-center">avarage consumption</h1>
        <!-- Mobile: Block layout, Desktop: Flex layout -->
        <div class="mx-4 block lg:flex md:justify-center gap-4 my-2 md:mb-6">
          <div class="flex my-2 gap-4">
            <ConsumePanel class="mb-4 md:mb-0 w-10/12 lg:w-auto" />
            <ConsumePanel
              class="mb-4 md:mb-0 w-10/12 lg:w-auto"
              type-cosume="weekly"
              :value-consume="900"
              :value-raise="0.2"
              :type-raise="false"
            />
          </div>
          <div class="flex my-2 gap-4">
            <ConsumePanel
              class="mb-4 md:mb-0 w-10/12 lg:w-auto"
              type-cosume="monthly"
              :value-consume="1700"
              :value-raise="1.8"
              :type-raise="false"
            />
            <ConsumePanel
              class="mb-4 md:mb-0 w-10/12 lg:w-auto"
              type-cosume="annual"
              :value-consume="3000"
              :value-raise="1.2"
              :type-raise="true"
            />
          </div>
        </div>
      </section>

      <!-- Main Content Area -->
      <div class="mx-4">
        <div class="block lg:flex lg:gap-6">
          <!-- Chart Section -->
          <section
            id="monitor1"
            class="border-[0.1px] border-gray-400 bg-transparent backdrop-blur-3xl pb-6 rounded-md mb-4 lg:mb-0 lg:flex-1 w-full"
          >
            <div class="px-4 mt-3">
              <ElectricChart :data-type="'consume'" :chart-color="'#2563eb'" />
            </div>
          </section>
          <!-- Status Card -->
        </div>
        <GoalSavings class="w-full my-4" />
        <ChartCompare />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import GoalSavings from '../components/GoalsSavingEnergy.vue'
import ElectricChart from '../components/ChartDummy.vue' // Your chart component
import ConsumePanel from '../components/ConsumePanel.vue'
import ChartCompare from '@/components/ChartCompare.vue';

export default {
  components: {
    ChartCompare,
    ConsumePanel,
    GoalSavings,
    ElectricChart,
  },
}
</script>

<style lang="css" scoped>
#monitor {
  box-shadow: 0px 8px 32px -1px rgba(0, 0, 0, 0.02);
  -webkit-box-shadow: 0px 8px 32px -1px rgba(0, 0, 0, 0.02);
  -moz-box-shadow: 0px 8px 32px -1px rgba(0, 0, 0, 0.02);
  background-color: rgb(255, 255, 255, 0.7);
}

/* Smooth transitions for period selector */
.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Ensure chart container is responsive */
.w-full {
  width: 100%;
}

#monitor2 {
  background: #00ff00;
  background: linear-gradient(11deg, rgba(0, 255, 0, 0.073) 0%, rgba(255, 255, 255, 1) 66%);
}

#monitor1 {
  background: #00ffd4;
  background: linear-gradient(25deg, rgba(75, 111, 212, 0.073) 0%, rgba(255, 255, 255, 1) 60%);
}


</style>
