<template>
    <div>
        <Header title='Edit Label' />

        <div class='row'>
            <div class='col-sm-3 col-xs-12'>
                <q-form class='q-gutter-md' v-on:submit='onSubmit'>
                    <div>
                        <q-input dense outlined class="" label='Name' maxlength='64' v-model='name' />
                        <div class='text-caption text-negative'>{{ validation.firstError('name') }}</div>
                    </div>
                    <div>
                        <q-input dense outlined readonly label='Colour' maxlength='64' v-model='colour'>
                            <template v-slot:before>
                                <q-icon name="fa fa-circle" v-bind:class="'text-' + colour" />
                            </template>

                            <template v-slot:append>
                                <q-icon class="cursor-pointer" name="fa fa-palette" v-on:click="onSelectColour" />
                            </template>
                        </q-input>
                        <div class='text-caption text-negative'>{{ validation.firstError('colour') }}</div>
                    </div>
                    <div>
                        <span class="text-caption">Status</span>
                        <q-option-group inline v-model="status" v-bind:options="statuses" color="primary" />              
                        <div class='text-caption text-negative'>{{ validation.firstError('status') }}</div>
                    </div>
                    <div>
                        <SubmitButton label="Submit" v-bind:is-busy="isBusy" />
                        <q-btn flat no-caps class='full-width' color='primary' label="Cancel" v-bind:to="'/labels/' +id "  v-if="!isBusy" />
                    </div>
                </q-form>
                <q-dialog v-model="showPicker">
                    <ColourPicker v-on:selected="onColourSelected" />
                </q-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';

    import LabelStatus from "src/constants/label_status";

    import ColourPicker from 'src/components/_common/ColourPicker.vue';
    import Header from '../../components/_common/Header.vue';
    import SubmitButton from '../../components/_common/SubmitButton.vue';

    export default defineComponent({
        name: 'LabelsCreate',
        data: function() {
            const self = this;
            
            return {
                id: self.$route.params.id,
                name: '',
                colour: '',
                status: LabelStatus.SUSPENDED,

                statuses: [{
                    label: "Active",
                    value: LabelStatus.ACTIVE
                }, {
                    label: "Suspended",
                    value: LabelStatus.SUSPENDED
                }],
                isBusy: false,
                showPicker: false
            }
        },
        validators: {
            name: function(value) {
                const self = this;
                return self.$validator.value(value)
                    .required('Please enter the name of this label.');
            },
            colour: function(value) {
                const self = this;
                return self.$validator.value(value)
                    .required('Please select the colour of this label.');
            },
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
            onColourSelected: function(colour) {
                const self = this;

                try {
                    self.colour = colour;
                    self.showPicker = false;
                } catch (error) {
                    self.$handle(error);    
                }
            },
            onSelectColour: function() {
                const self = this;

                try {
                    self.showPicker = true;
                } catch (error) {
                    self.$handle(error);    
                }
            },
            onSubmit: async function() {
                const self = this;

                try {
                    self.isBusy = true;

                    const succeeded = await self.$validate();
                    if(!succeeded) {
                        return false;
                    }    
                    
                    const data = {
                        name: self.name,
                        colour: self.colour,
                        status: self.status
                    };

                    console.log(self.id);

                    const config = {
                        method: 'put',
                        url: `/labels/${ self.id }`,
                        data
                    };

                    const response = await self.$api(config);
                    
                    self.$router.push(`/labels/${ response.data.id }`);

                } catch (error) {
                    self.$handle(error);
                } finally {
                    self.isBusy = false;
                }
            }
        },
        components: {
            ColourPicker,
            Header,
            SubmitButton,
        },
    }) 
</script>