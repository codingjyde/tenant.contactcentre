<template>
    <div>
        <Header title='Create Email Account' />

        <div class='row'>
            <div class='col-sm-4'>
                <q-form class='q-gutter-sm' v-on:submit='onSubmit'>
                    <div>
                        <q-input dense outlined label='Name' maxlength='64' v-model='name' />
                        <div class='text-caption text-negative'>{{ validation.firstError('name') }}</div>
                    </div>
                    <div>
                        <div class="row q-gutter-sm">
                            <div class="col">
                                <q-input dense outlined label='Address' maxlength='64' v-model='local' />
                                <div class='text-caption text-negative'>{{ validation.firstError('local') }}</div>
                            </div>
                            <div class="col">
                                <q-select dense outlined label="Domain" v-bind:options="domains" v-model="domain" />
                                <div class='text-caption text-negative'>{{ validation.firstError('domain') }}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <q-btn disabled no-caps class='full-width' color='primary' v-if='isBusy'>
                            <i>Busy, please wait...</i>
                        </q-btn>
                        <q-btn no-caps class='full-width' label='Submit' type='submit' color='primary' v-else />
                        <q-btn flat no-caps class='full-width' label='Cancel' color='primary' to='/channelaccounts' />
                    </div>
                </q-form>
            </div>
        </div>
    </div>
</template>

<script>
    import Channel from 'src/constants/channel';
    import DomainStatus from 'src/constants/domain_status';

    import ChannelAccount from '../../models/channel_account';

    import ConfirmDialog from "src/components/dialogs/ConfirmDialog.vue";
    import Header from '../../components/_common/Header.vue';

    export default {
        name: 'EmailAccountCreate',
        data: function() {
            return {
                name: '',
                local: '',
                domain: '',

                domains: [],

                isBusy: false,
            }
        },
        validators: {
            name: function(value) {
                const self = this;
                return self.$validator.value(value)
                    .required('Please provide a name for this email account.');
            },
            local: function(value) {
                const self = this;
                return self.$validator.value(value)
                    .required('Please provide an address for this email account.');
            },
            domain: function(value) {
                const self = this;
                return self.$validator.value(value)
                    .required('Please provide a domain for this email account.');
            },
        },
        created: async function() {
            const self = this;
            
            try {
                const config = {
                    method: 'get',
                    url: `/domains/all/${ DomainStatus.VERIFIED }`,
                    params: {
                        page: 1,
                        size: 128
                    }
                };

                const response = await self.$api(config);
                
                self.domains = response.data.items.map(x => {
                    return {
                        label: `@${ x.name }`,
                        value: x.id,
                    }
                })

                if(self.domains.length === 0) {
                    self.$q.dialog({
                        title: self.$config.APP_NAME,
                        message: "There are no verified domains in the database."
                    }).onDismiss(() => {
                        self.$router.push("/channelaccounts");
                    })
                }
            } catch (error) {
                self.$handle(error);
            }
        },
        methods: {
            onSubmit: async function() {
                const self = this;

                try {
                    const succeeded = await self.$validate();
                    if(!succeeded) {
                        return false;
                    }

                    const data = {
                        name: self.name,
                        data: {
                            address: `${self.local}${self.domain.label}`,
                        },
                        type: Channel.EMAIL
                    };

                    const config = {
                        method: 'post',
                        url: '/channelaccounts', 
                        data
                    };

                    const response = await self.$api(config);

                    ChannelAccount.insert({
                        data: {
                            id: response.data.id,
                            organisationId: response.data.organisation,
                            name: response.data.name,
                            data: response.data.data,
                            type: response.data.type,
                            status: response.data.status,
                        }
                    });

                    self.$router.push(`/emailaccounts/${ response.data.id }`);
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        components: {
            ConfirmDialog,
            Header,
        },
    }
</script>