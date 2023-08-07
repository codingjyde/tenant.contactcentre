<template>
    <q-badge v-bind:color="colour">
        {{ label }}
    </q-badge>
</template>

<script>
    import DomainStatus from "src/constants/domain_status";

    export default {
        name: "DomainStatusBadge",
        computed: {
            colour: function() {
                const self = this;

                switch(self.value) {
                    case DomainStatus.FAILED:
                        return "negative";
                    case DomainStatus.VERIFIED:
                        return "positive";
                    case DomainStatus.PENDING:
                        return "blue-grey-12";
                }

                return "";
            },
            label: function() {
                const self = this;

                switch(self.value) {
                    case DomainStatus.FAILED:
                        return "Failed";
                    case DomainStatus.VERIFIED:
                        return "Verified";
                    case DomainStatus.PENDING:
                        return "Pending";
                }

                return "";
            },
        },
        props: {
            value: Number
        }
    }
</script>