<script setup>
const props = defineProps({
    height: {
        type: Number,
        required: false,
        default: 70
    },
    prependIcon: {
        type: String,
        required:false,
        default: null
    },
    title: {
        type: String,
        required: false,
        dafault: null
    },
    small: {
        type: Boolean,
        required: false,
        default: false
    },
    count: {
        type: Number,
        required: false,
        default: null
    }
})

const emits = defineEmits(['clickBack'])

function clickBackBtn() { emits('clickBack') }
</script>

<template>
    <div class="container-fluid px-0" :style="`height: ${props.height}px; background-color: white`">
        <div class="row h-100 mx-0">
            <div class="col h-100 px-0">
                <nav class="nav h-100 px-3 py-3">
                    <template v-if="props.prependIcon">
                        <div class="nav-item pe-2">
                            <button
                            type="button"
                            class="btn gray-200 px-0"
                            @click="clickBackBtn"
                            >
                                <img :src="props.prependIcon" width="32" height="32">
                            </button>
                        </div>
                    </template>

                    <div class="nav-item">
                        <template v-if="props.small">
                            <span class="fs-6 fw-medium">{{ props.title }}</span>
                        </template>

                        <template v-else>
                            <span class="fs-4 fw-medium">{{ props.title }}</span>
                        </template>
                    </div>

                    <template v-if="props.count != null">
                        <div class="nav-item ps-2">
                            <span class="fs-6 fw-lighter">{{ props.count }}</span>
                        </div>
                    </template>
                </nav>
            </div>
        </div>
    </div>
</template>

<style scoped>
button {
    border: none;
}
button:hover {
    border: none;
    background: #f5f5f5;  
}

.nav-item {
    display: flex;
    justify-content: center;
    align-items: center;

    width: fit-content;
    height: 100%;
}
</style>
