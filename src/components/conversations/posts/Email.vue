<template>
    <div class="row" v-if="item">
        <q-card bordered class="col-9" v-bind:class="getCardCss">
            <q-card-section>
                <div class="text-caption text-dark text-bold">
                    <span v-if="item.sender.name">{{ item.sender.name }} - </span> {{ item.sender.emailAddress }}
                </div>
                <div v-html="item.html">
                </div>
                <div class="text-caption text-right">
                    {{ $formatDate(item.dateSent) }}
                </div>
            </q-card-section>
            
        </q-card>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    import ConversationItem from 'src/models/conversation_item';
    
    export default {
        name: "EmailPost",
        computed: {
            ...mapGetters({
                emailAddress: "security/emailAddress"
            }),
            getCardCss: function() {
                const self = this;
                
                try {
                    return (self.item.sender.emailAddress === self.emailAddress) ? "offset-3" : "";
                } catch (error) {
                    self.$handle(error);
                }
            },
            item: function() {
                const self = this;
                
                try {
                    if(self.itemId) {
                        return ConversationItem.find(self.itemId);
                    }

                    return null;
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        props: {
            itemId: String
        }
    }
</script>