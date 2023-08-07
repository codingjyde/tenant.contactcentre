<template>
    <div>
        <Header v-bind:title="'Label - ' + name" v-if="!isBusy" />

        <div v-if="isBusy">
            <Busy />
        </div>
        <div v-else>
            <div class="row">
                <div class="col-sm-4 col-xs-12">
                    <q-breadcrumbs class="q-mb-md">
                        <q-breadcrumbs-el label="Labels" to="/labels" />
                        <q-breadcrumbs-el v-bind:label="name" />
                    </q-breadcrumbs>

                    <q-card>
                        <q-card-section class="q-pb-none">
                            <div class="text-h6">Details</div>
                        </q-card-section>
                        <q-list class="dense">
                            <q-item>
                                <q-item-section>
                                    <q-item-label caption>Name</q-item-label>
                                    <q-item-label>{{ name }}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <q-item-label caption>Colour</q-item-label>
                                    <q-item-label>
                                        <ColourBadge v-bind:colour="colour" v-bind:label="colour" />    
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <q-item-label caption>Status</q-item-label>
                                    <q-item-label>
                                        <LabelStatusBadge v-bind:value="status"/>
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="text-right">
                                    <q-item-label>
                                        <q-btn flat no-caps color="primary" v-bind:to="'/labels/edit/' + id">Edit</q-btn>
                                        <q-btn flat no-caps color="primary" v-on:click="onShowDialog">Delete</q-btn>

                                        <ConfirmDialog ok="Yes" cancel="No" message="Are you sure you want to delete this label? You won't be able to undo this action." 
                                            v-bind:show="showDialog" v-on:ok="onDelete" v-on:cancel="showDialog = false;" />
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from "vue";

    import LabelStatus from "src/constants/label_status";

    import ConfirmDialog from "src/components/dialogs/ConfirmDialog.vue";
    import Busy from "src/components/_common/Busy.vue";
    import ColourBadge from "src/components/badges/ColourBadge.vue";
    import Header from '../../components/_common/Header.vue';
    import LabelStatusBadge from "src/components/badges/LabelStatusBadge.vue";

    export default defineComponent({
        name: 'LabelItem',
        data: function() {
            const self = this;
            
            return {
                id: self.$route.params.id,
                name: '',
                colour: '',
                status: LabelStatus.SUSPENDED,

                isBusy: false,
                showDialog: false,
            }
        },
        created: async function() {
            const self = this;
            
            try {
                self.isBusy = true;

                
                const config = {
                    method: 'get',
                    url: `/labels/${ self.id }`,
                };

                const response = await self.$api(config);

                self.name = response.data.name;
                self.colour = response.data.colour;
                self.status = response.data.status;

            } catch (error) {
                self.$handle(error);
            } finally {
                self.isBusy = false;
            }
        },
        methods: {
            onDelete: async function() {
                const self = this;
                
                try {
                    self.isBusy = true;

                    const config = {
                        method: 'delete',
                        url: `/labels/${ self.$route.params.id }`,
                    };

                    await self.$api(config);

                    self.$router.push("/labels");

                } catch (error) {
                    self.$handle(error);
                }
            },
            onShowDialog: function() {
                const self = this;
                
                try {
                    self.showDialog = true;
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        components: {
            Busy,
            ColourBadge,
            ConfirmDialog,
            Header,
            LabelStatusBadge,
        },
    })
</script>