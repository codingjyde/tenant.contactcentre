<template>
    <div>
        <Header title='Add Domain' />

        <div class='row'>
            <div class='col-sm-3 col-xs-12'>
                <q-form class='q-gutter-md' v-on:submit='onSubmit'>
                    <div>
                        <q-input dense outlined class="" label='Name' maxlength='253' v-model='name' />
                        <div class='text-caption text-negative'>{{ validation.firstError('name') }}</div>
                    </div>
                    <div>
                        <SubmitButton label="Submit" v-bind:is-busy="isBusy" />
                        <q-btn flat no-caps class='full-width' color='primary' label="Cancel" to='/labels'  v-if="!isBusy" />
                    </div>
                </q-form>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/_common/Header.vue";
    import SubmitButton from '../../components/_common/SubmitButton.vue';

    export default {
        name: 'DomainsCreate',
        data: function() {
            return {
                name: '',
                
                isBusy: false
            }
        },
        validators: {
            name: function(value) {
                const self = this;
                return self.$validator.value(value)
                    .required('Please enter the name of this label.');
            },
        },
        methods: {
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
                    };

                    const config = {
                        method: 'post',
                        url: '/domains',
                        data
                    };

                    const response = await self.$api(config);

                    self.$router.push(`/domains/${ response.data.id }`);

                } catch (error) {
                    console.log(error);
                    self.$handle(error);
                } finally {
                    self.isBusy = false;
                }
            }
        },
        components: {
            Header,
            SubmitButton,
        },
    }
</script>