<template>
    <div>
        <Header title='Create Web Chat Account' />

        <div class='row'>
            <div class='col-sm-3'>
                <q-form class='q-gutter-sm' v-on:submit='onSubmit'>
                    <div>
                        <q-input dense outlined label='Name' maxlength='64' v-model='name' />
                        <div class='text-caption text-negative'>{{ validation.firstError('name') }}</div>
                    </div>
                    <div>
                        <q-input dense outlined label='Url' maxlength='2048' v-model='url' />
                        <div class='text-caption text-negative'>{{ validation.firstError('url') }}</div>
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
    import ChannelAccount from '../../models/channel_account';

    import Header from '../../components/_common/Header.vue';

    export default {
        name: 'WebChatAccountCreate',
        data: function() {
            return {
                name: '',
                url: '',

                isBusy: false,
            }
        },
        validators: {
            name: function(value) {
                const self = this;
                return self.$validator.value(value)
                    .required('Please provide a name for this web chat account.');
            },
            url: function(value) {
                const self = this;
                return self.$validator.value(value)
                    .required('Please provide a url for this web chat account.')
                    .url("Please provide a valid url.");
            },
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
                            url: self.url
                        },
                        type: Channel.WEB_CHAT
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

                    self.$router.push(`/webchataccounts/${ response.data.id }`);
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        components: {
            Header,
        },
    }
</script>