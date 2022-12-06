<template>
  <v-dialog
    v-model="dialogData.isShow"
    @update:model-value="onCloseDialog"
  >
    <v-card
      height="h=75"
      text="BugInfo"
    >
      <v-card-text>
        <v-container
          fluid
        >
          <v-row>
            <v-col cols="6">
              <p>cuid: {{ dialogData.cuid }}</p>
              <v-divider />
              <p>uid: {{ dialogData.uid }}</p>
              <v-divider />
            </v-col>
            <v-col
              cols="6"
            >
              <JsonViewer
                :value="dialogData.bugCtx"
                :expand-depth="2"
                copyable
                boxed
                sort
                theme="jv-light"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="onCloseDialog">
          <span>关闭</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { defineProps, reactive, onBeforeMount, defineEmits, withDefaults, getCurrentInstance } from 'vue'
import { AxiosResponse, AxiosError } from 'axios'
import { NetResp } from '@/typedefs'

const props = withDefaults(defineProps<{
  bugMd5: string,
  appVer: string,
  appBVer: string,
}>(), {
  bugMd5: ''
})
const dialogData = reactive({
  isShow: true,
  bugCtx: {},
  cuid: '',
  uid: ''
})

const pageData = reactive({
  pageAt: 1,
  pageNum: 1
})

const emits = defineEmits(['msg:close'])

interface BugInfoResp {
  // eslint-disable-next-line camelcase
  app_uid: string,
  // eslint-disable-next-line camelcase
  app_cuid: string,
  // eslint-disable-next-line camelcase
  bug_ctx: string
}
const bugInfoData = reactive({
  list: [] as BugInfoResp[],
  total: 0
})

onBeforeMount(() => {
  console.log('拉去数据')
  bugInfoData.list = []
  bugInfoData.total = 0
  pullSvrDat()
})

const proxy = getCurrentInstance()?.proxy
function pullSvrDat () {
  proxy?.$http.get(`svr/bugstat/bug_info_list/${props.appVer}/${props.appBVer}/${props.bugMd5}/${pageData.pageAt}/${pageData.pageNum}`)
    .then((v: AxiosResponse) => {
      const netData = v.data as NetResp<{
        list: BugInfoResp[],
        total: number
      }>
      if (netData.data) {
        bugInfoData.list = netData.data?.list
        bugInfoData.total = netData.data?.total
        if (bugInfoData.list.length > 0) {
          const item = bugInfoData.list[0]
          dialogData.bugCtx = JSON.parse(item.bug_ctx)
          dialogData.uid = item.app_uid
          dialogData.cuid = item.app_cuid
        }
      }
    })
    .catch((e: AxiosError) => {
      console.log('页面数据拉去失败~', e)
    })
}

function onCloseDialog (): void {
  dialogData.isShow = false
  console.log('bugMd5', props.bugMd5)
  emits('msg:close')
}
</script>
