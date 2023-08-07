<template>
    <div class="q-pa-lg flex flex-center" v-if="pages > 1">
        <q-pagination boundary-numbers v-bind:max="pages" v-bind:max-pages="10" v-bind:model-value="page" v-on:update:model-value="onUpdate" />
    </div>
</template>

<script>
    import { defineComponent } from "vue";
    
    export default defineComponent({
        name: "Paginator",
        data: function() {
            return {
                
            }
        },
        methods: {
            onUpdate: function(page) {
                const self = this;
                
                try {
                    self.$emit("updated", page);
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        props: {
            page: Number,
            pages: Number
        }
    })
</script>