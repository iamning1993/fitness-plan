<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Modal } from '@arco-design/web-vue'
import FITNESS_DATA from '@/local/fitnessData.json'

const route = useRoute()
const router = useRouter()

const fitness = computed(() => FITNESS_DATA.find(v => v.weekday == route.query.weekday))

const finish = () => {
  Modal.success({
    title: '完成训练',
    content: '恭喜完成训练，请及时拍照记录！',
    bodyClass: 'my-modal-content',
    onOk: () => {
      router.back()
    }
  })
}
</script>

<template>
  <div class="fitness-detail">
    <a-typography>
      <a-typography-title bold>{{ fitness.title }}</a-typography-title>
      <a-typography-title :heading="5" bold>器械：{{ fitness.equipment }}</a-typography-title>
      <template v-for="(action, index) in fitness.actionList">
        <a-typography-title :heading="5" type="secondary">{{ `${ index + 1 }. ${action.actionName}` }}</a-typography-title>
        <a-typography-paragraph>
          <a-space fill>
            <a-typography-text type="warning">{{ action.groupNum }}（组）*{{ action.actionNum }}（次）</a-typography-text>
            <a-rate :count="action.groupNum" color="#ea580c" style="min-width: 160px;">
              <template #character>
                <icon-check-circle-fill />
              </template>
            </a-rate>
          </a-space>
          <template v-for="(desc, index) in action.descList">
            <a-typography-text type="secondary">{{ `${ index + 1 }. ` }}{{ desc }}</a-typography-text>
            <br/>
          </template>
          <div><a v-if="action.link" target="_blank" :href="action.link.src">{{ action.link.desc }}</a></div>
          <a-image-preview-group infinite>
            <a-space wrap>
              <a-image class="my-a-iamge" v-for="imgSrc in action.images" :src="imgSrc" height="200" width="200" fit="contain"/>
            </a-space>
          </a-image-preview-group>
        </a-typography-paragraph>
        <a-divider />
      </template>
    </a-typography>
    <a-button class="finish-btn" type="primary" size="large" @click="finish">完成训练</a-button>
  </div>
</template>

<style scoped>
.fitness-detail {
  width: 800px;
  margin: 0 auto;
}

.finish-btn {
  width: 100%;
  margin: 10px 0 100px 0;
}

.my-a-iamge {
  background-color: var(--color-neutral-2);
}
</style>

<style>
.my-modal-content {
  font-size: 18px !important;
  font-weight: bold;
  text-align: center;
  color: #ea580c;
}
</style>