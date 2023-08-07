<template>
  <q-layout class="sf-ui-light" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <router-link class="text-white" to="/">
            <AppName /> - {{ organisationName }}
          </router-link>
        </q-toolbar-title>

        <div>{{ firstName }} {{ surname }}</div>
      
        <q-btn dense flat round icon="menu" aria-label="Menu" v-on:click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer bordered overlay side="right" v-model="rightDrawerOpen">
      <Menu />
    </q-drawer>

    <q-page-container class="q-px-md">
      <router-view />
      
      <!-- <WebChatSessions v-bind:position="[20, 20]" v-if="!requiresPasswordChange" /> -->

      <div class="absolute-bottom text-caption text-center">
        &copy; 2023 <a href="https://www.pronova.com.ng" target="_blank">Pronova Limited</a>. All rights reserved.
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
  import { mapGetters } from 'vuex';

  import AppName from "src/components/_common/AppName.vue";
  import WebChatSessions from "src/components/chats/PageSticky.vue";
  import Menu from 'src/components/_common/Menu.vue';

  export default {
    name: 'MainLayout',
    data: function() {
      return {
        rightDrawerOpen: false,
      }
    },
    computed: {
      ...mapGetters({
        firstName: "security/firstName",
        surname: "security/surname",
        organisationName: "security/organisationName",
        requiresPasswordChange: "security/requiresPasswordChange"
      })
    },
    methods: {
      toggleRightDrawer: function() {
        const self = this;

        self.rightDrawerOpen = !self.rightDrawerOpen;
      }
    },
    components: {
      AppName,
      Menu,
      WebChatSessions,
    }
  }
</script>