<template>
    <div>
        <q-list style="min-width: 100px">
            <template v-for="item in items">
                <q-separator v-if="item.type === 0" v-bind:key="item.icon" />
                <q-item clickable v-close-popup v-bind:class="{ 'text-primary': item.selected }" v-bind:key="item.caption" v-on:click="item.method" v-else>
                    <q-item-section avatar>
                        <q-icon v-bind:name="item.icon" />
                    </q-item-section>
        
                    <q-item-section>
                        <q-item-label class="text-black text-bold text-caption" lines="1">{{ item.title }}</q-item-label>
                        <q-item-label caption lines="1">{{ item.caption }}</q-item-label>
                    </q-item-section>
                </q-item>
            </template>
        </q-list>

        <ConfirmDialog cancel="No" ok="Yes" message="Are you sure you want to log out of this application?" 
            v-bind:show="showDialog" v-on:ok="onLogout" />
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    import ConfirmDialog from "src/components/dialogs/ConfirmDialog.vue";

    const ItemType = {
        SEPERATOR: 0,
        MENU_ITEM: 1
    }

    export default {
        name: 'Menu',
        data: function() {
            return {
                selectedUrl: "",
                showDialog: false,
            }
        },
        computed: {
            ...mapGetters({
            
            }),
            itemCss: function() {
                const self = this;

                return {
                    "text-primary": self.$route.path === self.selectedUrl 
                }
            },
            items: function() {
                const self = this;

                return [{
                    caption: "View and manage channel accounts.",
                    icon: "fa-solid fa-square-rss",
                    selected: self.$route.path === "/channelaccounts",
                    title: "Channel Accounts",
                    method: function() {
                        self.move("/channelaccounts");
                    }
                }, {
                    caption: "View and manage conversations.",
                    icon: "fa-solid fa-hands-asl-interpreting",
                    selected: self.$route.path === "/conversations",
                    title: "Conversations",
                    method: function() {
                        self.move("/conversations");
                    }
                }, {
                    caption: "View and manage domains.",
                    icon: "fa-solid fa-globe",
                    selected: self.$route.path === "/domains",
                    title: "Domains",
                    method: function() {
                        self.move("/domains");
                    }
                }, {
                    caption: "View and manage labels.",
                    icon: "fa-solid fa-tags",
                    selected: self.$route.path === "/labels",
                    title: "Labels",
                    method: function() {
                        self.move("/labels");
                    }
                }, {
                    type: ItemType.SEPERATOR,
                }, {
                    caption: "View your profile and your permissions.",
                    icon: "fa-regular fa-address-card",
                    selected: self.$route.path === "/myprofile",
                    title: "My Profile",
                    method: function() {
                        self.move("/myprofile");
                    }
                }, {
                    caption: "Choosing a new password regularly helps to keep your account secure.",
                    icon: "fa-solid fa-unlock-keyhole",
                    selected: self.$route.path === "/changepassword",
                    title: "Change Password",
                    method: function() {
                        self.move("/changepassword");
                    }
                }, {
                    type: ItemType.SEPERATOR,
                }, {
                    caption: "Sign out of this application.",
                    icon: "fa-solid fa-right-from-bracket",
                    title: "Logout",
                    method: function() {
                        try {
                            self.showDialog = true;
                        } catch (error) {
                            self.$handle(error);
                        }
                    }
                }, ];
            },
        },
        methods: {
            ...mapActions({
                clearAllEntities: "entities/deleteAll",
                logout: "security/logout",
            }),
            move: function(url) {
                const self = this;
                
                try {
                    self.selectedUrl = url;
                    self.$router.push(url);
                } catch (error) {
                    self.$handle(error);
                }    
            },
            onLogout: function() {
                const self = this;
                
                try {
                    self.clearAllEntities();
                    self.logout();
                    self.$router.go(0);        
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        components: {
            ConfirmDialog
        }
    }
</script>