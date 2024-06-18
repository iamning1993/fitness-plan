<script setup>
import { reactive, ref } from 'vue' 
import { Calendar } from 'v-calendar'
import 'v-calendar/style.css'

const showData = data => console.log(data)

const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const todayWeekPosition = ref(null)
const today = ref(null)

const getDayContentClassNames = ({ weekPosition, weekdayPosition, isToday, day }) => {
  if (isToday) {
    todayWeekPosition.value = weekPosition
    today.value = day
  }
  // 训练日为每周1、2、4、6
  const isFitnessWeekdays = [1, 2, 4, 6]
  if (today.value <= day && isFitnessWeekdays.includes(weekdayPosition)) {
    // 如果是训练日
    return 'my-day-content my-fitness-day'
  } else if (isToday) {
    return 'my-day-content my-is-today'
  } else {
    return 'my-day-content my-day-default'
  }
}

const attributes = reactive([
  {
    dates: { weekdays: 6 },
    popover: true
  }
])
</script>

<template>
  <div class="my-header-title">{{ year }}-{{ month }}</div>
  <Calendar 
    expanded 
    borderless 
    trim-weeks 
    is-dark 
    :attributes="attributes"
  >
    <template #day-content="{ day }">
      <div :class="getDayContentClassNames(day)">
        <div class="day-number">{{ day.day }}</div>
        <div class="today-block" v-if="day.isToday"></div>
      </div>
      <!-- {{ day.day === 17 ? showData(day) : '' }} -->
    </template>
  </Calendar>
</template>

<style>
.my-header-title {
  font-size: 32px;
  font-weight: bold;
  color: #ea580c;
  text-align: center;
  padding: 30px 0;
}

.vc-header {
  display: none;
}

.vc-container .vc-weekday {
  font-size: 32px;
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

.my-day-content {
  position: relative;
  width: calc(100% - 40px);
  height: 60px;
  margin: 10px 20px;
  padding: 15px;
  font-size: 32px;
  font-weight: bold;
  color: #FFFFFF;
  border-radius: 5px;
  cursor: pointer;
}

.my-day-default:hover {
  color: #FFFFFF;
  background-color: #1e293b;
}

.today-block {
  width: 100%;
  height: 30px;
  background-color: #3b82f6;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.day-number {
  width: 100%;
  height: 60px;
  line-height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  padding: 0 10px;
  text-align: center;
}

.my-is-today {
  color: #FFFFFF;
  background-color: #EC4899;
}

.my-fitness-day {
  color: #FFFFFF;
  background-color:	#ea580c;
}
</style>