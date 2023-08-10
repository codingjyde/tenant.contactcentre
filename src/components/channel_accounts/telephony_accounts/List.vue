<template>
    <q-list bordered padding class="bg-white" style="height: calc(100vh - 138px)">
        <q-item>
            <q-item-section>
                <q-item-label><b>Telephony Accounts</b></q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-item-label caption>
                    <router-link to="/telephonyaccounts/create">Create</router-link>
                </q-item-label>
            </q-item-section>
        </q-item>

        <q-item clickable v-for="row in rows" v-bind:key="row.id" v-bind:to="'/telephonyaccounts/' + row.id">
            <q-item-section>
                <q-item-label>{{ row.name }}</q-item-label>
                <q-item-label caption lines="1">
                    {{ row.data.subDomain }}
                </q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-item-label caption>
                    <router-link v-bind:to="'/telephonyaccounts/' + row.id">View</router-link>
                </q-item-label>
            </q-item-section>
        </q-item>
        <q-item v-if="rows.length === 0">
            <q-item-section>
                <NoData />
            </q-item-section>
        </q-item>
    </q-list>
</template>

<script>
    import Channel from 'src/constants/channel';

    import ChannelAccount from 'src/models/channel_account';

    import NoData from '../../_common/NoData.vue';

    export default {
        name: "TelephonyAccounts",
        computed: {
            rows: function() {
                return ChannelAccount.query().where(x => x.type === Channel.TELEPHONY).get();
            }
        },
        components: {
            NoData
        }
    }
</script>
