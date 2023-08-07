<template>
    <div class="flex flex-center" style="height: calc(100vh - 200px)">
        <div class="text-center text-subtitle1">
            <q-spinner-grid color="primary" size="200px" />
            <div class="q-mt-md text-italic">Busy, please wait...</div>
        </div>
    </div>
</template> 

<script>
    export default {
        name: 'Busy'
    }
</script>