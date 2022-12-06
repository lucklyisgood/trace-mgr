<template>
  <v-container>
    <v-dialog
      :model-value="modelValue"
      @update:model-value="onDialogClose"
    >
      <v-card>
        <v-card-text>
          <p>app version: {{ appVer }}</p>
          <p>app hot version: {{ appBVer }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="onBtnYes"
          >
            确定
          </v-btn>
          <v-btn
            @click="onBtnClose"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="tips.isShow"
      location="top"
      :timeout="tips.delayTime"
      :color="tips.color"
      width="400"
    >
      {{ tips.msg }}
    </v-snackbar>
  </v-container>
</template>
<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, getCurrentInstance, reactive } from 'vue'
import { AxiosResponse, AxiosError } from 'axios'
import { NetResp } from '@/typedefs'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  bugMd5: string,
  appVer: string,
  appBVer: string,
}>(), {
  modelValue: false
})

const tips = reactive({
  isShow: false,
  msg: '',
  delayTime: -1,
  color: 'success'
})

const emits = defineEmits(['update:modelValue'])

const proxy = getCurrentInstance()?.proxy

function onBtnClose () {
  console.log('BugFix close ...')
  emits('update:modelValue')
  tips.isShow = false
}

function onDialogClose (f: boolean): void {
  if (!f) {
    onBtnClose()
  }
}

function onBtnYes () {
  // /svr/bugstat
  proxy?.$http.put('/svr/bugstat/fix_bug', {
    bug_type_md5: props.bugMd5,
    app_version: props.appVer,
    app_business_version: props.appBVer
  }).then((result: AxiosResponse<NetResp<unknown>>) => {
    if (result.status === 200 && result.data.code === 0) {
      tips.msg = '提交成功~'
      tips.isShow = true
    } else {
      console.log('服务器状态异常~', result)
      tips.msg = '服务器状态异常~'
      tips.isShow = true
    }
  }).catch((e: AxiosError) => {
    console.log('数据提交失败~', e)
    tips.msg = '数据提交失败~'
    tips.isShow = true
  })
}
</script>
