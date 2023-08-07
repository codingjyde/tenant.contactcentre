<template>
    <div>
        <q-page-sticky position="bottom-right" v-bind:offset="pos" v-bind:disable="dragging" v-touch-pan.prevent.mouse="onMove">
            <q-card bordered class="" style="width:640px; height:480px;" v-if="sessionsVisible">
                <q-card-section>
                    <div class="row justify-between">
                        <div class="text-h6">
                            Chats
                        </div>
                    
                        <div class="text-caption">
                            <q-radio dense keep-color color="primary" size="xs" label="Mine" v-bind:val="ChatsView.MINE" v-model="view" />
                            &nbsp;
                            <q-radio dense keep-color color="primary" size="xs" label="Not Mine" v-bind:val="ChatsView.NOT_MINE" v-model="view" />
                            &nbsp;
                            <q-radio dense keep-color color="primary" size="xs" label="Unassigned" v-bind:val="ChatsView.UNASSIGNED" v-model="view" />    
                            &nbsp;
                            <q-btn flat icon="fa-solid fa-xmark" padding="xs" size="sm" v-on:click="onHideSessions"></q-btn>
                        </div>
                    </div>
                    <div class="row q-pt-sm">
                        <div class="col-4" style="height:410px; overflow-x: hidden; overflow-y: scroll;">
                            <Items v-bind:view="view" v-on:item-selected="onItemSelected" />
                        </div>
                    <div class="col-8" style="height:410px;">
                        <Item v-if="sessionId" v-bind:id="sessionId" />
                    </div>
                </div>
            </q-card-section>
            </q-card>
        
            <q-btn fab icon="fa-solid fa-comments" color="primary" v-else v-on:click="onShowSessions" />
        </q-page-sticky>
    </div>
</template>

<script>
    import ChatsView from "../../constants/chats_view";
    
    import WebChatAccount from "../../models/web_chat_account";
    
    import Item from './Item.vue';
    import Items from './Items.vue';

    const POSITION_KEY = "0iraL81Zu2TmM3t5nqxb";
    const SESSIONS_VISIBLE_KEY = "tKlUDIIwCZlRmo7jIQk1";

    export default {
        name: 'ChatPageSticky',
        data: function() {
            const self = this;
                
            return {
                sessionsVisible: self.$q.localStorage.getItem(SESSIONS_VISIBLE_KEY) ? self.$q.localStorage.getItem(SESSIONS_VISIBLE_KEY) : false,

                sessionId: "",
                view: ChatsView.MINE,
                pos: [10, 10],
                dragging: false,
                
                ChatsView,
            }
        },
        computed: {
            accounts: function() {
                const self = this;
                
                try {
                    return WebChatAccount.all();
                } catch (error) {
                    self.$handle(error);
                }
            },
            connected: function() {
                const self = this;

                try {
                    if(self.$socket) {
                        return self.$socket.state.connected;
                    }

                    return false;
                } catch (error) {
                    console.log(error);
                }
            },
        },
        created: async function() {
            const self = this;
            
            try {
                self.pos = self.$q.localStorage.getItem(POSITION_KEY) ? self.$q.localStorage.getItem(POSITION_KEY): self.position;

                self.resetPosition();
            } catch (error) {
                self.$handle(error);
            }
        },
        methods: {
            getRandomInt: function(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
            },
            onMove: async function(evt) {
                const self = this;

                try {
                    self.dragging = evt.isFirst !== true && evt.isFinal !== true

                    self.pos = [
                        self.pos[0] - evt.delta.x,
                        self.pos[1] - evt.delta.y
                    ];

                    self.resetPosition();

                    self.$q.localStorage.set(POSITION_KEY, self.pos);
                } catch (error) {
                    self.$handle(error);
                }
            },
            onHideSessions: function() {
                const self = this;
                
                try {
                    self.sessionsVisible = false;
                    self.$q.localStorage.set(SESSIONS_VISIBLE_KEY, false);
                } catch (error) {
                    self.$handle(error);
                }
            },
            onShowSessions: function() {
                const self = this;
                
                try {
                    self.sessionsVisible = true;
                    self.$q.localStorage.set(SESSIONS_VISIBLE_KEY, true);
                } catch (error) {
                    self.$handle(error);
                }
            },
            onItemSelected: function(sessionId) {
                const self = this;
                
                try {
                    self.sessionId = sessionId;
                } catch (error) {
                    self.$handle(error);
                }
            },
            resetPosition: function() {
                const self = this;
                
                try {
                    if((self.pos[0] <= 10) || (self.pos[1] <= 10) || (self.pos[0] > self.$q.screen.width ) || (self.pos[1] > self.$q.screen.height)) {
                        self.pos = [20, 20];

                        self.$q.localStorage.set(POSITION_KEY, self.pos);
                    }
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        props: {
            position: Array
        },
        components: {
            Item,
            Items,
        }
    }
</script>