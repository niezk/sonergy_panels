<template>
  <div class="w-full">
    <h1 class="font-extralight text-4xl text-center p-3">consume</h1>
    <div class="flex mx-auto justify-center my-5 gap-2 md:gap-3 flex-wrap">
      <div
        v-for="item in buttonTimeline"
        :key="item"
        class="hover:bg-sky-600 border border-zinc-400 px-4 md:px-6 lg:px-8 py-1 rounded-2xl text-zinc-600 font-normal cursor-pointer hover:border-white hover:text-white hover:font-extralight transition ease-in whitespace-nowrap"
        @click="updateData(item)"
      >
        {{ item }}
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="text-gray-500">Loading chart data...</div>
    </div>

    <!-- Chart renders only when data is loaded -->
    <Charts
      v-else-if="data_panels.length > 0"
      ref="chart"
      :options="configChart"
      :series="series"
      height="260px"
    />

    <!-- Error state -->
    <div v-else class="flex justify-center items-center h-64">
      <div class="text-red-500">No data available</div>
    </div>
  </div>
</template>

<script lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import api_data from '@/assets/api_data'

interface DataReport {
  time: string
  consume: number
}

export default {
  components: {
    Charts: VueApexCharts,
  },
  data() {
    return {
      data_panels: [] as DataReport[],
      data_forecast: [] as DataReport[],
      buttonTimeline: ['a day', '30 days', 'all times'],
      isLoading: true,
    }
  },
  computed: {
    series() {
      // Convert object format to ApexCharts array format [timestamp, value]
      const panelsData = this.data_panels.map(item => [
        new Date(item.time).getTime(),
        item.consume
      ])

      const forecastData = this.data_forecast.map(item => [
        new Date(item.time).getTime(),
        item.consume
      ])

      return [
        {
          name: 'Consumption',
          data: panelsData,
        },
        {
          name: 'Forecasting',
          data: forecastData,
        },
      ]
    },
    configChart() {
      const panelsData = this.data_panels.map(item => [
        new Date(item.time).getTime(),
        item.consume
      ])

      return {
        chart: {
          type: 'area',
          stacked: false,
          height: '180px',
          zoom: {
            autoScaleYaxis: true,
          },
          toolbar: {
            show: false,
            autoSelected: 'zoom',
          },
          selection: {
            xaxis: {
              min: panelsData[100] ? panelsData[100][0] : panelsData[0]?.[0],
              max: panelsData[panelsData.length - 1]?.[0],
            },
            enabled: true,
            stroke: {
              width: 1,
              dashArray: 3,
              color: '#24292e',
              opacity: 0.4,
            },
          },
        },
        tooltip: {
          y: {
            formatter: function (value: number) {
              return Math.trunc(value)
            },
          },
        },
        colors: ['#50d2fa', '#fc9300'],
        stroke: {
          width: 0.9,
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 6,
          tickPlacement: 'on',
          position: 'top',
        },
        yaxis: {
          show: false,
        },
      }
    },
  },
  async created() {
    this.getPanelData()
  },
  methods: {
    async getPanelData() {
      this.isLoading = true
      try {
        this.data_panels = await api_data.getRealReport(1, 50)
        this.data_forecast = await api_data.getForecasting()
      } catch (err) {
        console.error('Error loading data:', err)
      } finally {
        this.isLoading = false
      }
    },
    updateData: function (timeline: string) {
      // Only proceed if chart exists and data is loaded
      if (!this.$refs.chart || this.data_panels.length === 0) return

      const chartElement = this.$refs.chart as any

      // Convert data to ApexCharts format for zoom operations
      const panelsData = this.data_panels.map(item => [
        new Date(item.time).getTime(),
        item.consume
      ])

      switch (timeline) {
        case 'a day':
          if (panelsData.length >= 2) {
            chartElement.zoomX(
              panelsData[panelsData.length - 2][0],
              panelsData[panelsData.length - 1][0],
            )
          }
          break
        case '30 days':
          const startIndex = Math.max(0, panelsData.length - 31)
          if (panelsData.length > 0) {
            chartElement.zoomX(
              panelsData[startIndex][0],
              panelsData[panelsData.length - 1][0],
            )
          }
          break
        case 'all times':
          if (this.series.length >= 2 && this.series[0].data.length > 0 && this.series[1].data.length > 0) {
            chartElement.zoomX(
              this.series[0].data[0][0],
              this.series[0].data[this.series[0].data.length - 1][0],
            )
            chartElement.updateOptions({
              chart: {
                selection: {
                  enabled: true,
                  xaxis: {
                    min: panelsData[Math.max(0, panelsData.length - 200)]?.[0],
                    max: panelsData[panelsData.length - 1]?.[0],
                  },
                },
              },
            })
          }
          break
        default:
      }
    },
  },
}
</script>
