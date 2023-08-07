<template>
    <span v-if="label">
        <q-badge class="small-caps" v-bind:color="label.colour">
            {{ label.text }} <span class="cursor-pointer" v-if="removable" v-on:click="onRemove">&nbsp;&nbsp;<q-icon name="fa-solid fa-xmark" /></span>
        </q-badge>
    </span>
</template>

<script>
    export default {
        name: 'Label',
        data: function() {
            return {

            }
        },
        computed: {
            
        },
        created: function() {
            const self = this;

            try {

            } catch (error) {
                self.$handle(error);
            }
        },
        methods: {
            onRemove: function() {
                const self = this;
                
                try {
                    self.$emit("remove");
                } catch (error) {
                    self.$handle(error);
                }
            }    
        },
        props: {
            label: {
                required: true,
                type: Object
            },
            removable: {
                default: false,
                required: false,
                type: Boolean
            }
        },
        components: {
        
        },
    }
</script>