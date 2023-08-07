import { createStore } from 'vuex';

import VuexORM from '@vuex-orm/core';

import security from './security';

import ChannelAccount from "src/models/channel_account";
import Contact from "src/models/contact";
import ContactAccount from 'src/models/contact_account';
import Conversation from "src/models/conversation";
import ConversationItem from 'src/models/conversation_item';
import WebChatMessage from 'src/models/web_chat_message';
import WebChatSession from 'src/models/web_chat_session';

const database = new VuexORM.Database();

database.register(ChannelAccount);
database.register(Contact);
database.register(ContactAccount);
database.register(Conversation);
database.register(ConversationItem);
database.register(WebChatMessage);
database.register(WebChatSession);

const store = createStore({
  modules: {
    security
  },
  plugins: [
    VuexORM.install(database)
  ],
  strict: process.env.DEBUGGING
});

export default store;