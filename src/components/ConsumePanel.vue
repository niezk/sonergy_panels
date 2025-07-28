<template>
  <div
    id="avarage_card"
    class="border-[0.1px] text-black rounded-md p-2 "
    :class="typeRaise ? 'border-red-300 bg-rose-50' : 'border-green-300 bg-emerald-50'"
  >
    <h1 class="font-extralight">{{ typeCosume.toLocaleLowerCase() }}'s consume</h1>
    <div class="flex justify-between py-2 items-start font-light">
      <h3 class="text-3xl my-auto font-sans ">
        {{ valueConsume }}<span class="text-sm font-normal"> kWh</span>
      </h3>
      <div class="flex items-center md:pl-8">
        <p
          class="font-extralight text-sm my-auto font-sans"
          :class="typeRaise ? 'text-red-600' : 'text-green-600'"
        >
          {{ valueRaise }}%
        </p>
        <Graph v-bind:colour="raiseMode" class="my-auto mx-1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Graph from '../components/icons/GraphDummy.vue'

export default {
  components: {
    Graph,
  },

  props: {
    typeCosume: {
      type: String,
      default: 'today',
      validator: (value: string) => ['today', 'monthly', 'annual'].includes(value),
    },
    valueConsume: {
      type: Number,
      default: 647,
    },
    valueRaise: {
      type: Number,
      default: 0.6,
    },
    typeRaise: {
      type: Boolean, // 1 (red) 0 (green)
      default: true,
    },
  },

  computed: {
    raiseMode() {
      return this.typeRaise ? 'red' : 'green' //
    },
  },
}
</script>

<style></style>
