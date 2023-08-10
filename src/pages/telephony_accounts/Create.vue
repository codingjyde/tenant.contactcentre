<template>
    <div>
        <Header title='Create Telephony Account' />

        <div class="flex flex-center" style="height: calc(100vh - 240px)">
            <q-card class="bg-white" style="min-width:320px;">
                <q-card-section>
                    <q-form class='q-gutter-sm' v-on:submit='onSubmit'>
                        <div>
                            <q-input dense outlined label='Name' maxlength='64' v-model='name' />
                            <div class='text-caption text-negative'>{{ validation.firstError('name') }}</div>
                        </div>
                        <div>
                            <q-btn disabled no-caps class='full-width' color='primary' v-if='isBusy'>
                                <i>Busy, please wait...</i>
                            </q-btn>
                            <q-btn no-caps class='full-width' label='Submit' type='submit' color='primary' v-else />
                            <q-btn flat no-caps class='full-width' label='Cancel' color='primary' to='/channelaccounts' />
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
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
        name: 'TelephonyAccountCreate',
        data: function() {
            return {
                name: '',

                isBusy: false,
            }
        },
        validators: {
            name: function(value) {
                const self = this;
                return self.$validator.value(value)
                    .required('Please provide a name for this telephony account.');
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

                        },
                        type: Channel.TELEPHONY
                    };

                    const config = {
                        method: 'post',
                        url: '/channelaccounts',
                        data
                    };

                    const response = await self.$api(config);

                    self.$router.push(`/telephonyaccounts/${ response.data.id }`);
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
