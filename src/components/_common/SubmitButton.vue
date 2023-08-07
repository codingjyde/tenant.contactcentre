<template>
    <div>
        <q-btn disabled no-caps class='full-width' color='primary' v-if="isBusy">
            <i>Busy, please wait...</i>
        </q-btn>
        <q-btn no-caps class='full-width' v-bind:label='label' type='submit' color='primary' v-else />            
    </div>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent ({
        props: {
            isBusy: Boolean,
            label: String
        }
    })
</script>