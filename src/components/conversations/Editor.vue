<template>
    <q-card class="q-ma-sm">
        <q-tabs active-color="primary" align="left" indicator-color="primary" v-model="tab">
            <q-tab no-caps name="reply" label="Reply" />
            <q-tab no-caps name="private-note" label="Private Note" />
        </q-tabs>
        
        <QuillEditor style="height: 79px;" v-model:content=editor content-type="html" />
        
        <q-card-actions dense align="right" class="text-caption">
            <q-checkbox color="red" label="Enter to send" size="xs" v-model="enterToSend" />
            &nbsp;&nbsp;&nbsp;
            <q-btn flat no-caps color="primary">Send</q-btn>
        </q-card-actions>
    </q-card>
</template>

<script>
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';

    const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  // ... add more users
];

    const Tabs = {
        REPLY: "reply",
        PRIVATE_NOTE: "private-note"
    }

    export default {
        name: "ConversationItemEditor",
        data: function() {
            return {
                enterToSend: true,
                tab: Tabs.REPLY,
                editor: "What you see is <b>what</b> you get..."
            }
        },
        mounted: function() {
            const self = this;
            
            try {
                
            } catch (error) {
                self.$handle(error);
            }
        },
        computed: {
            placeholder: function() {
                const self = this;
                
                try {
                    return self.enterToSend ? "Shift+Enter for new line. Start with '/' to select a Snippet." : "Start with '/' to select a Snippet."
                } catch (error) {
                    self.$handle(error);
                }
            },
            
        },
        components: {
            QuillEditor
        },
    }
</script>