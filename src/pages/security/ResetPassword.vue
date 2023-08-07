<template>
    <q-card style="min-width:300px;" v-bind:flat="flat">
        <q-card-section>
            <div class="text-h6">Reset Password</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-form class="q-gutter-md" v-on:submit="onSubmit">
                <div>
                    <q-input dense outlined readonly label="Email Address" max-length="64" v-model="emailAddress" />
                </div>
                <div>
                    <q-input dense outlined label="New Password" max-length="64" type="passwords" v-model="newPassword" />
                    <div class="text-caption text-negative">{{ validation.firstError('newPassword') }}</div>
                </div>
                <div>
                    <q-input dense outlined label="Confirm New Password" max-length="64" type="passwords" v-model="confirmNewPassword" />
                    <div class="text-caption text-negative">{{ validation.firstError('confirmNewPassword') }}</div>
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
    import isStrongPassword from 'validator/lib/isStrongPassword';
    import { mapActions, mapGetters } from 'vuex';

    import PasswordResetRequestStatus from "../../constants/password_reset_request_status";

    export default {
        name: 'ResetPassword',
        data: function() {
            return {
                code: "",
                emailAddress: "",
                newPassword: "",
                confirmNewPassword: "",

                isBusy: false,
            }
        },
        validators: {
            newPassword: function(value) {
                const self = this;
                
                return self.$validator.custom(function () {
                    if(self.$validator.isEmpty(value)) {
                        return "Please provide your new password.";
                    }

                    if(!isStrongPassword(value)) {
                        return "Your new password should be at least 8 characters long and contain a combination of upper case "
                            + "letters, lower case letters, numbers and symbols.";
                    }
                });
            },
            'confirmNewPassword, newPassword': function (confirmNewPassword, newPassword) {
                const self = this;
                
                return self.$validator.value(confirmNewPassword)
                    .required("Please confirm your new password.")
                    .match(newPassword, "Must match the 'New Password' field.");
            },
        },
        computed: {
            ...mapGetters({

            }),
        },
        created: async function() {
            const self = this;

            try {
                self.isBusy = true;

                self.code = self.$route.params.code;

                const config = {
                    method: 'get',
                    url: `/resetpassword/${ self.code }`
                };

                const response = await self.$api(config);

                self.emailAddress = response.data.user.emailAddress;

                switch (response.data.status) {
                    case PasswordResetRequestStatus.EXPIRED:
                        self.$q.dialog({
                            title: self.$config.APP_NAME,
                            message: 'This password reset request has expired.'
                        }).onOk(() => {
                            self.$router.push("/forgotpassword");
                        })                        
                        break;
                    case PasswordResetRequestStatus.PROCESSED:
                        self.$q.dialog({
                            title: self.$config.APP_NAME,
                            message: 'This password reset request has been used.'
                        }).onDismiss(() => {
                            self.$router.push("/forgotpassword");
                        })                        
                        break;
                }
            } catch (error) {
                self.$handle(error);
            } finally {
                self.isBusy = false;
            }
        },
        methods: {
            ...mapActions({

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
                        code: self.code,
                        newPassword: self.newPassword
                    };

                    const config = {
                        method: 'post',
                        url: '/resetpassword',
                        data
                    };

                    const response = await self.$api(config);
                    
                    self.$q.dialog({
                        title: self.$config.APP_NAME,
                        message: "Your password has been updated. Please login to continue."
                    }).onOk(() => {
                        self.$router.push("/login");
                    })
                } catch (error) {
                    self.$handle(error);
                } finally {
                    self.isBusy = false;
                }
            }
        },
    }
</script>