<template>
    <div>
        <Header title='Conversations' />

        <div v-if="conversations.length === 0">
            <NoData />
        </div>
        <div v-else-if="isBusy">
            <Busy />
        </div>
        <div v-else>
            <div class="gt-xs">
                <div class="row">
                    <div class="col-sm-3 col-xs-12">
                        <div class="q-pb-lg">
                            <div style="height: calc(100vh - 155px); overflow-y: auto;">
                                <Conversations v-on:selection-changed="onSelectionChanged" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-7 col-xs-12 borders">
                        <div class="q-pb-lg">
                            <div style="height: calc(100vh - 375px); overflow-y: auto;">
                                <ConversationItems v-bind:conversationId="conversationId" />
                            </div>
                            <div style="height: 237px; overflow-y: auto;">
                                <Editor />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-2 col-xs-12">
                        <div class="q-pb-lg">
                            <ContactInfo />
                        </div>
                    </div>
                </div>
            </div>
            <div class="xs">

            </div>
        </div>
    </div>
</template>

<script>
    import ConversationStatus from "src/constants/conversation_status";

    import ChannelAccount from '../../models/channel_account';
    import Contact from '../../models/contact';
    import ContactAccount from '../../models/contact_account';
    import Conversation from "src/models/conversation";
    import ConversationItem from '../../models/conversation_item';

    import Busy from '../../components/_common/Busy.vue';
    import ContactInfo from "src/components/conversations/ContactInfo.vue";
    import ConversationItems from '../../components/conversations/ConversationItems.vue';
    import Conversations from "../../components/conversations/Conversations.vue";
    import Editor from "src/components/conversations/Editor.vue";
    import Header from '../../components/_common/Header.vue';
    import NoData from '../../components/_common/NoData.vue';
    
    export default {
        name: "CoversationsIndex",
        data: function() {
            return {
                conversationId: "",
                
                isBusy: true,
                splitterModel: 300,
            }
        },
        computed: {
            conversations: function() {
                const self = this;
                
                try {
                    return Conversation.query()
                        .get();
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        mounted: async function() {
            const self = this;
            
            try {
                self.isBusy = true;

                Conversation.deleteAll();

                const status = ConversationStatus.INITIALISED 
                    || ConversationStatus.ACCEPTED
                    || ConversationStatus.IN_PROGRESS
                    || ConversationStatus.ABANDONED_BY_CONTACT
                    || ConversationStatus.ABANDONED_BY_AGENT;

                const config = {
                    method: 'get',
                    url: `/conversations/all/${ status }/${ Number.MAX_SAFE_INTEGER }`,
                    params: {
                        page: 1,
                        size: 1024
                    }
                };

                const response = await self.$api(config);

                const data = response.data.items;

                //console.log(data);

                const conversationItems = data.map(x => {
                    return {
                        id: x.id,
                        organisationId: x.organisation,
                        conversationId: x.conversation.id,
                        sender: x.sender,
                        text: x.text,
                        html: x.html,
                        mode: x.mode,
                        type: x.type,
                        dateSent: x.dateSent,
                        createdAt: x.createdAt,
                        updatedAt: x.updatedAt, 

                        conversation: x.conversation
                    }
                });
                ConversationItem.insert({
                    data: conversationItems
                });

                let conversations = conversationItems.map(x => {
                    return x.conversation
                })
                conversations = conversations.map(x => {
                    return {
                        id: x.id,
                        organisationId: x.organisation,
                        channelAccountId: x.channelAccount.id,
                        contactAccountId: x.contactAccount.id,
                        mergeId: x.mergeId,
                        status: x.status,
                        createdAt: x.createdAt,
                        updatedAt: x.updatedAt,

                        channelAccount: x.channelAccount,
                        contactAccount: x.contactAccount,
                    }
                })
                conversationItems.sort((a, b) => {
                    if(a.dateSent > b.dateSent) {
                        return 1;
                    }

                    if(a.dateSent < b.dateSent) {
                        return -1;
                    }

                    return 0;
                });
                Conversation.insert({
                    data: conversations
                })
                
                let channelAccounts = conversations.map(x => {
                    return x.channelAccount;
                });
                channelAccounts = channelAccounts.map(x => {
                    return {
                        id: x.id,
                        organisationId: x.organisation,
                        name: x.name,
                        data: x.data,
                        type: x.type,
                        status: x.status,
                        createdAt: x.createdAt,
                        updatedAt: x.updatedAt,   
                    }
                });
                channelAccounts = [...new Map(channelAccounts.map((x) => [x.id, x])).values()];
                ChannelAccount.insert({
                    data: channelAccounts
                });
                
                let contactAccounts = conversations.map(x => {
                    return x.contactAccount;
                });
                contactAccounts = contactAccounts.map(x => {
                    return {
                        id: x.id,
                        organisationId: x.organisation,
                        contactId: x.contact.id,
                        value: x.value,
                        isVerified: x.isVerified,
                        type: x.type,
                        createdAt: x.createdAt,
                        updatedAt: x.updatedAt,

                        contact: x.contact
                    }
                });
                contactAccounts = [...new Map(contactAccounts.map((x) => [x.id, x])).values()];
                ContactAccount.insert({
                    data: contactAccounts
                });

                let contacts = contactAccounts.map(x => {
                    return x.contact;
                });
                contacts = contacts.map(x => {
                    return {
                        id: x.id,
                        organisationId: x.organisation,
                        title: x.title,
                        firstName: x.firstName,
                        middleName: x.middleName,
                        surname: x.surname,
                        gender: x.gender,
                        createdAt: x.createdAt,
                        updatedAt: x.updatedAt,
                    }
                });
                Contact.insert({
                    data: contacts
                });

                console.log(contacts);
            } catch (error) {
                self.$handle(error);
            } finally {
                self.isBusy = false;
            }
        },
        methods: {
            onSelectionChanged: function(conversationId) {
                const self = this;
                
                try {
                    self.conversationId = conversationId;
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        components: {
            Busy,
            ContactInfo,
            Conversations,
            ConversationItems,
            Editor,
            Header,
            NoData
        }
    }
</script>

<style lang="scss" scoped>
    .borders {
        border-left-style: solid;
        border-left-width: 1px;
        border-left-color: $grey-4;

        border-right-style: solid;
        border-right-width: 1px;
        border-right-color: $grey-4;
    }
</style>