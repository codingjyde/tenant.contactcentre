<template>
    <q-card style="min-width:300px;" v-bind:flat="flat">
        <q-card-section>
            <div class="text-h6">Login</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-form class="q-gutter-md" v-on:submit="onSubmit">
                <div>
                    <q-input dense outlined label="Email Address" max-length="64" v-model="emailAddress" />
                    <div class="text-caption text-negative">{{ validation.firstError('emailAddress') }}</div>
                </div>
                <div>
                    <q-input dense outlined label="Password" max-length="64" type="password" v-model="password" />
                    <div class="text-caption text-negative">{{ validation.firstError('password') }}</div>
                </div>
                <div>
                    <q-btn disable no-caps class="cursor-not-allowed full-width" color="primary" v-if="isBusy">
                        <i>Busy, please wait...</i>
                    </q-btn>
                    <q-btn no-caps class="full-width" color="primary" label="Submit" type="submit" v-else />
                    <div class="row">
                        <div class="col-6">
                            <q-btn disable flat no-caps class="cursor-not-allowed full-width" color="primary" label="Register" v-if="isBusy"/>
                            <q-btn flat no-caps class="full-width" color="primary" label="Register" to="/register" v-else />        
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
        name: 'Login',
        data: function() {
            return {
                emailAddress: "",
                password: "",

                isBusy: false,
            }
        },
        validators: {
            emailAddress: function(value) {
                const self = this;
                
                return self.$validator.value(value)
                    .required("Please provide your email address.")
                    .email("Please provide a valid email address.");
            },
            password: function(value) {
                const self = this;
                
                return self.$validator.value(value)
                    .required("Please provide your password.");
            },
        },
        computed: {
            ...mapGetters({
                organisationName: "security/organisationName"
            }),
            flat: function() {
                const self = this;
                
                try {
                    return self.$q.screen.lt.sm;
                } catch (error) {
                    self.$handle(error);
                }
            },
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
                        emailAddress: self.emailAddress,
                        password: self.password
                    };

                    const config = {
                        method: 'post',
                        url: '/login',
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
        },
    }
</script>