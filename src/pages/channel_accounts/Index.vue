<template>
    <div>
        <Header title='Channel Accounts' />

        <div v-if="isBusy">
            <Busy />
        </div>
        <div v-else>
            <div class="row q-col-gutter-md">
                <div class="col-sm-4 col-12">
                    <EmailAccounts />                    
                </div>
                <div class="col-sm-4 col-12">
                    <TelephonyAccounts />                    
                </div>
                <div class="col-sm-4 col-12">
                    <WebChatAccounts />                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ChannelAccount from 'src/models/channel_account';

    import Busy from 'src/components/_common/Busy.vue';
    import EmailAccounts from "../../components/channel_accounts/email_accounts/List.vue";
    import Header from '../../components/_common/Header.vue';
    import TelephonyAccounts from "../../components/channel_accounts/telephony_accounts/List.vue";
    import WebChatAccounts from "../../components/channel_accounts/web_chat_accounts/List.vue";

    export default {
        name: 'LabelsIndex',
        data: function() {
            return {
                isBusy: true,
            }
        },
        created: async function() {
            const self = this;
            
            try {
                self.isBusy = true;

                ChannelAccount.deleteAll(); 
                
                const config = {
                    method: 'get',
                    url: '/channelaccounts',
                    params: {
                        page: 1,
                        size: 1024
                    }
                };

                const response = await self.$api(config);

                const data = response.data.items.map(x => {
                    return {
                        id: x.id,
                        organisationId: x.organisationId,
                        name: x.name,
                        data: x.data,
                        type: x.type,
                        status: x.status,
                        createdAt: x.createdAt,
                        updatedAt: x.updatedAt,
                    }
                })

                ChannelAccount.insert({
                    data
                })            
            } catch (error) {
                self.$handle(error);
            } finally {
                self.isBusy = false;
            }
        },
        methods: {
            onUpdated: function(page) {
                const self = this;
                
                try {
                    self.loadData(page);
                } catch (error) {
                    self.$handle(error);
                } finally {
                    self.isBusy = false;
                }
            }
        },
        components: {
            Busy,
            EmailAccounts,
            Header,
            TelephonyAccounts,
            WebChatAccounts,
        }
    }
</script>