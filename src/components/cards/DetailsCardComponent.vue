<script setup>
const props = defineProps({
    height: {
        type: Number,
        required: false,
        default: 120
    },
    maxHeight: {
        type: Number,
        required: false,
        default: 150
    },
    title: {
        type: String,
        required: false,
        default: 'Card-title'
    },
    text: {
        type: String,
        required: false,
        default: null
    },
    subtext: {
        type: String,
        required: false,
        default: null
    },
    timeline: {
        type: Array,
        required: false,
        default: null
    }
})
</script>

<template>
    <div class="card border-0 w-100" :style="`height: ${props.height}px; max-height: ${props.maxHeight}px;`">
        <div class="header d-flex align-items-center w-100 px-4 py-3" style="height: 50px;">
            <p class="fw-medium my-0">{{ props.title }}</p>
        </div>

        <hr class="divider my-0"/>

        <div class="d-flex w-100 h-auto overflow-y-scroll px-4 py-3">
            <div class="w-100">
                <template v-if="props.text">
                    <p class="mb-2">{{ props.text }}</p>
                </template>

                <template v-if="props.subtext">
                    <p class="fw-lighter mb-2">{{ props.subtext }}</p>
                </template>

                <template v-if="props.timeline">
                    <ul class="timeline">
                        <li v-for="(item, index) in props.timeline" :key="index">
                            <p>{{ item }}</p>
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    height: 60px;
}

.divider {
    border-width: 2px;
    border-color: gainsboro;
}

ul.timeline {
    list-style-type: none;
    position: relative;
    margin-bottom: 0;
    padding-left: 0;
    
    top: -15px;
}

ul.timeline::before {
    margin-top: 5px;

    content: ' ';
    background: #d4d9df;
    display: inline-block;
    position: absolute;
    left: 7px;

    width: 1px;
    height: 100%;
    z-index: 400;
}

ul.timeline > li {
    margin: 20px 0;
    padding-left: 20px;
}

ul.timeline > li::before {
    margin-top: 5px;

    content: ' ';
    background: white;
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    border: 3px solid #22c0e8;
    left: 0;

    width: 15px;
    height: 15px;
    z-index: 400;
}
</style>
