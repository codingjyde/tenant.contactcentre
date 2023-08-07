<template>
  <div>
    <q-card flat>
      <q-card-section class="q-py-sm" style="height: 56px;">
        <div class="text-h6">{{ contact.firstName }} {{ contact.surname }}</div>
        <div class="text-caption">{{ contact.emailAddress }}</div>
      </q-card-section>
      <q-card-section class="q-py-sm" style="height: 298px; overflow-y: scroll;" >
        <div v-for="message in messages" v-bind:key="message.id">
          <div class="row q-mb-md">
            <div v-bind:class="message.gridCss">
              <q-card v-bind:class="message.cardColorCss" class="q-pa-xs">
                <q-card-section class="q-pa-xs">
                    <div class="row text-caption">
                        <div class="col">
                            <div class="ellipsis text-bold">{{ message.sender.name }}</div>
                        </div>
                        <div class="col-auto">
                            <div>{{ $formatDate(message.createdAt) }}</div>
                        </div>
                    </div>
                    {{ message.content }}
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-py-sm" style="height: 56px;">
        <q-input dense outlined rounded placeholder="Message" v-model="messageText" v-on:keyup.enter.native.prevent="onEnter" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  import SocketMessages from "../../../../api/constants/socket_messages";
  import WebChatMemberRole from "../../../../api/constants/web_chat_member_role";
  import WebChatMessageType from "../../../../api/constants/web_chat_message_type";

  import WebChatMessage from '../../models/web_chat_message';
  import WebChatSession from '../../models/web_chat_session';

  export default {
    name: "ChatItem",
    data: function() {
      return {
        messageText: "",
      }  
    },
    computed: {
      ...mapGetters({
        emailAddress: "security/emailAddress",
        firstName: "security/firstName",
        organisationId: "security/organisationId",
        surname: "security/surname",
      }),
      contact: function() {
        const self = this;
        
        try {
          return self.session.members.find(x => x.role === WebChatMemberRole.CONTACT);
        } catch (error) {
          self.$handle(error);
        }
      },
      messages: function() {
        const self = this;
        
        try {
          return self.session.messages.map(x => {
            return {
              id: x.id,
              content: x.content,
              gridCss: (x.sender.emailAddress === self.emailAddress) ? [ "offset-xs-3", "col-xs-9" ] : [ "col-xs-9" ],
              cardColorCss: (x.type === WebChatMessageType.SYSTEM) ? "bg-grey-11" : (x.sender.emailAddress === self.emailAddress) ? "bg-green-1" : "bg-blue-1",
              sender: x.sender,
              createdAt: x.createdAt
            }
          })
        } catch (error) {
          self.$handle(error);
        }
      },
      session: function() {
        const self = this;
        
        try {
          return WebChatSession.query().withAll().where("id", self.id).first();
        } catch (error) {
          self.$handle(error);
        }
      }
    },
    methods: {
      onEnter: async function() {
        const self = this;
        
        try {
          if(!self.messageText) {
            return;
          }

          const organisationId = self.organisationId;
          const sessionId = self.id;
          const messageId = self.$getUUID();
          const content = self.messageText;
          const type = WebChatMessageType.TEXT;
          const name = `${ self.firstName } ${ self.surname }`;
          const emailAddress = self.emailAddress;
          const now = Date.now();

          const message = {
            id: messageId,
            organisationId,
            sessionId,
            content,
            sender: {
              name,
              emailAddress
            },
            readReceipts: [],
            type,
            createdAt: now,
            updatedAt: now,
          }

          WebChatMessage.insert({
            data: message
          });          
          
          self.messageText = "";

          self.$socket.emit(SocketMessages.WEB_CHAT_MESSAGE, {
            organisationId,
            sessionId, 
            messageId, 
            content, 
            type,
            sender: {
                name,
                emailAddress
            },
          });
        } catch (error) {
          self.$handle(error);
        }
      }
    },
    props: {
      id: String
    }
  }
</script>