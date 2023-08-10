<template>
    <div>
        <Header v-bind:title="'Telephony Account - ' + name" v-if='!isBusy' />

        <div v-if='isBusy'>
            <Busy />
        </div>
        <div v-else>
            <q-breadcrumbs class='q-mb-md'>
                <q-breadcrumbs-el label='Channel Accounts' to='/channelaccounts' />
                <q-breadcrumbs-el v-bind:label='name' />
            </q-breadcrumbs>

            <q-banner class="bg-grey-2" v-if="showBanner">
                <template v-slot:avatar>
                    <q-icon name="fa-solid fa-gears" color="primary" />
                </template>
                We're working to complete the activation of your telephone lines. Please be patient. You can go ahead to configure details about your call centre.
                <template v-slot:action>
                    <q-btn flat no-caps color="primary" label="Dismiss" v-on:click="onDismissBanner" />
                </template>
            </q-banner>
            <div class='row'>
                <div class='col-sm-4 col-xs-12'>
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
                                    <q-item-label caption>Sub-Domain</q-item-label>
                                    <q-item-label lines="1">{{ subDomain }}</q-item-label>
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
                                        <q-btn flat no-caps color='primary' v-on:click='onShowDialog'>Delete</q-btn>

                                        <ConfirmDialog ok='Yes' cancel='No'
                                            message="Are you sure you want to delete this telephony account? You won't be able to undo this action."
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
                subDomain: "",
                setupCompleted: false,
                status: ChannelAccountStatus.SUSPENDED,

                bannerDismissed: false,
                isBusy: false,
                showDialog: false,
            }
        },
        computed: {
            showBanner: function() {
                const self = this;

                try {
                    if(self.setupCompleted) {
                        return false;
                    }

                    return !self.bannerDismissed;
                } catch (error) {
                    self.$handle(error);
                }
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
                self.subDomain = response.data.data.subDomain;
                self.setupCompleted = response.data.setupCompleted;
                self.status = response.data.status;
            } catch (error) {
                self.$handle(error);
            } finally {
                self.isBusy = false;
            }
        },
        methods: {
            onDismissBanner: function() {
                const self = this;

                try {
                    self.bannerDismissed = true;
                } catch (error) {
                    self.$handle(error);
                }
            },
            onDelete: async function() {
                const self = this;

                try {
                    self.isBusy = true;

                    const config = {
                        method: 'delete',
                        url: `/channelaccounts/${ self.id }`,
                    };

                    const response = await self.$api(config);

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
