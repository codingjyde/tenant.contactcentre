<template>
    <q-card style="min-width:300px;" v-bind:flat="flat">
        <q-card-section>
            <div class="text-h6">Register</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-form class="q-gutter-md" v-on:submit="onSubmit">
                <div>
                    <div class="text-caption text-black">Your Organisation</div>
                    <q-input dense outlined label="Name" maxlength="64" placeholder="Example Limited" v-model="organisationName" />
                    <div class="text-caption text-negative">{{ validation.firstError('organisationName') }}</div>
                </div>
                <div>
                    <div class="text-caption text-black">You</div>
                    <q-input dense outlined label="First Name" maxlength="64" v-model="firstName" />
                    <div class="text-caption text-negative">{{ validation.firstError('firstName') }}</div>
                </div>
                <div>
                    <q-input dense outlined label="Middle Name" maxlength="64" v-model="middleName" />
                </div>
                <div>
                    <q-input dense outlined label="Surname" maxlength="64" v-model="surname" />
                    <div class="text-caption text-negative">{{ validation.firstError('surname') }}</div>
                </div>
                <div>
                    <q-input dense outlined label="Email Address" maxlength="64" v-model="emailAddress" />
                    <div class="text-caption text-negative">{{ validation.firstError('emailAddress') }}</div>
                </div>
                <div>
                    <q-btn disable no-caps class="cursor-not-allowed full-width" color="primary" v-if="isBusy">
                        <i>Busy, please wait...</i>
                    </q-btn>
                    <q-btn no-caps class="full-width" color="primary" label="Submit" type="submit" v-else />
                    <div class="row">
                        <div class="col-6">
                            <q-btn disable flat no-caps class="cursor-not-allowed full-width" color="primary" label="Login" v-if="isBusy"/>
                            <q-btn flat no-caps class="full-width" color="primary" label="Login" to="/login" v-else />
                        </div>
                        <div class="col-6">
                            <q-btn disable flat no-caps class="cursor-not-allowed full-width" color="primary" label="Forgot Password" v-if="isBusy"/>
                            <q-btn flat no-caps class="full-width" color="primary" label="Forgot Password" to="/forgotpassword" v-else />
                        </div>
                    </div>
                </div>
            </q-form>
        </q-card-section>
    </q-card>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'Register',
        data: function() {
            return {
                organisationName: "",
                firstName: "",
                middleName: "",
                surname: "",
                emailAddress: "",

                isBusy: false
            }
        },
        validators: {
            organisationName: function(value) {
                const self = this;

                return self.$validator.value(value)
                    .required("Please provide the name of your organisation.");
            },
            firstName: function(value) {
                const self = this;

                return self.$validator.value(value)
                    .required("Please provide your first name.");
            },
            surname: function(value) {
                const self = this;

                return self.$validator.value(value)
                    .required("Please provide your surname.");
            },
            emailAddress: function(value) {
                const self = this;

                return self.$validator.value(value)
                    .required("Please provide your email address.")
                    .email("Please provide a valid email address.");
            },
        },
        computed: {
            ...mapGetters({

            }),
            flat: function() {
                const self = this;

                try {
                    return self.$q.screen.lt.sm;
                } catch (error) {
                    self.$handle(error);
                }
            }
        },
        created: function() {
            const self = this;

            try {

            } catch (error) {
                // self.$handle(error);
            }
        },
        methods: {
            ...mapActions({
                login: "security/login"
            }),
            onSubmit: async function() {
                const self = this;

                try {
                    self.isBusy = true;

                    const succeeded = await self.$validate();
                    if(!succeeded) {
                        return;
                    }

                    const data = {
                        name: self.organisationName,
                        firstName: self.firstName,
                        middleName: self.middleName,
                        surname: self.surname,
                        emailAddress: self.emailAddress
                    };

                    const config = {
                        method: 'post',
                        url: '/register',
                        data
                    };

                    const response = await self.$api(config);

                    self.login({
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken,
                    });

                    self.$router.push("/");
                } catch (error) {
                    self.$handle(error);
                } finally {
                    self.isBusy = false;
                }
            }
        }
    }
</script>
