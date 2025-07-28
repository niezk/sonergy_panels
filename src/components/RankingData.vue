<template>
  <div class="grid md:flex mb-10 justify-center m-2 w-fit gap-5 border border-amber-300 bg-amber-50 rounded-lg p-5 lg:pr-0 lg:gap-2 mx-auto">
    <div class="flex items-center w-fit">
      <span class="relative flex size-5">
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-600 opacity-75"
        ></span>
        <span class="relative inline-flex size-5 rounded-full bg-amber-500"></span>
      </span>
      <div class="mx-3">
        <h1 class="lg:h-4 text-sm font-light">Highest Voltage</h1>
        <p class="text-xl text-zinc-600 font-mono">12</p>
      </div>
    </div>

    <div class="flex items-center w-fit md:mx-3">
      <span class="relative flex size-5">
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-600 opacity-75"
        ></span>
        <span class="relative inline-flex size-5 rounded-full bg-emerald-500"></span>
      </span>
      <div class="mx-3">
        <h1 class="text-sm font-light ">Highest Billing(Month)</h1>
        <p class="lg:h-4 text-xl text-zinc-600 font-mono">Rp. 1.950.345</p>
      </div>
    </div>

    <div class="flex items-center w-fit">
      <span class="relative flex size-5">
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-600 opacity-75"
        ></span>
        <span class="relative inline-flex size-5 rounded-full bg-fuchsia-500"></span>
      </span>
      <div class="mx-3">
        <h1 class="text-sm font-light">Highest Consumption (kWh)</h1>
        <p class="lg:h-4 text-xl text-zinc-600 font-mono">92</p>
      </div>
    </div>
  </div>
</template>
