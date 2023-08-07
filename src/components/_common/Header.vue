<template>
    <div class="q-py-md">
        <div class="row">
            <div class="col">
                <div class="text-h5">
                    {{ title }}
                </div>
            </div>
            <div class="col-auto">
                <slot>
                    
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        props: {
            title: String
        },
    }
</script>