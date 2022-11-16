<template>
  <v-app :theme="theme">
    <v-navigation-drawer permanent>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Board" value="board"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar>
      <v-spacer></v-spacer>
      <v-btn
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click="onClickThemeStyle"
      >Toggle Theme</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
      <v-footer app>
        <v-row justify="center">
          <div class="text-center pb-1">
            &copy;{{ new Date().getFullYear() }} — <strong>trace mgr</strong>
          </div>
        </v-row>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const theme = ref('light')

function onClickThemeStyle () {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
