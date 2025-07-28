<template>
	<svg v-bind:class="colour == 'red' ? 'rotate-0' : 'rotate-180'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
		<path v-bind:fill="colour" d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19" />
	</svg>
</template>

<script lang="ts">
export default {
  props: {
    colour: {
      type: String,
      validator: (value: string) => ['red', 'green'].includes(value),
    },
  },

  computed: {
    colorGraph() {
      return this.colour === 'red' ? '#f00' : '#00ff45'
    },
  },
}
</script>
