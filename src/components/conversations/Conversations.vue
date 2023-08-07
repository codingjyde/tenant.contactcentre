<template>
    <div>
        <q-list v-for="conversation in conversations" v-bind:key="conversation.id">
            <q-item clickable class="q-pa-sm" v-bind:class="getItemCss(conversation)" v-on:click="onClick(conversation)">
                <q-item-section>
                    <div class="row justify-between">
                        <q-item-label caption lines="1" v-if="conversation.channelAccount">
                            <q-icon v-bind:name="conversation.channelAccount.icon" /> &nbsp;
                            {{ conversation.channelAccount.name }}
                        </q-item-label>
                        <q-badge color="primary" label="2" v-if="false" />
                    </div>
                    <div class="row justify-between">
                        <q-item-label v-if="conversation.contactAccount">
                            {{ conversation.contactAccount.name }}
                        </q-item-label>
                        <q-item-label caption v-if="conversation.lastConversationItem">{{ $formatDate(conversation.lastConversationItem.dateSent) }}</q-item-label>
                    </div>
                    <q-item-label caption lines="1" v-if="conversation.lastConversationItem">
                        {{ conversation.lastConversationItem.text }}
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<script>
    import Conversation from "src/models/conversation";

    export default {
        name: "Conversations",
        data: function() {
            return {
                conversation: null,
            }
        },
        computed: {
            conversations: function() {
                const self = this;
                
                const items = Conversation.query()
                    .with([ "channelAccount", "contactAccount.contact", "conversationItems" ])
                    .get();
                items.sort((a, b) => {
                    if(a.lastConversationItem.dateSent < b.lastConversationItem.dateSent) {
                        return 1;
                    }

                    if(a.lastConversationItem.dateSent > b.lastConversationItem.dateSent) {
                        return -1;
                    }

                    return 0;
                });
                
                return items;
            }
        },
        created: function() {
            const self = this;
            
            try {
                if(self.conversations.length > 0) {
                    self.conversation = self.conversations[0];
                    self.$emit("selectionChanged", self.conversation.id);
                }
            } catch (error) {
                self.$handle(error);
            }
        },
        methods: {
            getItemCss: function(conversation) {
                const self = this;
                
                try {
                    if(self.conversation) {
                        if(self.conversation.id === conversation.id) {
                            return "bg-blue-grey-1 selected"
                        }
                    }

                    return "";
                } catch (error) {
                    self.$handle(error);
                }
            },
            onClick: function(conversation) {
                const self = this;
                
                try {
                    self.conversation = conversation;
                    self.$emit("selectionChanged", self.conversation.id);
                } catch (error) {
                    self.$handle(error);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .selected {
        border-left-style: solid;
        border-left-width: 2px;
        border-color: $primary;
    }
</style>