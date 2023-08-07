<template>
    <div>
        <Header title='Change Password' />

        <div class="flex flex-center" style="height: calc(100vh - 240px)">
            <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <q-card class="bg-white" style="min-width:320px;">
                        <q-card-section>
                            <q-form class="q-gutter-md" v-on:submit="onSubmit">
                                <div>
                                    <q-input dense outlined label="Current Password" max-length="64" type="password" v-model="currentPassword" />
                                    <div class="text-caption text-negative">{{ validation.firstError('currentPassword') }}</div>
                                </div>
                                <div>
                                    <q-input dense outlined label="New Password" max-length="64" type="password" v-model="newPassword" />
                                    <div class="text-caption text-negative">{{ validation.firstError('newPassword') }}</div>
                                </div>
                                <div>
                                    <q-input dense outlined label="Confirm New Password" max-length="64" type="password" v-model="confirmNewPassword" />
                                    <div class="text-caption text-negative">{{ validation.firstError('confirmNewPassword') }}</div>
                                </div>
                                <div>
                                    <q-btn disable no-caps class="cursor-not-allowed full-width" color="primary" v-if="isBusy">
                                        <i>Busy, please wait...</i>
                                    </q-btn>
                                    <q-btn no-caps class="full-width" color="primary" label="Submit" type="submit" v-else />
                                </div>
                            </q-form>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import isStrongPassword from 'validator/lib/isStrongPassword';
    import { mapActions, mapGetters } from 'vuex';

    import Header from 'src/components/_common/Header.vue';

    export default {
        name: 'ChangePassword',
        data: function() {
            return {
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",

                isBusy: false,
            }
        },
        validators: {
            currentPassword: function(value) {
                const self = this;
                
                return self.$validator.value(value)
                    .required("Please provide your current password.");
            },
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
                        currentPassword: self.currentPassword,
                        newPassword: self.newPassword
                    };

                    const config = {
                        method: 'post',
                        url: '/changepassword',
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
        components: {
            Header
        },
    }
</script>