import home from "./home";
import channelAccounts from "./channel_accounts";
import conversations from "./conversations";
import domains from "./domains";
import emailAccounts from "./email_accounts";
import labels from "./labels";
import webChatAccounts from "./web_chat_accounts";

export default home
    .concat(channelAccounts)
    .concat(conversations)
    .concat(domains)
    .concat(emailAccounts)
    .concat(labels)
    .concat(webChatAccounts);