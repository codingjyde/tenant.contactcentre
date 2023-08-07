<template>
    <q-layout class="sf-ui-light" view="lHh Lpr lFf">
        <q-page-container>
            <q-page class="row" v-if="$q.screen.gt.xs">
                <q-page class="col bg-primary flex flex-center">
                    <div style="max-width:400px;">
                        <img class="filter-white" src="../../public/icon.svg" />
                        <AppName class="text-h2 text-white" />
                    </div>
                </q-page>
                <q-page class="col">
                    <q-page class="flex flex-center">
                        <router-view />
                        <div class="absolute-bottom text-caption text-center">
                            &copy; 2023 <a href="https://www.pronova.com.ng" target="_blank">Pronova Limited</a>. All rights reserved.
                        </div>
                    </q-page>
                </q-page>
            </q-page>
            <q-page v-else>
                <div class="bg-primary flex flex-center" style="height: 20vh;">
                    <div class="text-center vertical-middle" style="max-width:300px;">
                        <img class="filter-white" src="../../public/icon.svg" style="max-width:40px;" />
                        <br/>
                        <AppName class="text-h4 text-white" />
                    </div>
                </div>
                <div class="flex flex-center" style="height: 80vh;">
                    <div class="q-px-md">
                        <router-view />
                        <div class="absolute-bottom text-caption text-center">
                            &copy; 2023 <a href="https://www.pronova.com.ng" target="_blank">Pronova Limited</a>. All rights reserved.
                        </div>
                    </div>      
                </div>
            </q-page>    
        </q-page-container>
    </q-layout>
</template>
  
<script>
    import AppName from "src/components/_common/AppName.vue";
  
    export default {
        name: 'SecurityLayout',
        data: function() {
            return {
        
            }
        },
        methods: {
            
        },
        components: {
            AppName
        }
    }
</script>