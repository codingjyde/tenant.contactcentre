<template>
    <div>
        <Header v-bind:title="'Domain - ' + name" v-if="!isBusy" />

        <div v-if="isBusy">
            <Busy />
        </div>
        <div v-else>
            <q-breadcrumbs class="q-mb-md">
                <q-breadcrumbs-el label="Domains" to="/domains" />
                <q-breadcrumbs-el v-bind:label="name" />
            </q-breadcrumbs>
                
                    
            <div class="row q-col-gutter-md">
                <div class="col-sm-4 col-xs-12">
                    <q-banner dense class="bg-blue-grey-11 text-caption q-mb-md" v-if="showCode">
                        To complete the verification of your ownership of this domain, please add the following DNS records to your domain's DNS settings.
                        The specific steps may vary depending on your DNS provider.
                    </q-banner>
                
                    <q-card class="q-mb-md">
                        <q-card-section class="q-pb-none">
                            <div class="text-h6">Details</div>
                        </q-card-section>
                        <q-list class="dense">
                            <q-item>
                                <q-item-section>
                                    <q-item-label caption>Name</q-item-label>
                                    <q-item-label>{{ name }}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-for="(record, index) in records" v-bind:key="record.id">
                                <q-item-section>
                                    <q-item-label caption>Record {{ index + 1 }}</q-item-label>
                                    <q-item-label class="ellipsis">Type: {{ record.type }}</q-item-label>
                                    <q-item-label v-if="record.name">Name: {{ record.name }}</q-item-label>
                                    <q-item-label class="ellipsis">Value: {{ record.value }}</q-item-label>
                                    <q-item-label v-if="record.priority">Priority: {{ record.priority }}</q-item-label>
                                </q-item-section>

                                <q-item-section side>
                                    <q-item-label caption>
                                        <q-icon color="primary" name="fa-solid fa-copy" style="cursor: pointer;" v-on:click="onCopy(record.value)" />
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <q-item-label caption>Status</q-item-label>
                                    <q-item-label>
                                        <DomainStatusBadge v-bind:value="status"/>
                                    </q-item-label> 
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="text-right">
                                    <q-item-label>
                                        <span v-if="showCode">
                                            <q-btn flat no-caps color="primary" v-on:click="onVerifyDomain" v-if="verificationLinkAvailable">
                                                Verify Domain
                                            </q-btn>
                                            <q-btn disabled flat no-caps color="primary" v-else>Please wait... {{ verificationTimer  }}</q-btn>
                                        </span>
                                        
                                        <q-btn flat no-caps color="primary" v-on:click="onShowDialog">Delete</q-btn>

                                        <ConfirmDialog ok="Yes" cancel="No" message="Are you sure you want to delete this domain? You won't be able to undo this action." 
                                            v-bind:show="showDialog" v-on:ok="onDelete" v-on:cancel="showDialog = false;" />
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
    import DomainStatus from "src/constants/domain_status";

    import ConfirmDialog from "src/components/dialogs/ConfirmDialog.vue";
    import Busy from "src/components/_common/Busy.vue";
    import Header from '../../components/_common/Header.vue';
    import DomainStatusBadge from "src/components/badges/DomainStatusBadge.vue";

    let timer = null;

    export default {
        name: 'DomainItem',
        data: function() {
            const self = this;
            
            return {
                id: self.$route.params.id,
                name: '',
                records: [],
                status: DomainStatus.PENDING,

                isBusy: false,
                showDialog: false,

                verificationLinkAvailable: true,
                verificationTimer: 60,
            }
        },
        computed: {
            showCode: function() {
                const self = this;
                
                try {
                    return self.status !== DomainStatus.VERIFIED;
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
                    url: `/domains/${ self.id }`,
                };

                const response = await self.$api(config);

                self.name = response.data.name;
                self.records = response.data.records;
                self.status = response.data.status;
            } catch (error) {
                self.$handle(error);
            } finally {
                self.isBusy = false;
            }
        },
        methods: {
            disableLink: function() {
                const self = this;
                
                try {
                    self.verificationLinkAvailable = false;
                    self.verificationTimer = 10;

                    const countdown = function() {
                        self.verificationTimer --;

                        if(self.verificationTimer === 0) {
                            clearInterval(timer);
                             
                            self.verificationLinkAvailable = true;
                        }
                    }

                    timer = setInterval(countdown, 1000);
                } catch (error) {
                    self.$handle(error);
                }
            },
            onCopy: async function(value) {
                const self = this;
                
                try {
                    await navigator.clipboard.writeText(value);

                    self.$q.notify({
                        type: "positive",
                        message: "Value has been copied to the clipboard.",
                        position: "center"
                    });
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
                        url: `/domains/${ self.$route.params.id }`,
                    };

                    await self.$api(config);

                    self.$router.push("/domains");

                } catch (error) {
                    self.$handle(error);
                } finally {
                    self.showDialog = false;
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
            },
            onVerifyDomain: async function() {
                const self = this;
                
                try {
                    self.isBusy = true;

                    const config = {
                        method: 'post',
                        url: `/domains/verify/${ self.$route.params.id }`,
                    };

                    const response = await self.$api(config);

                    self.status = response.data.status;

                    if(self.status === DomainStatus.VERIFIED) { 
                        self.$q.notify({
                            type: "positive",
                            message: "The domain name has been verified.",
                            position: "center"
                        });
                    } else {
                        self.$q.notify({
                            type: "negative",
                            message: "The domain name was not verified.",
                            position: "center"
                        });

                        self.disableLink();
                    }
                } catch (error) {
                    self.disableLink();
                    self.$handle(error);
                } finally {
                    self.isBusy = false;
                }
            }
        },
        components: {
            Busy,
            ConfirmDialog,
            DomainStatusBadge,
            Header,
        },
    }
</script>