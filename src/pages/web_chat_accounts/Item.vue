<template>
    <div>
        <Header v-bind:title="'Web Chat Account - ' + name" v-if='!isBusy' />

        <div v-if='isBusy'>
            <Busy />
        </div>
        <div v-else>
            <div class='row'>
                <div class='col-sm-4 col-xs-12'>
                    <q-breadcrumbs class='q-mb-md'>
                        <q-breadcrumbs-el label='Channel Accounts' to='/channelaccounts' />
                        <q-breadcrumbs-el v-bind:label='name' />
                    </q-breadcrumbs>

                    <q-card>
                        <q-card-section class='q-pb-none'>
                            <div class='text-h6'>Details</div>
                        </q-card-section>
                        <q-list class='dense'>
                            <q-item>
                                <q-item-section>
                                    <q-item-label caption>Name</q-item-label>
                                    <q-item-label>{{ name }}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <q-item-label caption>Url</q-item-label>
                                    <q-item-label lines="1">{{ url }}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <q-item-label caption>Client ID</q-item-label>
                                    <q-item-label lines="1">{{ clientId }}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <q-item-label caption>Status</q-item-label>
                                    <q-item-label>
                                        <ChannelAccountStatusBadge v-bind:value="status" />
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class='text-right'>
                                    <q-item-label>
                                        <q-btn flat no-caps color='primary' v-bind:to="'/webchataccounts/edit/' + id">Edit</q-btn>
                                        <q-btn flat no-caps color='primary' v-on:click='onShowDialog'>Delete</q-btn>

                                        <ConfirmDialog ok='Yes' cancel='No'
                                            message="Are you sure you want to delete this web chat account? You won't be able to undo this action."
                                            v-bind:show='showDialog' v-on:ok='onDelete' v-on:cancel='showDialog = false;' />
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ChannelAccountStatus from "src/constants/channel_account_status";

    import ChannelAccount from "src/models/channel_account";

    import Busy from 'src/components/_common/Busy.vue';
    import ChannelAccountStatusBadge from 'src/components/badges/ChannelAccountStatusBadge.vue';
    import ConfirmDialog from 'src/components/dialogs/ConfirmDialog.vue';
    import Header from 'src/components/_common/Header.vue';

    export default {
        name: 'WebChatAccountItem',
        data: function() {
            const self = this;

            return {
                id: self.$route.params.id,
                name: "",
                url: "",
                clientId: "",
                status: ChannelAccountStatus.SUSPENDED,

                isBusy: false,
                showDialog: false,
            }
        },
        created: async function() {
            const self = this;

            try {
                self.isBusy = true;

                const config = {
                    method: 'get',
                    url: `/channelaccounts/${ self.id }`,
                };

                const response = await self.$api(config);

                self.name = response.data.name;
                self.url = response.data.data.url;
                self.clientId = response.data.data.clientId;
                self.status = response.data.status;

                
            } catch (error) {
                self.$handle(error);
            } finally {
                self.isBusy = false;
            }
        },
        methods: {
            onDelete: async function() {
                const self = this;

                try {
                    self.isBusy = true;

                    const config = {
                        method: 'delete',
                        url: `/channelaccounts/${ self.id }`,
                    };

                    const response = await self.$api(config);

                    console.log(response.data);

                    self.$router.push('/channelaccounts');
                } catch (error) {
                    self.$handle(error);
                } finally {
                    self.isBusy = false;
                }
            },
            onShowDialog: function() {
                const self = this;

                try {
                    self.showDialog = true;
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        components: {
            Busy,
            ChannelAccountStatusBadge,
            ConfirmDialog,
            Header,
        },
    }
</script>