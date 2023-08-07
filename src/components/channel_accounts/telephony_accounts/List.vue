<template>
    <div>
        <div v-if="isBusy">
            <Busy />
        </div>
        <div v-else>
            <q-list bordered padding class="bg-white">
                <q-item>
                    <q-item-section>
                        <q-item-label><b>Telephony Accounts</b></q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-item-label caption>
                            <router-link disabled to="/telephonyaccounts/create">Create</router-link>
                        </q-item-label>
                    </q-item-section>
                </q-item>

                <q-item v-if="rows.length > 0">
                    <q-item-section>
                        <q-item-label>Single line item</q-item-label>
                        <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item v-else>
                    <q-item-section>
                        <NoData />
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </div>
</template>

<script>
    import Busy from '../../_common/Busy.vue';
    import NoData from '../../_common/NoData.vue';
    
    export default {
        name: "TelephonyAccounts",
        data: function() {
            return {
                rows: [],

                isBusy: true,
            }
        },
        created: function() {
            const self = this;
            
            try {
                self.isBusy = true;
                
            } catch (error) {
                self.$handle(error);
            } finally {
                self.isBusy = false;
            }
        },
        components: {
            Busy,
            NoData
        }
    }
</script>