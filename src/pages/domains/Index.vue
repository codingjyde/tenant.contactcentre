<template>
    <div>
        <Header title='Domains'>
            <router-link to="/domains/create" v-if="!isBusy">Create</router-link>
        </Header>

        <div v-if="isBusy">
            <Busy />
        </div>
        <div v-else>
            <div v-if="rows.length > 0">
                <q-markup-table>
                    <thead>
                        <tr>
                            <th class="text-left">
                                <b>Name</b>
                            </th>
                            <th class="text-left">
                                <b>Status</b>
                            </th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in rows" v-bind:key="row.id">
                            <td class="text-left">{{ row.name }}</td>
                            <td class="text-left">
                                <DomainStatusBadge v-bind:value="row.status" />    
                            </td>
                            <td class="text-right">
                                <router-link v-bind:to="'/domains/' + row.id">View</router-link>    
                            </td>
                        </tr>
                    </tbody>
                </q-markup-table>

                <Paginator v-bind:page="page" v-bind:pages="pages" v-on:updated="onUpdated"/>
            </div>
            <div v-else>
                <NoData />
            </div>
        </div>
    </div>
</template>

<script>
    import Busy from 'src/components/_common/Busy.vue';
    import Header from '../../components/_common/Header.vue';
    import DomainStatusBadge from 'src/components/badges/DomainStatusBadge.vue';
    import NoData from 'src/components/_common/NoData.vue';
    import Paginator from '../../components/_common/Paginator.vue';

    export default {
        name: 'DomainsIndex',
        data: function() {
            return {
                page: 1,
                pages: 1,
                rows: [],

                isBusy: true,
            }
        },
        created: function() {
            const self = this;
            
            try {
                self.loadData(1);
            } catch (error) {
                self.$handle(error);
            } finally {
                self.isBusy = false;
            }
        },
        methods: {
            loadData: async function(page) {
                const self = this;
            
                try {
                    self.rows = [];
                    self.page = page;

                    const config = {
                        method: 'get',
                        url: '/domains',
                        params: {
                            page,
                            size: 10
                        }
                    };

                    const response = await self.$api(config);

                    self.rows = response.data.items;
                    self.pages = response.data.pages;
                } catch (error) {
                    self.$handle(error);
                } finally {
                    self.isBusy = false;
                }                
            },
            onUpdated: function(page) {
                const self = this;
                
                try {
                    self.loadData(page);
                } catch (error) {
                    self.$handle(error);
                } finally {
                    self.isBusy = false;
                }
            }
        },
        components: {
            Busy,
            Header,
            DomainStatusBadge,
            NoData,
            Paginator
        }
    }
</script>