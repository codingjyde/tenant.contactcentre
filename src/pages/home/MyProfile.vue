<template>
    <div>
        <Header title="My Profile" />

        <div class="row">
            <div class="col-sm-4 col-xs-12">
                <q-card>
                    <q-card-section class="q-pb-none">
                        <div class="text-h6">Details</div>
                    </q-card-section>
                    <q-list class="dense">
                        <q-item>
                            <q-item-section>
                                <q-item-label caption>Surname</q-item-label>
                                <q-item-label>{{ surname }}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                                <q-item-label caption>First Name</q-item-label>
                                <q-item-label>{{ firstName }}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                                <q-item-label caption>Middle Name</q-item-label>
                                <q-item-label>{{ middleName }}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                                <q-item-label caption>Email Address</q-item-label>
                                <q-item-label>
                                    <a v-bind:href="'mailto:' + emailAddress">{{ emailAddress }}</a>
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                                <q-item-label caption>Organisation</q-item-label>
                                <q-item-label>{{ organisationName }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card>
            </div>
        </div>
    </div>    
</template>

<script>
    import { mapGetters } from 'vuex';
    
    import Header from '../../components/_common/Header.vue';
    
    export default {
        name: "MyProfile",
        computed: {
            ...mapGetters({
                emailAddress: "security/emailAddress",
                firstName: "security/firstName",
                middleName: "security/middleName",
                organisationName: "security/organisationName",
                surname: "security/surname",
            })
        },
        components: {
            Header
        }
    }
</script>