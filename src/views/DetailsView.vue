<script setup>
import { reactive, watch } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';

import { useRecipesStore } from '@/pinia/recipes-store';

import NavBarComponent from '@/components/navs/NavBarComponent.vue'
import DetailsCardComponent from '@/components/cards/DetailsCardComponent.vue'

const route = useRoute()
const router = useRouter()

const recipesStore = useRecipesStore()

const previousRecipe = reactive({to: '', disabled: false})
const nextRecipe = reactive({to: '', disabled: false})

watch(
    () => route.params['id'],
    async () => {
        if (!recipesStore.recipes.length) { await recipesStore.setRecipes() }

        const id = Number(route.params['id'])
        recipesStore.setCurrentRecipe(id)

        setPreviousRecipe()
        setNextRecipe()
    },
    {immediate: true}
)

function setPreviousRecipe() {
    if (recipesStore.currentRecipe.indexInRecipesFiltering < 1) {
        previousRecipe.to=''
        previousRecipe.disabled = true

    } else {
        const index = recipesStore.currentRecipe.indexInRecipesFiltering - 1
        const previousId = recipesStore.recipesFiltering[index].id
        previousRecipe.to = constructToUrl(previousId)
        previousRecipe.disabled = false
    }
}

function setNextRecipe() {
    if (recipesStore.currentRecipe.indexInRecipesFiltering > recipesStore.recipesFiltering.length - 2) {
        nextRecipe.to = ''
        nextRecipe.disabled = true

    } else {
        const index = recipesStore.currentRecipe.indexInRecipesFiltering + 1
        const nextId = recipesStore.recipesFiltering[index].id
        nextRecipe.to = constructToUrl(nextId)
        nextRecipe.disabled = false
    }
}

function constructToUrl(value) {
    return '/recipes/' + String(value)
}

function cliclBack() { router.push({name: 'home', query: {page: recipesStore.currentPage}}) }
</script>

<template>
    <div class="container-fluid px-2 py-2" style="height: 100dvh; background-color: #efefef;">
        <div class="row mx-0" style="height: 70px;">
            <NavBarComponent
            prepend-icon="/src/assets/arrow-left-short.svg"
            :title="recipesStore.currentRecipe.recipe.name"
            @click-back="cliclBack"
            ></NavBarComponent>
        </div>

        <hr class="divider py-1 my-0"/>

        <div class="row mx-0" style="height: calc(100% - 78px);">
            <div class="col-3 h-100 ps-0 pe-1">
                <DetailsCardComponent
                title="Kitchen"
                :text="recipesStore.currentRecipe.recipe.cuisine"
                :height="120"
                :max-height="120"
                ></DetailsCardComponent>

                <hr class="divider py-1 my-0"/>

                <DetailsCardComponent
                title="Tags"
                :subtext="'#' + recipesStore.currentRecipe.recipe.tags.join('#')"
                :height="120"
                :max-height="120"
                ></DetailsCardComponent>

                <hr class="divider py-1 my-0"/>

                <DetailsCardComponent
                title="Calories"
                :text="String(recipesStore.currentRecipe.recipe.caloriesPerServing)"
                subtext="100 gramm"
                :height="140"
                :max-height="140"
                ></DetailsCardComponent>

                <hr class="divider py-1 my-0"/>

                <DetailsCardComponent
                title="Portions"
                :text="String(recipesStore.currentRecipe.recipe.servings)"
                :height="120"
                :max-height="120"
                ></DetailsCardComponent>

                <hr class="divider py-1 my-0"/>

                <DetailsCardComponent
                title="Description"
                subtext="Any description about recipe"
                :height="343"
                :max-height="343"
                ></DetailsCardComponent>
            </div>

            <div class="col-3 h-100 ps-1 pe-1">
                <DetailsCardComponent
                title="Time of the cooking"
                :text="String(
                    recipesStore.currentRecipe.recipe.cookTimeMinutes +
                    recipesStore.currentRecipe.recipe.prepTimeMinutes)"
                :height="120"
                :max-height="120"
                ></DetailsCardComponent>

                <hr class="divider py-1 my-0"/>

                <DetailsCardComponent
                title="Instruction for cooking"
                :timeline="recipesStore.currentRecipe.recipe.instructions"
                :height="747"
                :max-height="747"
                ></DetailsCardComponent>
            </div>

            <div class="col-6 h-100 ps-1 pe-2">
                <div class="h-100" style="background-color: #f7f7f7;">
                    <div class="px-2 pt-2" style="height: calc(100% - 80px);">
                        <img :src="recipesStore.currentRecipe.recipe.image" width="100%" height="100%">
                    </div>

                    <div class="d-flex align-items-center justify-content-center" style="height: 80px;">
                        <div class="d-flex flex-row" style="height: 30px; width: 60px;">
                            <div class="h-100 w-50 me-2">
                                <RouterLink
                                :to="previousRecipe.to"
                                :disabled="previousRecipe.disabled"
                                >
                                    <button
                                    type="button"
                                    class="btn btn-outline-secondary h-100 w-100 px-1 py-0"
                                    :disabled="previousRecipe.disabled"
                                    >
                                        &lt
                                    </button>
                                </RouterLink>
                            </div>

                            <div class="h-100 w-50">
                                <RouterLink
                                :to="nextRecipe.to"
                                :disabled="nextRecipe.disabled"
                                >
                                    <button
                                    type="button"
                                    class="btn btn-outline-secondary h-100 w-100 px-1 py-0"
                                    :disabled="nextRecipe.disabled"
                                    >
                                        &gt
                                    </button>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.divider {
    border: none;
}
</style>
