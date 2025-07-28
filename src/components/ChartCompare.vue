<template>
  <h1>Data Versus</h1>
  <div class="w-full h-screen">
    <p>copmare data panel</p>
    <div class="flex">
      <div class="flex-1 p-2 items-center">
        <div
          class="border-2 border-gray-500 border-dashed rounded-lg w-full text-center p-12 cursor-pointer mx-auto mt-5"
          @click="inputOpen"
        >
          <h3 class="text-xl">Add Data</h3>
          <p class="text-sm text-extralight text-gray-400">Choose your data(s)</p>
        </div>
        <Charts ref="chart" :series="series" :options="chartOptions" height="400px" class="ml-12 lg:m-0" />
        <div>
          <div v-if="series.length > 0" class="scale-90">
            <!-- Query Switch Buttons -->
            <div class="flex justify-center gap-4 mb-6 -mt-24 lg:mt-0">
              <button
                @click="selectedQueryIndex = 0"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  selectedQueryIndex === 0
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                Bill (Rupiah)
              </button>
              <button
                @click="selectedQueryIndex = 1"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  selectedQueryIndex === 1
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                Consume (kWh)
              </button>
              <button
                @click="selectedQueryIndex = 2"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  selectedQueryIndex === 2
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                Highest voltage
              </button>
            </div>

            <!-- Data Display -->
            <div class="flex justify-center">
              <h1
                v-for="(item, index) in series"
                :key="index"
                class="mb-4 rounded-lg"
                :style="{ color: compareID[index]?.color || '#000' }"
              >
                {{ formatValue(item.data[selectedQueryIndex]) }}
                <span class="text-gray-600 mx-3" v-if="index < series.length - 1"> | </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Modal -->
    <div
      v-if="showModal"
      @click="showModal = false"
      class="fixed inset-0 bg-transparent backdrop-blur-sm 50 flex items-center justify-center z-50 drop-shadow-xl"
    >
      <div class="bg-white rounded-lg p-6 w-80" @click.stop>
        <h3 class="text-lg font-medium mb-4">Compare List</h3>
        <div v-if="compareID.length > 0">
          <div
            class="border border-dashed p-3 rounded-xl my-3 relative"
            v-for="(item, index) in compareID"
            :key="index"
          >
            <!-- Remove button -->

            <div class="flex justify-between mb-1 lg:mb-3 ">
              <input
                class="text-lg mb-3 border-b-1"
                type="text"
                placeholder="Series ID"
                :value="item.name"
                :style="{ color: item.color }"
              />
              <input
                type="color"
                v-model="item.color"
                class="rounded-full border-none bg-transparent appearance-none w-[20px] h-[20px]"
              />
            </div>
            <div class="flex items-center justify-center ml-6">
              <input type="date" v-model="item.dateStart" class="lg:ml-1" />
              <input type="date" v-model="item.dateEnd" />
            </div>
            <div class="flex justify-between items-center mt-6">
              <p
                v-if="convertUnix(item.dateStart) <= convertUnix(item.dateEnd)"
                class="text-gray-500 text-sm px-3 py-1"
              >
                {{ diffDays(item.dateStart, item.dateEnd) }} day(s)
              </p>
              <p v-else class="text-red-500 text-sm px-3 py-1">invalid range {{ item.dateEnd }}</p>
              <button
                v-if="compareID.length > 0"
                @click="removeSeries(index)"
                class="rounded-full px-3 font-light cursor-pointer bg-red-400 hover:bg-red-600 text-white text-sm"
                title="Remove series"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div v-else class="border border-gray-400 border-dashed p-12 rounded-lg mb-5">
          <h3 class="text-center text-lg text-light text-gray-500">Please, insert a list</h3>
        </div>

        <button
          title="Add New"
          class="group cursor-pointer outline-none hover:rotate-90 duration-300 flex mx-auto my-2"
          @click="addNewSeries"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            class="stroke-zinc-400 fill-none group-hover:fill-zinc-100 group-active:stroke-zinc-200 group-active:fill-zinc-50 group-active:duration-0 duration-300"
          >
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              stroke-width="1.5"
            ></path>
            <path d="M8 12H16" stroke-width="1.5"></path>
            <path d="M12 16V8" stroke-width="1.5"></path>
          </svg>
        </button>
        <button
          class="rounded-lg bg-green-500 text-white px-3 py-1 cursor-pointer"
          @click="confirmSeries"
        >
          confirm
        </button>
      </div>
    </div>

    <!-- Bottom Modal Alert -->
    <div
      v-if="showAlert"
      class="fixed bottom-0 left-0 right-0 z-60 animate-slide-up"
    >
      <div class="bg-red-400 text-white px-6 py-4 mx-4 mb-4 rounded-lg shadow-lg flex items-center justify-between w-fit">
        <div class="flex items-center">
          <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <span>{{ alertMessage }}</span>
        </div>
        <button
          @click="closeAlert"
          class="text-white hover:text-gray-200 ml-4"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { query, collection, where, getDocs, limit, type DocumentData } from 'firebase/firestore'
import db from '@/assets/firebase-config'
import { defineComponent } from 'vue'

// Type definitions
interface CompareItem {
  name: string
  color: string
  dateStart: string
  dateEnd: string
}

interface SeriesItem {
  name: string
  data: (string | number)[]
}

interface ChartOptions {
  chart: {
    id: string
    height: number
    type: string
    toolbar: {
      autoSelected: string
      show: boolean
    }
    zoom: {
      enabled: boolean
    }
  }
  noData: {
    text: string
  }
  colors: string[]
  xaxis: {
    type: string
    categories: string[]
  }
}

export default defineComponent({
  components: {
    Charts: VueApexCharts,
  },
  data() {
    return {
      showModal: false as boolean,
      showAlert: false as boolean,
      alertMessage: '' as string,
      alertTimeout: null as number | null, // Changed from NodeJS.Timeout to number
      usageInput: '' as string,
      selectedQueryIndex: 0 as number,
      compareID: [
        {
          name: 'Change Me!',
          color: '#0000ff',
          dateStart: '',
          dateEnd: '',
        },
      ] as CompareItem[],
      series: [] as SeriesItem[],
      chartOptions: {
        chart: {
          id: 'chart2',
          height: 400,
          type: 'radar',
          toolbar: {
            autoSelected: 'selection',
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        noData: {
          text: 'No data provide',
        },
        colors: [] as string[],
        xaxis: {
          type: 'category',
          categories: ['bill (Rupiah)', 'consume', 'highest voltage'],
        },
      } as ChartOptions,
    }
  },
  computed: {
    configChart(): ChartOptions {
      return {
        chart: {
          id: 'chart2',
          height: 400,
          type: 'radar',
          toolbar: {
            autoSelected: 'selection',
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        noData: {
          text: 'No data provide',
        },
        colors: this.colorCollection,
        xaxis: {
          type: 'category',
          categories: ['bill (Rupiah)', 'consume', 'highest voltage'],
        },
      }
    },
    colorCollection(): string[] {
      return this.compareID.map((item: CompareItem) => item.color)
    },
  },
  methods: {
    inputOpen(): void {
      this.showModal = true
    },
    showModalAlert(message: string, duration: number = 5000): void {
      this.alertMessage = message
      this.showAlert = true

      // Clear any existing timeout
      if (this.alertTimeout) {
        clearTimeout(this.alertTimeout)
      }

      // Auto-hide after duration - using window.setTimeout
      this.alertTimeout = window.setTimeout(() => {
        this.showAlert = false
      }, duration)
    },
    closeAlert(): void {
      this.showAlert = false
      if (this.alertTimeout) {
        clearTimeout(this.alertTimeout)
        this.alertTimeout = null
      }
    },
    formatCustomNumber(num: number): string {
      const [intPart] = num.toString().split('.')
      const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return `${grouped}`
    },
    async confirmSeries(): Promise<void> {
      const dataCompare: SeriesItem[] = []
      // Fixed type assertion
      const chartElement = this.$refs.chart as any

      for (const item of this.compareID) {
        // Skip invalid date ranges
        if (this.convertUnix(item.dateStart) > this.convertUnix(item.dateEnd)) {
          continue
        }

        const data = await this.queryFilterData(item.dateStart, item.dateEnd)
        dataCompare.push({
          name: item.name,
          data: data,
        })
      }

      // If nothing valid, show modal alert instead of browser alert
      if (dataCompare.length === 0) {
        this.showModalAlert('No valid date ranges found in the series.')
        return
      }

      const colorColl = this.compareID.map((item: CompareItem) => item.color)

      if (chartElement && typeof chartElement.updateOptions === 'function') {
        chartElement.updateOptions({
          colors: colorColl,
        })
      }

      this.showModal = false
      this.series = dataCompare
    },
    addNewSeries(): void {
      let color = '#00bbff'
      do {
        color = '#'
        const char = '0123456789ABCDEF'
        for (let i = 0; i < 6; i++) {
          color += char[Math.floor(Math.random() * 16)]
        }
      } while (this.compareID.some((item: CompareItem) => item.color === color))

      const newSeries: CompareItem = {
        name: 'Change Me!',
        color: color,
        dateStart: '',
        dateEnd: '',
      }
      if (this.compareID.length < 4) {
        this.compareID.push(newSeries)
      } else {
        this.showModalAlert('Maximum series achieved (max: 4)')
      }
    },
    removeSeries(index: number): void {
      if (this.compareID.length > 0) {
        this.compareID.splice(index, 1)
      }
    },
    convertUnix(date: string): number {
      return new Date(date).getTime()
    },
    diffDays(start: string, end: string): number | string {
      const firstDate = this.convertUnix(start)
      const lastDate = this.convertUnix(end)
      const diff = Math.round(Math.abs((firstDate - lastDate) / 86400000))
      if (firstDate <= lastDate) {
        if (!Number.isNaN(diff)) {
          return diff
        } else {
          return 0
        }
      } else {
        return 'invalid range'
      }
    },
    async queryFilterData(start: string, end: string): Promise<(string | number)[]> {
      let bill = 0
      let voltage = 0
      let consume = 0
      const refActivity = collection(db, 'forecasting_data')
      const fromq = this.convertUnix(start)
      const endq = this.convertUnix(end)
      const q = query(
        refActivity,
        where('time', '>=', fromq),
        where('time', '<=', endq),
        limit(250),
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        const data: DocumentData = doc.data() // DocumentData is now imported
        bill += data.bill
        consume += data.consume
        if (voltage < data.voltage) {
          voltage = data.voltage
        }
      })
      return [bill, consume, voltage]
    },
    getQueryLabel(index: number): string {
      const labels = ['bill (Rupiah)', 'Consume', 'Highest voltage']
      return labels[index]
    },
    formatValue(value: string | number): string {
      if (typeof value === 'number') {
        return value.toLocaleString()
      }
      return String(value)
    },
  },
  beforeUnmount() {
    // Clean up timeout when component is destroyed
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout)
    }
  },
})
</script>

<style>
input[type='datetime-local']::-webkit-calendar-picker-indicator,
input[type='date']::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: 1;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}

input {
  box-sizing: border-box;
  outline: 0;
  position: relative;
}

input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type='color']::-webkit-color-swatch {
  border: none;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>
