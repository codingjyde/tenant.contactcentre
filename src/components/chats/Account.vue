<template>
    <q-card bordered style="width:600px; height:480px; position: absolute;" 
        v-bind:style="{ top: account.position.y + 'px', left: account.position.x  + 'px', 'z-index': account.z }" v-bind:disable="dragging" 
        v-touch-pan.prevent.mouse="onMove">

        <q-card-section class="q-pt-none q-ma-none">
            <div class="full-width row justify-between q-py-sm">
                <div class="text-h6">
                    Chats - {{ account.name }}
                </div>
                
                <div>
                    <q-btn flat icon="fa-solid fa-xmark" padding="xs" size="sm" v-on:click="onClose"></q-btn>
                </div>
            </div>

            <div class="text-caption">
                <a v-bind:href="account.url" target="_blank">{{ account.url }}</a>
            </div>
        </q-card-section>

        <q-card-section class="q-pa-none q-ma-none text-caption">
            <q-radio dense keep-color class="q-ml-md" color="red" size="xs" label="Mine" v-bind:val="ChatsView.MINE" v-model="chatsView" />
            &nbsp;
            <q-radio dense keep-color color="red" size="xs" label="Not Mine" v-bind:val="ChatsView.NOT_MINE" v-model="chatsView" />
            &nbsp;
            <q-radio dense keep-color color="red" size="xs" label="Unassigned" v-bind:val="ChatsView.UNASSIGNED" v-model="chatsView" />    
        </q-card-section>

        <q-card-section class="q-pa-none q-ma-none">
            <div class="row q-mt-sm">
                <div class="col-4" style="height: 352px; overflow-y: scroll;">
                    <Items v-bind:chats-view="chatsView" />
                </div>
                <div class="col-8" style="height:352px; overflow-y: scroll;"><Item /></div>
            </div>
        </q-card-section>
    </q-card>
</template>

<script>
    import ChatsView from '../../constants/chats_view';

    import Items from './Items.vue';

    export default {
        name: "WebChatAccountCard",
        data: function() {
            return {
                chatsView: ChatsView.MINE,
                dragging: false,

                ChatsView
            }
        },
        methods: {
            onClose: function() {
                const self = this;
                
                try {
                    self.$emit("close");
                } catch (error) {
                    self.$handle(error);
                }
            },
            onMove: async function(evt) {
                const self = this;

                try {
                    self.dragging = evt.isFirst !== true && evt.isFinal !== true

                    self.account.position.x = self.account.position.x + evt.delta.x;
                    self.account.position.y = self.account.position.y + evt.delta.y;

                    self.$emit("move");
                } catch (error) {
                    self.$handle(error);
                }
            },
        },
        props: {
            account: Object
        },
        components: {
            Items
        }
    }
</script>