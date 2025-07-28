<template>
  <svg
    v-if="typeFeedback === 'success'"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <mask id="lineMdFolderCheck0">
      <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path
          stroke-dasharray="64"
          stroke-dashoffset="64"
          d="M12 7h8c0.55 0 1 0.45 1 1v10c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-11Z"
        >
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.57s" values="64;0" />
        </path>
        <path d="M12 7h-9v0c0 0 0.45 0 1 0h6z" opacity="0">
          <animate
            fill="freeze"
            attributeName="d"
            begin="0.57s"
            dur="0.19s"
            values="M12 7h-9v0c0 0 0.45 0 1 0h6z;M12 7h-9v-1c0 -0.55 0.45 -1 1 -1h6z"
          />
          <set fill="freeze" attributeName="opacity" begin="0.57s" to="1" />
        </path>
        <path
          fill="#000"
          fill-opacity="0"
          stroke="none"
          d="M19 13c3.31 0 6 2.69 6 6c0 3.31 -2.69 6 -6 6c-3.31 0 -6 -2.69 -6 -6c0 -3.31 2.69 -6 6 -6Z"
        >
          <set fill="freeze" attributeName="fill-opacity" begin="0.76s" to="1" />
        </path>
        <path stroke-dasharray="10" stroke-dashoffset="10" d="M16 19l1.75 1.75l3.75 -3.75">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.76s"
            dur="0.19s"
            values="10;0"
          />
        </path>
      </g>
    </mask>
    <rect width="24" height="24" fill="#5ee9b5" mask="url(#lineMdFolderCheck0)" />
  </svg>


	<svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<g fill="none" stroke="#fb5a5a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
			<path stroke-dasharray="64" stroke-dashoffset="64" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z">
				<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.57s" values="64;0" />
			</path>
			<path stroke-dasharray="16" stroke-dashoffset="16" d="M9 10c0 -1.66 1.34 -3 3 -3c1.66 0 3 1.34 3 3c0 0.98 -0.47 1.85 -1.2 2.4c-0.73 0.55 -1.3 0.6 -1.8 1.6">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.57s" dur="0.19s" values="16;0" />
			</path>
			<path stroke-dasharray="2" stroke-dashoffset="2" d="M12 17v0.01">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.76s" dur="0.19s" values="2;0" />
			</path>
		</g>
	</svg>


</template>

<script lang="ts">
export default {
  props: {
    typeFeedback: String,
  },
}
</script>
