<template>
    <q-card style="min-width:300px;" v-bind:flat="flat">
        <q-card-section>
            <div class="text-h6">Forgot Your Password?</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-form class="q-gutter-md" v-on:submit="onSubmit">
                <div>
                    <div class="text-caption text-black">We'll send a new one to your email address.</div>
                    <q-input dense outlined label="Email Address" max-length="64" v-model="emailAddress" />
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
                            <q-btn disable flat no-caps class="cursor-not-allowed full-width" color="primary" label="Register" v-if="isBusy"/>
                            <q-btn flat no-caps class="full-width" color="primary" label="Register" to="/register" v-else />        
                        </div>
                    </div>
                </div>
            </q-form>
        </q-card-section>
    </q-card>
</template>

<script>
    export default {
        name: 'ForgotPassword',
        data: function() {
            return {
                emailAddress: "",
                
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
        },
        computed: {
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
                        origin: `${ location.origin }/#/resetpassword`
                    };

                    const config = {
                        method: 'post',
                        url: '/forgotpassword',
                        data
                    };

                    const response = await self.$api(config);
                    
                    self.$q.dialog({
                        title: self.$config.APP_NAME,
                        message: "A password reset link has been sent to the email address you provided."
                    }).onDismiss(() => {
                        self.$router.push("/login");
                    });
                } catch (error) {
                    self.$handle(error);
                } finally {
                    self.isBusy = false;
                }
            }
        },
    }
</script>