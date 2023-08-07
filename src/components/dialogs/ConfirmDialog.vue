<template>
    <q-dialog persistent v-model="visible">
        <q-card>
            <q-card-section>
                <div class="text-h6">{{ appName }}</div>
            </q-card-section>
  
            <q-card-section class="q-pt-none" v-html="message" />
  
            <q-card-actions align="right">
                <q-btn flat no-caps v-bind:label="ok" color="primary" v-on:click="onOK" />
                <q-btn flat no-caps v-bind:label="cancel" color="primary" v-on:click="onCancel" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    import { defineComponent } from 'vue';

    import config from 'src/constants/config';

    export default defineComponent({
        name: 'ConfirmDialog',
        data: function() {
            return {
                appName: config.APP_NAME,
                visible: false
            }
        },
        created: function() {
            const self = this;

            try {
                self.visible = self.show;
            } catch (error) {
                self.$handle(error);
            }
        },
        methods: {
            onCancel: function() {
                const self = this;
                
                try {
                    self.$emit("cancel");
                } catch (error) {
                    self.$handle(error);
                }
            },
            onOK: function() {
                const self = this;
                
                try {
                    self.$emit("ok");
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        watch: {
            show: function(value) {
                const self = this;
                
                try {
                    self.visible = value;
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        props: {
            cancel: {
                required: true,
                type: String,
            },
            message: {
                required: true,
                type: String,
            },
            ok: {
                required: true,
                type: String,
            },
            show: {
                required: true,
                type: Boolean,
            }
        }
    })
</script>