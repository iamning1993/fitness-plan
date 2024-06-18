<script setup>
import { ref, reactive } from 'vue' 
import { Calendar } from 'v-calendar'
import { useRouter } from 'vue-router'
import FITNESS_DATA from '@/local/fitnessData.json'
import 'v-calendar/style.css'

const router = useRouter()

const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const fitnessWeekdays = FITNESS_DATA.map(({ weekday }) => weekday) // 星期一、星期二、星期四、星期六

const attributes = reactive([
  {
    key: 'today',
    content: 'blue',
    dates: new Date(),
  },
  {
    highlight: 'orange',
    dates: { 
      start: new Date(),
      repeat: { 
        weekdays: fitnessWeekdays.map(v => (v + 1))
      } 
    }
  },
  ...FITNESS_DATA.map(({ weekday, title }) => {
    return {
      dates: { 
        start: new Date(), 
        repeat: { weekdays: (weekday + 1) }
      },
      popover: { 
        label: title
      }
    }
  })
])

const today = ref(new Date().getDate())
const dayclick = ({ weekdayPosition, day }) => {
  if ((today.value <= day) && fitnessWeekdays.includes(weekdayPosition)) {
    // 训练日
    router.push({
      path: '/detail',
      query: {
        weekday: weekdayPosition
      }
    })
  }
}
</script>

<template>
  <div class="fitness-home-page">
    <div class="my-header-title">{{ year }}-{{ month > 9 ? month : `0${ month }` }}</div>
    <Calendar 
      expanded 
      borderless 
      trim-weeks 
      is-dark
      :attributes="attributes" 
      @dayclick="dayclick"
    >
      <template #day-popover="{ attributes }">
        <div class="day-popover-content text-xs text-gray-700 dark:text-gray-300">
          {{ attributes[0].popover.label }}
        </div>
      </template>
    </Calendar>
  </div>
</template>

<style>
.fitness-home-page {
  min-height: 100vh;
  background-color: #0f172a;
}

.my-header-title {
  font-size: 48px;
  font-weight: bold;
  color: #ea580c;
  text-align: center;
  padding: 30px 0;
}

.vc-container .vc-header {
  display: none;
}

.vc-container .vc-weekday {
  font-size: 48px;
  font-weight: bold;
  color: #3b82f6;
  line-height: normal;
}

.vc-container .vc-weekday-2, 
.vc-container .vc-weekday-3,
.vc-container .vc-weekday-5,
.vc-container .vc-weekday-7 {
  color: #ea580c;
}

.vc-container .vc-day-content {
  height: 100px;
  width: 100px;
  font-size: 48px;
  font-weight: bold;
  margin: 20px;
  padding: 15px;
}

.vc-container .vc-highlight {
  height: 100px;
  width: 100px;
}

.day-popover-content {
  font-size: 18px;
  padding: 8px;
}
</style>