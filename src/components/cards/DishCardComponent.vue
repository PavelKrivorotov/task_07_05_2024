<script setup>
import NavBarComponent from '@/components/navs/NavBarComponent.vue';

const props = defineProps({
    height: {
        type: Number,
        required: false,
        default: 200
    },
    maxHeight: {
        type: Number,
        required: false,
        default: 200
    },
    title: {
        type: String,
        required: false,
        default: 'Dish card title'
    },
    image: {
        type: String,
        required: false,
        default: '/img-1.jpg'
    },
    description: {
        type: String,
        required: false,
        default: 'This is a dish card description...'
    },
    cookingTime: {
        type: Number,
        required: false,
        default: 30
    },
    difficulty: {
        type: String,
        required: false,
        default: 'Easy'
    },
    kitchen: {
        type: String,
        required: false,
        default: 'Italian'
    },
    mealType: {
        type: Array,
        required: false,
        default: []
    }
})
</script>

<template>
    <div class="card w-100 border-0" :style="`height: ${props.height}px; max-height: ${props.maxHeight}px`">
        <div class="container-fluid h-100 px-0">
            <div class="row h-100 mx-0">
                <div class="col h-100 px-0">
                    <NavBarComponent
                    :title="props.title"
                    :small="true"
                    :height="60"
                    ></NavBarComponent>

                    <hr class="my-0 pb-1" style="" />
                    <img :src="props.image" style="width: 100%; height: calc(100% - 60px - 5px); border-bottom-left-radius: 5px;">
                </div>

                <div class="col h-100 px-4 py-4 overflow-y-scroll">
                    <p>
                        <small class="fw-lighter">{{ props.description }}</small>
                    </p>

                    <div class="d-flex mb-3" style="height: 24px;">
                        <div class="d-flex h-100 align-items-center pe-2">
                            <img src="/src/assets/stopwatch.svg" width="24" height="24">
                        </div>

                        <div class="d-flex h-100 align-items-center">
                            <small>{{ props.cookingTime }} Minutes</small>
                        </div>
                    </div>

                    <div class="d-flex mb-3" style="height: 24px;">
                        <div class="d-flex h-100 align-items-center pe-2">
                            <small>Difficulty:</small>
                        </div>

                        <template v-if="props.difficulty == 'Easy'">
                            <div class="d-flex h-100 align-items-center">
                                <img src="/src/assets/star-fill.svg" width="24" height="24" class="pe-1">
                                <img src="/src/assets/star.svg" width="24" height="24" class="pe-1">
                                <img src="/src/assets/star.svg" width="24" height="24">
                            </div>
                        </template>

                        <template v-else>
                            <div class="d-flex h-100 align-items-center">
                                <img src="/src/assets/star-fill.svg" width="24" height="24" class="pe-1">
                                <img src="/src/assets/star-fill.svg" width="24" height="24" class="pe-1">
                                <img src="/src/assets/star.svg" width="24" height="24">
                            </div>
                        </template>
                    </div>

                    <p>
                        <small>{{ props.kitchen }}</small>
                    </p>

                    <p class="my-0">
                        <small>{{ props.mealType.join(', ') }}</small>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
