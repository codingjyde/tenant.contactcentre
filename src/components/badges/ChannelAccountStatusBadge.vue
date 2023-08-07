<template>
    <q-badge v-bind:color="colour">
        {{ label }}
    </q-badge>
</template>

<script>
    import ChannelAccountStatus from "../../constants/channel_account_status";

    export default {
        name: "ChannelAccountStatus",
        computed: {
            colour: function() {
                const self = this;

                switch(self.value) {
                    case ChannelAccountStatus.ACTIVE:
                        return "green-10";
                    case ChannelAccountStatus.SUSPENDED:
                        return "blue-grey-12";
                }

                return "";
            },
            label: function() {
                const self = this;

                switch(self.value) {
                    case ChannelAccountStatus.ACTIVE:
                        return "Active";
                    case ChannelAccountStatus.SUSPENDED:
                        return "Suspended";
                }

                return "";
            },
        },
        props: {
            value: Number
        }
    }
</script>