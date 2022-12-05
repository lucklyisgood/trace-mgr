<template>
  <v-app theme:="light">
    <v-container
      fluid
      class="fill-height"
    >
      <v-row
        class="fill-height"
        no-gutters
        justify="center"
        align-content="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
          lg="4"
        >
          <v-card
            class="elevation-5 pa-3"
          >
            <v-card-text>
              <v-text-field
                v-model="loginData.name"
                color="primary"
                clearable
                clear-icon="mdi-close-circle-outline"
                append-icon="mdi-account"
                name="name"
                label="名字"
                variant="underlined"
              />
              <v-text-field
                v-model="loginData.pwd"
                color="primary"
                append-icon="mdi-lock"
                clear-icon="mdi-close-circle-outline"
                clearable
                name="pwd"
                label="密码"
                type="password"
                variant="underlined"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                variant="outlined"
                @click="Login"
              >
                <span>登录</span>
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      v-model="tips.isShow"
      location="top"
      timeout="2000"
      color="error"
      width="400"
      class=""
    >
      {{ tips.msg }}
    </v-snackbar>
  </v-app>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/store/Users'
import { useRouter, useRoute } from 'vue-router'

const loginData = ref({
  name: 'admin',
  pwd: 'trace123.'
})

const tips = reactive({
  isShow: false,
  msg: ''
})

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()

async function Login () {
  await userStore.loginByName(loginData.value.name, loginData.value.pwd).then(() => {
    router.push({ path: `${route.query.redirect || '/'}` })
  }).catch((e: Error) => {
    tips.msg = e.message
    tips.isShow = true
  })
}
</script>
