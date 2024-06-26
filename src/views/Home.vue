<script setup>
import { ref, reactive } from 'vue' 
import { Calendar } from 'v-calendar'
import { useRouter } from 'vue-router'
import FITNESS_DATA from '@/local/fitnessData.json'
import 'v-calendar/style.css'

const router = useRouter()

const year = new Date().getFullYear()
const attributesMonth = new Date().getMonth()
const month = attributesMonth + 1
const today = new Date().getDate()

const fitnessWeekdays = FITNESS_DATA.map(({ weekday }) => weekday) // 星期一、星期二、星期四、星期六

const disabledDates = ref([{ start: null, end: new Date() }])
const attributes = reactive([
  {
    key: 'today',
    content: {
      color: 'blue',
      class: 'italic'
    },
    dates: new Date(),
  },
  {
    highlight: {
      color: 'orange',
      fillMode: 'solid'
    },
    dates: { 
      repeat: { 
        on: ({ day, weekday }) => {
          const fitnessWeekdaysPlus = fitnessWeekdays.map(v => (v + 1))
          if (today === day) {
            return fitnessWeekdaysPlus.includes(weekday)
          } else {
            return today < day && fitnessWeekdaysPlus.includes(weekday)
          }
        }
      } 
    }
  },
  ...FITNESS_DATA.map(({ weekday, title }) => {
    return {
      dates: { 
        repeat: { weekdays: (weekday + 1) }
      },
      popover: { 
        label: title
      }
    }
  })
])

const dayclick = ({ weekdayPosition, day }) => {
  if ((today <= day) && fitnessWeekdays.includes(weekdayPosition)) {
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
      :disabled-dates="disabledDates" 
      @dayclick="dayclick"
    >
      <template #day-popover="{ attributes, day }">
        <div class="day-popover-content text-xs text-gray-700 dark:text-gray-300">
          {{ console.log(day) }}
          {{ day.ariaLabel }}
          <br><br>
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

.italic {
  font-style: italic;
}
</style>