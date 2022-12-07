<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          label="app_version"
          variant="solo"
          :items="chooseItems.versionItems"
          @update:model-value="onVersionSelect"
          :model-value="selectData.ver"
        />
      </v-col>
      <v-col>
        <v-select
          label="app_business_version"
          variant="solo"
          :items="chooseItems.bVersionItems"
          @update:model-value="onBVersionSelect"
          :model-value="selectData.bVer"
        />
      </v-col>
      <v-col>
        <v-select
          label="bug_stat"
          variant="solo"
          :items="chooseItems.bugStatItems"
          @update:model-value="onFindBugTypeSelect"
        />
      </v-col>
      <v-col
        cols="1"
      >
        <v-btn @click="onBtnFind">
          查询
        </v-btn>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row
      no-gutters
    >
      <v-col
        cols="12"
      >
        <v-table
          fixed-header
        >
          <thead>
            <tr>
              <th class="text-left">
                bug type
              </th>
              <th class="text-left">
                bug type md5
              </th>
              <th class="text-left">
                bug count
              </th>
              <th class="text-left">
                operate
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in bugListData.list"
              :key="item.bug_err_md5"
            >
              <td
                class="ZAutoWrap"
                @click="() => {onTableItemClick(item.bug_err_md5)}"
              >
                {{ item.bug_err_txt }}
              </td>
              <td
                @click="() => {onTableItemClick(item.bug_err_md5)}"
              >
                {{ item.bug_err_md5 }}
              </td>
              <td>
                {{ item.bug_count }}
              </td>
              <td>
                <v-btn
                  @click="() => {onBtnFix(item.bug_err_md5)}"
                >
                  修复
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row
      no-gutters
    >
      <v-col
        cols="12"
      >
        <v-pagination
          :model-value="pageData.pageAt"
          :length="pageData.length"
          @update:model-value="onClickChangePageItem"
        />
      </v-col>
    </v-row>
    <BugInfoView
      v-if="dialogData.isShow"
      :bug-md5="dialogData.bugMd5"
      :app-ver="selectData.ver"
      :app-b-ver="selectData.bVer"
      @msg:close="(dialogData.isShow = false)"
    />
    <BugFixView
      :bug-md5="fixBugDialogData.bugMd5"
      :app-ver="selectData.ver"
      :app-b-ver="selectData.bVer"
      v-model="fixBugDialogData.isShow"
      @update:model-value="(fixBugDialogData.isShow = false)"
    />
  </v-container>
</template>
<script setup lang="ts">
import { getCurrentInstance, reactive } from 'vue'
import { AxiosResponse, AxiosError } from 'axios'
import { NetResp } from '@/typedefs'
import BugInfoView from './BugInfoView.vue'
import BugFixView from './BugFixView.vue'

interface BugListResp {
  code: number,
  msg: string,
  data: {
    total: number,
    // eslint-disable-next-line camelcase
    list: Array<{ bug_count: number, bug_err_md5: string, bug_err_txt: string } >
  }
}

interface VersionInfoResp {
  // eslint-disable-next-line camelcase
  app_version: string,
  // eslint-disable-next-line camelcase
  app_business_version: string,
}

const proxy = getCurrentInstance()?.proxy
const chooseItems = reactive({
  versionItems: [] as string[],
  bVersionItems: [] as string[],
  bugStatItems: [
    '已修复',
    '未修复'
  ]
})

let versionListData: VersionInfoResp[]
const selectData = reactive({
  ver: '',
  bVer: '',
  isSolve: 'false'
})

const pageData = reactive({
  pageNum: 10,
  pageAt: 1,
  length
})

const dialogData = reactive({
  isShow: false,
  bugMd5: ''
})

const fixBugDialogData = reactive({
  isShow: false,
  bugMd5: ''
})

const bugListData: {
  // eslint-disable-next-line camelcase
  list: Array<{ bug_count: number, bug_err_md5: string, bug_err_txt: string }>
} = reactive({
  list: []
})
proxy?.$http.get('svr/bugstat/version_list').then(function (d: AxiosResponse<NetResp<VersionInfoResp[]>>) {
  console.log('version data: ', d.data)
  const items: string[] = []
  d.data.data?.filter(v => {
    if (items.indexOf(v.app_version) < 0) {
      items.push(v.app_version)
      return true
    } else {
      return false
    }
  })
  chooseItems.versionItems = items
  versionListData = d.data.data || []
}).catch(function (e: AxiosError) {
  console.log('拉去版本列表失败', e)
})

function onBtnFind () {
  // eslint-disable-next-line camelcase
  proxy?.$http.get(`svr/bugstat/bug_list/${selectData.ver}/${selectData.bVer}/${selectData.isSolve}/${pageData.pageAt}/${pageData.pageNum}`).then(function (d: AxiosResponse<unknown>) {
    console.log('bug list data: ', d.data)
    const _bugList = d.data as BugListResp
    bugListData.list = _bugList.data.list
    pageData.length = Math.ceil(_bugList.data.total / pageData.pageNum)
  }).catch(function (e: AxiosError) {
    console.log('拉去版本列表失败', e)
  })
}

function onVersionSelect (ver: string): void {
  selectData.ver = ver
  selectData.bVer = ''
  chooseItems.bVersionItems = []
  const items: string[] = []
  versionListData.filter(v => {
    if (v.app_version === ver) {
      items.push(v.app_business_version)
      return true
    } else {
      return false
    }
  })
  chooseItems.bVersionItems = items
}

function onBVersionSelect (bVer: string): void {
  selectData.bVer = bVer
}

function onFindBugTypeSelect (type: string): void {
  selectData.isSolve = type === chooseItems.bugStatItems[0] ? 'true' : 'false'
}

function onClickChangePageItem (pageNum: number): void {
  pageData.pageAt = pageNum
  onBtnFind()
}

function onTableItemClick (bugMd5: string): void {
  console.log('tablt item click', bugMd5)
  dialogData.isShow = true
  dialogData.bugMd5 = bugMd5
}

function onBtnFix (bugMd5: string) {
  console.log('fix bug ...', bugMd5)
  fixBugDialogData.bugMd5 = bugMd5
  fixBugDialogData.isShow = true
}
</script>
<style lang="scss" scoped>
.ZAutoWrap {
  word-break: break-all;
  word-wrap:break-word;
}
</style>
