<script setup>
import { computed, watch } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';

import { useRecipesStore } from '@/pinia/recipes-store';

import NavBarComponent from '@/components/navs/NavBarComponent.vue';
import LeftSideBarComponent from '@/components/sidebars/LeftSideBarComponent.vue';
import DishCardComponent from '@/components/cards/DishCardComponent.vue';
import PaginationComponent from '@/components/paginations/PaginationComponent.vue';

const route = useRoute()
const router = useRouter()

const recipesStore = useRecipesStore()

const calcPageCount = computed(() => {
    var count = Math.trunc(recipesStore.recipesCount / recipesStore.recipesPerPage)
    if ((recipesStore.recipesCount % recipesStore.recipesPerPage) > 0) { count++ }
    return count
})

watch(
    () => route.query,
    async () => {
        if (!recipesStore.recipesCount) { await recipesStore.setRecipes() }
        if (!recipesStore.kitchens.length) { await recipesStore.setKitchen() }
        if (!recipesStore.mealTypes.length) { await recipesStore.setMealType() }
    },
    {immediate: true}
)

function changeKitchen(value) {
    recipesStore.setCurrentKitchen(value)
    recipesStore.setRecipesFiltering()
    recipesStore.setRecipesOnPage()
}

function changeMealType(value) {
    recipesStore.setCurrentMealType(value)
    recipesStore.setRecipesFiltering()
    recipesStore.setRecipesOnPage()
}

function changeDifficult(value) {
    recipesStore.setCurrentDifficult(value)
    recipesStore.setRecipesFiltering()
    recipesStore.setRecipesOnPage()
}

function changePage(page) {
    recipesStore.setCurrentPage(page)
    recipesStore.setRecipesOnPage()
}

function resetFilters() { recipesStore.resetFilters() }

function iWillBeLuck() {
    const randomId = recipesStore.getRandomRecipe()
    router.push({name: 'details', params: {id: randomId}})
}
</script>

<template>
    <div class="container-fluid px-2 py-2" style="height: 100dvh; background-color: #efefef;">
        <div class="row mx-0" style="height: 70px;">
            <NavBarComponent
            title="Collection of recipes from our countries in the world"
            ></NavBarComponent>
        </div>

        <div class="row mx-0 pt-2" style="height: calc(100% - 70px);">
            <div class="col-3 h-100 px-0 border">
                <LeftSideBarComponent
                :height="872"
                :max-height="872"
                @change-kitchen="changeKitchen"
                @change-meal-type="changeMealType"
                @change-difficult="changeDifficult"
                @reset-filters="resetFilters"
                @i-will-be-luck="iWillBeLuck"
                ></LeftSideBarComponent>
            </div>

            <div class="col-9 h-100 px-2">
                <div class="container-fluid h-100 px-0">
                    <div class="row mx-0" style="height: 60px;">
                        <NavBarComponent
                        title="Recipes found"
                        :count="recipesStore.recipesCount"
                        :height="60"
                        ></NavBarComponent>
                    </div>

                    <div class="row mx-0" style="height: calc(100% - 60px);">
                        <div class="container-fluid h-100 px-0 pt-2" style="background-color: #f7f7f7;">
                            <div class="row row-cols-3 mx-0 px-1 g-2" style="height: calc(100% - 80px);">
                                <div v-for="item in recipesStore.recipesOnPage" class=col>
                                    <RouterLink
                                    :to="`/recipes/${item.id}`"
                                    class="text-decoration-none"
                                    >
                                        <DishCardComponent
                                        :height="354"
                                        :max-height="354"
                                        :title="item.name"
                                        :image="item.image"
                                        description="Any description about recipe"
                                        :cooking-time="item.cookTimeMinutes + item.prepTimeMinutes"
                                        :difficulty="item.difficulty"
                                        :kitchen="item.cuisine"
                                        :meal-type="item.mealType"
                                        ></DishCardComponent>
                                    </RouterLink>
                                </div>
                            </div>

                            <div class="row mx-0" style="height: 90px;">
                                <PaginationComponent
                                :height="90"
                                :max-height="90"
                                :page-count="calcPageCount"
                                @change-page="changePage"
                                ></PaginationComponent>
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
