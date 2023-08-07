<template>
    <div class="bg-white q-pa-md">
        <div class="row">
            <div class="col">
                <div class="text-h6">Pick a Colour</div>
            </div>
            <div class="col-auto">
                <q-btn class="q-mt-xs" flat round dense icon="fa-solid fa-xmark" size="xs" v-close-popup />    
            </div>
            <div class="row q-col-gutter-sm">
                <div class="col-xs-1" v-for="colour in colours" v-bind:key="colour">
                    <q-btn round size="xs" v-bind:color="colour" v-on:click="onSelected(colour)">
                        <q-tooltip class="text-bold text-overline" anchor="center right" self="center right">
                            {{ colour }}
                        </q-tooltip>
                    </q-btn>
                </div>
            </div>
        </div>
    </div>
    <!-- <q-card>
        <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Pick a Colour</div>
            <q-space />
            <q-btn flat round dense icon="fa-solid fa-xmark" size="xs" v-close-popup />
        </q-card-section>
        <q-card-section class="q-pt-none">
            <div class="row q-col-gutter-xs">
                <div class="col-xs-1" v-for="colour in colours" v-bind:key="colour">
                    <q-btn round size="xs" v-bind:color="colour" v-on:click="onSelected(colour)"></q-btn>
                </div>
            </div>
        </q-card-section>
    </q-card> -->
</template>

<script>
    import { defineComponent } from 'vue';

    import Colours from 'src/constants/colours';

    export default defineComponent({
        name: 'ColourPicker',
        data: function() {
            return {
                colours: Colours
            }
        },
        created: function() {
            const self = this;
            
            try {
                
            } catch (error) {
                self.$handle(error);
            }
        },
        methods: {
            onSelected: function(colour) {
                const self = this;
                
                try {
                    self.$emit("selected", colour);
                } catch (error) {
                    self.$handle(error);
                }
            },
        }
    })
</script>