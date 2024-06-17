<script setup>
import { ref } from 'vue' 
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
  let classNames = 'my-day-content'
  // 训练日为每周1、2、4、6
  const isFitnessWeekdays = [1, 2, 4, 6]
  if (today.value <= day && isFitnessWeekdays.includes(weekdayPosition)) {
    // 如果是训练日
    return 'my-day-content my-fitness-day'
  } else if (isToday) {
    return 'my-day-content my-is-today'
  } else {
    return 'my-day-content'
  }
}
</script>

<template>
  <div class="my-header-title">{{ year }}-{{ month }}</div>
  <Calendar 
    expanded 
    borderless 
    trim-weeks 
    is-dark 
  >
    <template #day-content="{ day }">
      <div :class="getDayContentClassNames(day)">
        {{ day.day }}
      </div>
      {{ day.day === 17 ? showData(day) : '' }}
    </template>
  </Calendar>
</template>

<style>
.my-header-title {
  font-size: 32px;
  font-weight: bold;
  color: #DC143C;
  text-align: center;
  padding: 30px 0;
}

.vc-header {
  display: none;
}

.vc-container .vc-weekday {
  font-size: 32px;
  font-weight: bold;
  color: #FFFFFF;
  margin: 20px;
  padding: 10px 0;
  line-height: normal;
  border-radius: 5px;
}

.vc-container .vc-weekdays {
  border-radius: 5px;
  margin: 15px;
}

.vc-container .vc-weekday-2, 
.vc-container .vc-weekday-3,
.vc-container .vc-weekday-5,
.vc-container .vc-weekday-7 {
  color: #DC143C;
}

.my-day-content {
  width: calc(100% - 40px);
  margin: 10px 20px;
  padding: 15px;
  font-size: 32px;
  font-weight: bold;
  color: #FFFFFF;
  background-color:	#000000;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.my-day-content:hover {
  color: #FFFFFF;
  background-color: #EC4899;
}

.my-is-today {
  color: #FFFFFF;
  background-color: #EC4899;
}

.my-fitness-day {
  color: #FFFFFF;
  background-color:	#DC143C;
}
</style>