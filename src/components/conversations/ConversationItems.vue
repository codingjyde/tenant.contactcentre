<template>
    <div class="q-px-sm q-py-none q-mb-sm" v-if="conversation">
        <div class="text-caption" v-if="conversation.channelAccount">
            <q-icon v-bind:name="conversation.channelAccount.icon"/>
            {{ conversation.channelAccount.name }} - {{ conversation.channelAccountValue }}
        </div>
        <div class="text-h6" v-if="conversation.contactAccount">
            {{ conversation.contactAccount.name }}
        </div>
        <div class="q-mt-sm" v-for="item in conversation.conversationItems" v-bind:key="item.id">
            <Email v-bind:itemId="item.id" />
        </div>                             
    </div>
</template>

<script>
    import Conversation from 'src/models/conversation';

    import Email from "./posts/Email.vue";

    export default {
        name: "ConversationItems",
        data: function() {
            return {
                splitterModel: 200,
            }
        },
        computed: {
            conversation: function() {
                const self = this;
                
                try {
                    if(self.conversationId) {
                        return Conversation.query().whereId(self.conversationId)
                            .with([ "channelAccount", "contactAccount.contact", "conversationItems" ])
                            .first();
                    }

                    return null;
                } catch (error) {
                    self.$handle(error);
                }
            }            
        },
        components: {
            Email
        },
        props: {
            conversationId: String
        }
    }
</script>