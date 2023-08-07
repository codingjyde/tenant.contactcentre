<template>
    <div>
        <div v-if="isBusy">
            <Busy />
        </div>
        <div v-else>
            <Header v-bind:title="'Edit Web Chat Account - ' + name" />

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
                            <span class="text-caption">Status</span>
                            <q-option-group inline v-model="status" v-bind:options="statuses" color="primary" />              
                            <div class='text-caption text-negative'>{{ validation.firstError('status') }}</div>
                        </div>
                        <div>
                            <q-btn disabled no-caps class='full-width' color='primary' v-if='isBusy'>
                                <i>Busy, please wait...</i>
                            </q-btn>
                            <q-btn no-caps class='full-width' label='Submit' type='submit' color='primary' v-else />
                            <q-btn flat no-caps class='full-width' label='Cancel' color='primary' v-bind:to="'/webchataccounts/' + id" />
                        </div>
                    </q-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ChannelAccountStatus from "src/constants/channel_account_status";

    import Busy from 'src/components/_common/Busy.vue';
    import Header from 'src/components/_common/Header.vue';
    
    export default {
        name: 'WebChatAccountEdit',
        data: function() {
            const self = this;

            return {
                id: self.$route.params.id,
                name: "",
                url: "",
                status: ChannelAccountStatus.SUSPENDED,

                statuses: [{
                    label: "Active",
                    value: ChannelAccountStatus.ACTIVE
                }, {
                    label: "Suspended",
                    value: ChannelAccountStatus.SUSPENDED
                }],
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
        created: async function() {
            const self = this;

            try {
                self.isBusy = true;

                const config = {
                    method: 'get',
                    url: `/webchataccounts/${ self.id }`,
                };

                const response = await self.$api(config);

                self.name = response.data.name;
                self.url = response.data.url;
                self.status = response.data.status;
            } catch (error) {
                self.$handle(error);
            } finally {
                self.isBusy = false;
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
                        url: self.url,
                        status: self.status,
                    };

                    const config = {
                        method: 'put',
                        url: `/webchataccounts/${ self.id }`,
                        data
                    };

                    const response = await self.$api(config);

                    self.$router.push(`/webchataccounts/${ response.data.id }`);
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        components: {
            Busy,
            Header,
        },
    }
</script>