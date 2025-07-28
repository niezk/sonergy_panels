<template>
  <div class="border rounded-xl px-4 h-fit py-6 border-gray-400 relative overflow-hidden">
    <!-- Background particles for achievement -->
    <div v-if="showCelebration" class="absolute inset-0 pointer-events-none">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="absolute w-2 h-2 bg-emerald-400 rounded-full animate-ping"
        :style="{ left: particle.x + '%', top: particle.y + '%', animationDelay: particle.delay + 's' }"
      ></div>
    </div>

    <!-- Header with edit mode toggle -->
    <div class="flex justify-between items-start mb-3">
      <div>
        <h1 class="text-2xl font-light">{{ currentGoal.title }}</h1>
        <p class="font-normal text-sm text-gray-500">{{ currentGoal.description }}</p>
      </div>
      <button
        @click="toggleEditMode"
        class="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
        </svg>
      </button>
    </div>

    <!-- Edit Mode -->
    <div v-if="editMode" class="mb-6 p-4 bg-gray-50 rounded-lg">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Goal Type</label>
          <select
            v-model="selectedGoalType"
            @change="updateGoalType"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option v-for="goal in goalTypes" :key="goal.id" :value="goal.id">
              {{ goal.title }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Target Value</label>
          <input
            v-model="tempTarget"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            :placeholder="currentGoal.unit"
          />
        </div>
      </div>
      <div class="flex justify-end mt-4 space-x-2">
        <button
          @click="cancelEdit"
          class="cursor-pointer px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="saveGoal"
          class="cursor-pointer px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
        >
          Save Goal
        </button>
      </div>
    </div>

    <!-- Progress Section -->
    <div class="mb-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-gray-700 p-2">Progress</span>
        <span class="text-sm text-gray-500">{{ currentUsage }} / {{ currentGoal.target }} {{ currentGoal.unit }}</span>
      </div>

      <div class="flex">
        <GoalsIcon class="mx-4 flex-shrink-0" />
        <div class="w-full bg-gray-200 rounded-full relative overflow-hidden">
          <div
            :class="[
              'text-sm rounded-full h-full text-white transition-all duration-500 flex justify-center items-center',
              progressColor
            ]"
            :style="{ width: progressPercentage + '%' }"
          >
            {{ Math.round(progressPercentage) }}%
          </div>

          <!-- Goal marker -->
          <div
            class="absolute top-0 w-1 h-full bg-gray-600 opacity-50"
            style="right: 0;"
          ></div>
        </div>
      </div>

      <div class="text-end mt-1 mx-3">
        <p class="text-sm text-gray-600">{{ remainingText }}</p>
      </div>
    </div>

    <!-- Achievement Badge -->
    <div v-if="isGoalAchieved" class="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <span class="text-emerald-700 font-medium">Goal Achieved! 🎉</span>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="flex space-x-2 justify-end">
      <button
        @click="addUsage"
        class="rounded-sm cursor-pointer px-3 py-2 bg-emerald-500 text-white hover:bg-emerald-600 transition-colors text-sm"
      >
        + Add Usage
      </button>
      <button
        @click="resetProgress"
        class="rounded-sm cursor-pointer px-6 py-2 bg-gray-500 text-white  hover:bg-gray-600 transition-colors text-sm"
      >
        Reset
      </button>
    </div>

    <!-- Usage Input Modal -->
    <div v-if="showUsageModal" class="fixed inset-0 bg-transparent backdrop-blur-sm 50 flex items-center justify-center z-50 drop-shadow-xl">
      <div class="bg-white rounded-lg p-6 w-80">
        <h3 class="text-lg font-medium mb-4">Add Usage</h3>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Usage Amount ({{ currentGoal.unit }})
          </label>
          <input
            v-model="usageInput"
            type="number"
            step="0.1"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter usage amount"
          />
        </div>
        <div class="flex justify-end space-x-2">
          <button
            @click="showUsageModal = false"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="confirmAddUsage"
            class="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import GoalsIcon from './icons/GoalsIcon.vue'

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  unit: string;
  type: 'energy' | 'water' | 'waste' | 'carbon';
}

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

export default {
  components: {
    GoalsIcon,
  },
  props: {
    initialUsage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      editMode: false,
      showUsageModal: false,
      showCelebration: false,
      usageInput: '',
      tempTarget: 0,
      selectedGoalType: 'energy-saving',
      currentUsage: this.initialUsage,
      particles: [] as Particle[],
      goalTypes: [
        {
          id: 'energy-saving',
          title: 'Energy Saving',
          description: 'Reduce energy consumption and save the world!',
          target: 10,
          unit: 'hours',
          type: 'energy'
        },
        {
          id: 'water-conservation',
          title: 'Water Conservation',
          description: 'Conserve water for a sustainable future!',
          target: 100,
          unit: 'liters',
          type: 'water'
        },
        {
          id: 'carbon-reduction',
          title: 'Carbon Footprint',
          description: 'Reduce your carbon footprint!',
          target: 50,
          unit: 'kg CO2',
          type: 'carbon'
        },
        {
          id: 'waste-reduction',
          title: 'Waste Reduction',
          description: 'Minimize waste production!',
          target: 5,
          unit: 'kg',
          type: 'waste'
        }
      ] as Goal[]
    }
  },
  computed: {
    currentGoal(): Goal {
      return this.goalTypes.find(goal => goal.id === this.selectedGoalType) || this.goalTypes[0];
    },
    progressPercentage(): number {
      return Math.min((this.currentUsage / this.currentGoal.target) * 100, 100);
    },
    progressColor(): string {
      const percentage = this.progressPercentage;
      if (percentage >= 100) return 'bg-emerald-400';
      if (percentage >= 75) return 'bg-yellow-400';
      if (percentage >= 50) return 'bg-orange-400';
      return 'bg-red-400';
    },
    remainingText(): string {
      const remaining = this.currentGoal.target - this.currentUsage;
      if (remaining <= 0) {
        return 'Goal achieved! 🎉';
      }
      return `${remaining.toFixed(1)} ${this.currentGoal.unit} remaining`;
    },
    isGoalAchieved(): boolean {
      return this.currentUsage >= this.currentGoal.target;
    }
  },
  watch: {
    isGoalAchieved(newValue) {
      if (newValue) {
        this.triggerCelebration();
      }
    }
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
      if (this.editMode) {
        this.tempTarget = this.currentGoal.target;
      }
    },
    updateGoalType() {
      this.tempTarget = this.currentGoal.target;
    },
    saveGoal() {
      if (this.tempTarget > 0) {
        const goalIndex = this.goalTypes.findIndex(goal => goal.id === this.selectedGoalType);
        if (goalIndex !== -1) {
          this.goalTypes[goalIndex].target = this.tempTarget;
        }
      }
      this.editMode = false;
    },
    cancelEdit() {
      this.editMode = false;
      this.tempTarget = this.currentGoal.target;
    },
    addUsage() {
      this.showUsageModal = true;
      this.usageInput = '';
    },
    confirmAddUsage() {
      const usage = parseFloat(this.usageInput);
      if (!isNaN(usage) && usage > 0) {
        this.currentUsage += usage;
        this.showUsageModal = false;
      }
    },
    resetProgress() {
      this.currentUsage = 0;
      this.showCelebration = false;
    },
    triggerCelebration() {
      this.showCelebration = true;
      this.particles = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
      }));

      setTimeout(() => {
        this.showCelebration = false;
      }, 3000);
    }
  }
}
</script>

<style scoped>
input {
  width: fit-content !important;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
