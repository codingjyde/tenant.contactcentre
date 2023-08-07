<template>
    <div>
        <q-list>
            <template v-for="(message, index) in messages" v-bind:key="message.sessionId">
                <q-item clickable v-ripple class="q-pl-none" v-on:click="onSelected(message.sessionId)">
                    <q-item-section>
                        <q-item-label lines="1" v-if="message.isRead">{{ message.contact.firstName }} {{ message.contact.surname }}</q-item-label>
                        <q-item-label class="text-bold" lines="1" v-else>{{ message.contact.firstName }} {{ message.contact.surname }}</q-item-label>
                        <q-item-label caption lines="1" v-if="message.isRead">{{ message.sender.name }}: {{ message.content }}</q-item-label>
                        <q-item-label class="text-bold" caption lines="1" v-else>{{ message.sender.name }}: {{ message.content }}</q-item-label>
                        <q-item-label caption>{{ $formatDate(message.createdAt) }}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-separator class="q-mr-md" v-if="messages.length - 1 > index" />
            </template>
        </q-list>
    </div>
</template>

<script>
    import ChatsView from "src/constants/chats_view";

    import WebChatMemberRole from "../../../../api/constants/web_chat_member_role";

    import WebChatSession from '../../models/web_chat_session';
    import WebChatMessage from '../../models/web_chat_message';

    export default {
        name: "ChatItems",
        data: function() {
            return {
            
            }
        },
        computed: {
            messages: function() {
                const self = this;
                
                try {
                    let messages = [];

                    for (const session of self.sessions) {
                        const message = WebChatMessage.query().where('sessionId', session.$id).orderBy("updatedAt").last();
                        if(message) {
                            message.contact = session.members.find(x => x.role === WebChatMemberRole.CONTACT);
                            messages.push(message);               
                        } 
                    }

                    messages.sort((a,b) => b.updatedAt - a.updatedAt);

                    return messages;
                } catch (error) {
                    self.$handle(error);
                }
            },
            sessions: function() {
                const self = this;
                
                try {
                    return WebChatSession.query().withAll().get();
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        created: async function() {
            const self = this;
            
            try {
                self.loadData();
            } catch (error) {
                self.$handle(error);
            }
        },
        methods: {
            getLastMessage: function(sessionId) {
                const self = this;
                
                try {
                    return WebChatMessage.all()[0];
                } catch (error) {
                    self.$handle(error);
                }
            },
            loadData: async function() {
                const self = this;
            
                try {
                    
                    
                } catch (error) {
                    self.$handle(error);
                }
            },
            onSelected: function(sessionId) {
                const self = this;
                
                try {
                    self.$emit("itemSelected", sessionId);
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        components: {
        
        },
        watch: {
            view: function() {
                const self = this;
            
                try {
                    self.loadData();
                } catch (error) {
                    self.$handle(error);
                }       
            }
        },
        props: {
            view: Number
        }
    }
</script>