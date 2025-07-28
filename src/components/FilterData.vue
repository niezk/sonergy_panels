<template>
  <div class="container mx-auto px-2 max-w-7xl">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="font-light text-2xl sm:text-3xl lg:text-4xl text-center sm:text-left">
        Details data
      </h1>
      <p class="font-extralight text-sm sm:text-base text-center sm:text-left mt-2">
        filter range time
      </p>
    </div>

    <!-- Date Range Filter -->
    <div class="mb-6 w-full">
      <div
        id="range"
        class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0 rounded-xl border border-gray-300 text-black p-3 sm:py-2 w-full sm:w-fit"
        :class="{
          'border-red-300': condition.type === 'alert',
        }"
      >
        <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 sm:px-3 flex-1">
          <input
            class="py-2 px-3 sm:py-1 text-center w-full sm:w-auto min-w-0 sm:min-w-[120px] rounded border sm:border-none"
            type="date"
            v-model="start"
            :class="{
              'text-red-400': condition.type === 'alert',
            }"
          />
          <p class="mx-2 py-1 font-light text-sm sm:text-base">TO</p>
          <input
            class="py-2 px-3 sm:py-1 text-center w-full sm:w-auto min-w-0 sm:min-w-[120px] rounded border sm:border-none"
            type="date"
            v-model="end"
            :class="{
              'text-red-400': condition.type === 'alert',
            }"
          />
        </div>
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            class="border-gray-300 border p-2 sm:p-1 font-light rounded-lg px-4 md:px-6 mx-0 hover:border-gray-500 hover:bg-gray-500 hover:text-white transition cursor-pointer w-full sm:w-auto"
            @click="getDocPanel()"
          >
            Find
          </button>
        </div>
      </div>
    </div>
    <button
      class="border-emerald-400 bg-emerald-400 border p-2 sm:p-1 rounded-lg px-4 md:px-6 mx-0 hover:border-emerald-600 hover:bg-white hover:text-emerald-400 text-white font-normal transition cursor-pointer w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white"
      @click="exportToExcel()"
      :disabled="!dataForm || dataForm.length === 0"
    >
      Export Excel
    </button>

    <!-- Status Message -->
    <h1
      class="p-3 text-center my-5 flex items-center justify-center"
      :class="{
        'border-red-200 border-2 rounded-lg bg-red-50 font-medium text-red-700':
          condition.type === 'alert',
        'text-gray-600 visible': condition.type === 'missing' || 'success',
        'border-emerald-200 border-2 rounded-lg bg-emerald-50 font-medium text-green-700':
          condition.type === 'success',
      }"
    >
      <FileSaved
        v-if="condition.type === 'success' || condition.type === 'alert'"
        :type-feedback="condition.type"
        class="mr-2"
      />
      {{ condition.text }}
    </h1>

    <!-- Data Display -->
    <div class="mt-6">
      <!-- Mobile Cards View (visible on small screens) -->
      <div class="block lg:hidden">
        <div v-if="dataForm && dataForm.length > 0" class="space-y-4">
          <div
            v-for="item in dataForm"
            :key="item.name"
            class="bg-white rounded-lg shadow-md border border-gray-200 p-6 m-2"
          >
            <div class="flex justify-between items-center mb-3">
              <h3 class="font-medium text-lg text-gray-800">{{ item.name }}</h3>
              <span class="text-sm text-gray-500">
                {{ new Date(item.time).toLocaleDateString() }}
              </span>
            </div>
            <div class="space-y-3 text-sm">
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-amber-100 p-3 rounded-lg">
                  <div class="text-amber-600 font-medium">voltage</div>
                  <div class="text-lg font-semibold">{{ item.voltage }}°C</div>
                </div>
                <div class="bg-fuchsia-100 p-3 rounded-lg">
                  <div class="text-fuchsia-600 font-medium">Consume</div>
                  <div class="text-lg font-semibold">{{ item.consume }} kWh</div>
                </div>
              </div>
              <div class="bg-emerald-100 p-3 rounded-lg w-full">
                <div class="text-emerald-600 font-medium">bill (Day)</div>
                <div class="text-lg font-semibold">Rp. {{ item.bill }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 m-2 invisible">
            <div class="flex justify-between items-center mb-3">
              <h3 class="font-medium text-lg text-gray-800">invalid</h3>
              <span class="text-sm text-gray-500"> Lorem, ipsum. </span>
            </div>
            <div class="space-y-3 text-sm">
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-amber-50 p-3 rounded-lg">
                  <div class="text-amber-600 font-medium">voltage</div>
                  <div class="text-lg font-semibold">Lorem. ips</div>
                </div>
                <div class="bg-fuchsia-50 p-3 rounded-lg">
                  <div class="text-fuchsia-600 font-medium">Consume</div>
                  <div class="text-lg font-semibold">Lorem. ips</div>
                </div>
              </div>
              <div class="bg-emerald-50 p-3 rounded-lg">
                <div class="text-emerald-600 font-medium">bill (Day)</div>
                <div class="text-lg font-semibold">Lorem. ips</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Desktop Table View (visible on large screens) -->
      <div class="hidden lg:block">
        <div class="overflow-x-auto">
          <table class="table-auto border-collapse w-full min-w-full">
            <thead>
              <tr>
                <th
                  class="font-medium py-3 px-4 xl:px-7 font-mono bg-blue-100 rounded-l-2xl rounded-b-none whitespace-nowrap"
                >
                  Date
                </th>
                <th
                  class="font-medium py-3 px-4 xl:px-7 font-mono bg-emerald-100 whitespace-nowrap"
                >
                  Billng (Day)
                </th>
                <th
                  class="font-medium py-3 px-4 xl:px-7 font-mono bg-fuchsia-100 whitespace-nowrap"
                >
                  Consume (kWh)
                </th>
                <th
                  class="font-medium py-3 px-4 xl:px-7 font-mono bg-pink-100 rounded-r-2xl rounded-b-none whitespace-nowrap"
                >
                  voltage (Volt)
                </th>
              </tr>
            </thead>
            <tbody v-if="dataForm && dataForm.length > 0">
              <tr v-for="item in dataForm" :key="item.name" class="hover:bg-gray-50">
                <td
                  class="border-b border-dashed border-gray-300 p-3 xl:p-4 font-light text-center"
                >
                  {{ new Date(item.time).toDateString() }}
                </td>
                <td
                  class="border-b border-dashed border-gray-300 p-3 xl:p-4 font-light text-center"
                >
                  Rp. {{ item.bill }}
                </td>
                <td
                  class="border-b border-dashed border-gray-300 p-3 xl:p-4 font-light text-center"
                >
                  {{ item.consume }}
                </td>
                <td
                  class="border-b border-dashed border-gray-300 p-3 xl:p-4 font-light text-center"
                >
                  {{ item.voltage }}
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td
                  colspan="5"
                  class="border-b border-dashed border-gray-300 p-8 text-center text-gray-500"
                >
                  No data found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { query, collection, where, getDocs, limit, QueryDocumentSnapshot } from 'firebase/firestore'
import db from '@/assets/firebase-config'
import * as XLSX from 'xlsx'
import FileSaved from './icons/FileSaved.vue'

interface dataPanel {
  name: string
  time: string
  bill: string
  consume: number
  voltage: number
}

export default {
  components: {
    FileSaved,
  },
  data() {
    return {
      lastVisible: null as QueryDocumentSnapshot | null,
      start: '2025-07-03',
      end: '2037-10-27',
      dataForm: [] as dataPanel[],
      page: [] as number[],
      condition: {
        type: 'missing' as string,
        text: 'try to search something' as string,
      },
    }
  },
  methods: {
    formatCustomNumber(num: number) {
      if (num > 100000.0) {
        num = parseFloat((num / 10).toFixed(2))
      }
      const [intPart] = num.toString().split('.')
      const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return `${grouped},000`
    },
    getDocPanel: async function () {
      const refActivity = collection(db, 'forecasting_data')
      const from = this.convertUnix(this.start)
      const end = this.convertUnix(this.end)
      const q = query(
        refActivity,
        where('time', '>=', from),
        where('time', '<=', end),
        limit(250),
      );
      const querySnapshot = await getDocs(q)
      this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]

      try {
        const result: dataPanel[] = []

        if (this.start <= this.end) {
          querySnapshot.forEach((doc) => {
            const data = doc.data()
            return result.push({
              name: data.name,
              time: data.time,
              bill: this.formatCustomNumber(data.bill),
              consume: data.consume,
              voltage: data.voltage,
            })
          })
          this.condition.type = 'success'
          this.condition.text = `found ${querySnapshot.docs.length > 0 ? querySnapshot.docs.length : 0} data(s)`
        } else {
          this.condition.type = 'alert'
          this.condition.text = 'wrong range input!'
          setTimeout(() => {}, 1000)
        }
        this.dataForm = result

      } catch (error) {
        console.error(error)
      }
    },

    convertUnix: function (date: string) {
      return new Date(date).getTime()
    },

    exportToExcel: function () {
      if (!this.dataForm || this.dataForm.length === 0) {
        alert('No data to export')
        return
      }

      try {
        // Prepare data for Excel export
        const excelData = this.dataForm.map((item) => ({
          Date: new Date(item.time).toLocaleDateString(),
          'Panel Name': item.name,
          'voltage (Volt)': item.voltage,
          'bill (Day)': item.bill,
          'Consume (kWh)': item.consume,
        }))

        // Create workbook and worksheet
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(excelData)

        // Set column widths
        const colWidths = [
          { wch: 12 }, // Date
          { wch: 15 }, // Panel Name
          { wch: 15 }, // voltage
          { wch: 15 }, // bill
          { wch: 15 }, // Consume
          { wch: 15 }, // CO₂ Saved
        ]
        ws['!cols'] = colWidths

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Panel Data')

        const filename = `Panel_Data.xlsx`

        // Save the file
        XLSX.writeFile(wb, filename)

        // Show success message
        this.condition.type = 'success'
        this.condition.text = `Excel file exported successfully`

        // Reset message after 3 seconds
        setTimeout(() => {
          this.condition.text = `found ${this.dataForm.length} data(s)`
        }, 3000)
      } catch (error) {
        console.error('Error exporting to Excel:', error)
        this.condition.type = 'alert'
        this.condition.text = 'Failed to export Excel file'

        // Reset message after 3 seconds
        setTimeout(() => {
          this.condition.text = `found ${this.dataForm.length} data(s)`
        }, 3000)
      }
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Rubik+Mono+One&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Wire+One&display=swap');

input[type='datetime-local']::-webkit-calendar-picker-indicator,
input[type='date']::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
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

#time {
  font-family: 'Space Mono', monospace;
  font-weight: 500;
}

/* Responsive improvements */
@media (max-width: 640px) {
  input[type='date'] {
    width: 100%;
    min-width: 0;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  input[type='date'] {
    width: 120px;
    min-width: 120px;
  }
}

@media (min-width: 1024px) {
  input[type='date'] {
    width: 140px;
    min-width: 140px;
  }
}
</style>
