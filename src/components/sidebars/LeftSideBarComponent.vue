<script setup>
import { useRecipesStore } from '@/pinia/recipes-store';

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
    }
})

const emits = defineEmits([
    'changeKitchen',
    'changeMealType',
    'changeDifficult',
    'resetFilters',
    'iWillBeLuck'
])

const recipesStore = useRecipesStore()

function changeKitchen(event) { emits('changeKitchen', event.target.value) }
function changeMealType(event) { emits('changeMealType', event.target.value) }
function changeDifficult(event) { emits('changeDifficult', event.target.value) }

function resetFiltersBtn() { emits('resetFilters') }
function iWillBeLuckBtn() { emits('iWillBeLuck') }
</script>

<template>
    <div class="container-fluid px-0" :style="`height: ${$props.height}px; max-height: ${$props.maxHeight}px; background-color: white`">
        <div class="row h-100 mx-0">
            <div class="col h-100 px-0">
                <div class="container-fluid px-0" style="height: 500px;">
                    <div class="card border-0 w-100 h-100 p-5">
                        <img src="/none-image.jpg" class="card-img-top" alt="" style="height: 200px;">

                        <div class="card-body overflow-y-auto px-0 pt-4 pb-0">
                            <p class="card-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Totam, facere. Quae reprehenderit exercitationem est
                            </p>
                            <p class="card-text">
                                consequatur aut animi, laborum, corrupti amet accusantium
                                odio ea ipsum similique, tenetur minus quaerat aliquam
                                necessitatibus. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Tenetur, quos veniam eaque, provident
                            </p>

                            <p class="card-text">
                                Nemo dolorum atque illo id voluptates illum eius! Repellay
                                vel magnam quot.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="container-fluid px-0 pt-4 pb-4" style="height: 250px;">
                    <div class="row mx-0" style="height: 160px;">
                        <div class="col h-100 px-0">
                            <form class="px-4">
                                <div class="row mb-2">
                                    <label for="input-1" class="col-3 col-form-label text-end pe-0">Kitchen:</label>
                                    <div class="col-9 d-flex justify-content-center align-items-center">
                                        <select
                                        name="select-1"
                                        id="id-select-1"
                                        class="form-select w-100"
                                        @change="changeKitchen"
                                        >
                                            <option
                                            v-for="item in recipesStore.kitchens"
                                            :key="item.key"
                                            :value="item.key"
                                            :selected="item.selected"
                                            >
                                                {{ item.key }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row mb-2">
                                    <label for="input-2" class="col-3 col-form-label text-end pe-0">Meal type:</label>
                                    <div class="col-9 d-flex justify-content-center align-items-center">
                                        <select
                                        name="select-2"
                                        id="id-select-2"
                                        class="form-select w-100"
                                        @change="changeMealType"
                                        >
                                            <option
                                            v-for="item in recipesStore.mealTypes"
                                            :key="item.key"
                                            :value="item.key"
                                            :selected="item.selected"
                                            >
                                                {{ item.key }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row mb-2">
                                    <label for="input-3" class="col-3 col-form-label text-end pe-0">Difficulty preparation:</label>
                                    <div class="col-9 d-flex justify-content-center align-items-center">
                                        <template
                                        v-for="item in recipesStore.difficults"
                                        :key="item.key"
                                        >
                                            <input
                                            :id="`difficilt-radio-${item.key}`"
                                            :value="item.key"
                                            :disabled="item.disabled"
                                            :checked="item.selected"
                                            type="radio"
                                            name="difficilt-radio"
                                            class="btn-check"
                                            @change="changeDifficult"
                                            >

                                            <label
                                            :for="`difficilt-radio-${item.key}`"
                                            class="btn btn-outline-primary px-0 w-25"
                                            >
                                                {{ item.key }}
                                            </label>
                                        </template>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="row mx-0" style="height: 35px;">
                        <div class="col h-100 d-flex align-items-center px-4 mx-0">
                            <button
                            type="button"
                            class="btn btn-link px-0 text-decoration-none"
                            @click="resetFiltersBtn"
                            >
                                Reset filters
                            </button>
                        </div>
                    </div>
                </div>

                <div class="container-fluid px-0" style="height: calc(100% - 750px);">
                    <div class="row mx-0 h-100">
                        <div class="col h-100 px-4 pt-4 pb-4">
                            <div class="h-50">
                                <span class="fw-lighter">
                                    You can also taste luck
                                </span>
                            </div>

                            <div class="h-50">
                                <button
                                type="button"
                                class="btn btn-outline-secondary btn-sm px-3"
                                @click="iWillBeLuckBtn"
                                >
                                    I`ll be luck!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
