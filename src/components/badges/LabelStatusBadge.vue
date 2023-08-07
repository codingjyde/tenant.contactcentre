<template>
    <q-badge v-bind:color="colour">
        {{ label }}
    </q-badge>
</template>

<script>
    import { defineComponent } from "vue";

    import LabelStatus from "src/constants/label_status";

    export default defineComponent({
        name: "LabelStatus",
        computed: {
            colour: function() {
                const self = this;

                switch(self.value) {
                    case LabelStatus.ACTIVE:
                        return "green-10";
                    case LabelStatus.SUSPENDED:
                        return "blue-grey-12";
                }

                return "";
            },
            label: function() {
                const self = this;

                switch(self.value) {
                    case LabelStatus.ACTIVE:
                        return "Active";
                    case LabelStatus.SUSPENDED:
                        return "Suspended";
                }

                return "";
            },
        },
        props: {
            value: Number
        }
    }) 
</script>