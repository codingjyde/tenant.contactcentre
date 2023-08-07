<template>
    <q-badge v-bind:color="colour">
        {{ label }}
    </q-badge>
</template>

<script>
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "ColourBadge",
        props: {
            colour: String,
            label: String,
        }        
    })
</script>