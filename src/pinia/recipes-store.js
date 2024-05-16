import { ref, reactive } from "vue";
import { defineStore } from "pinia";

export const useRecipesStore  = defineStore('recipes-store', () => {
    const recipes = reactive([])
    const recipesCount = ref(0)

    const recipesFiltering = reactive([])

    const recipesOnPage = reactive([])
    const recipesPerPage = ref(6)

    const currentRecipe = reactive({
        indexInRecipesFiltering: null,
        recipe: {
            id: null,
            name: null,
            image: '/none-image.jpg',
            cuisine: null,
            difficulty: null,
            cookTimeMinutes: null,
            prepTimeMinutes: null,
            caloriesPerServing: null,
            servings: null,
            mealType: [],
            instructions: [],
            tags: []

        }
    })

    const currentKitchen = ref('Any')
    const kitchens = reactive([])

    const currentMealType = ref('Any')
    const mealTypes = reactive([])

    const currentDifficult = ref('Any')
    const difficults = reactive([
        {key: 'Any', selected: true, disabled: false},
        {key: 'Easy', selected: false, disabled: false},
        {key: 'Medium', selected: false, disabled: false},
        {key: 'Hard', selected: false, disabled: true},
    ])

    const currentPage = ref(1)

    async function setRecipes() {
        try{
            const response  = await fetch(
                'https://dummyjson.com/recipes?' +
                'limit=50&' +
                'select=id,name,image,cuisine,difficulty,cookTimeMinutes,prepTimeMinutes,' +
                    'caloriesPerServing,servings,mealType,instructions,tags'
            )
            const data = await response.json()

            recipes.splice(0, recipes.length)
            data['recipes'].forEach(element => { recipes.push(element) })
            recipesCount.value = data['total']

            // 
            setRecipesFiltering()
            setRecipesOnPage()

        } catch (error) { alert('Internal server error!') }
    }

    function setRecipesFiltering() {
        recipesFiltering.splice(0, recipesFiltering.length)
        recipes.forEach(element => {
            var flag1 = true
            var flag2 = true
            var flag3 = true

            if (currentKitchen.value == 'Any' || element['cuisine'] == currentKitchen.value) { flag1 = true }
            else { flag1 = false }

            if (currentMealType.value == 'Any' || element['mealType'].includes(currentMealType.value)) { flag2 = true }
            else { flag2 = false }

            if (currentDifficult.value == 'Any' || element['difficulty'] == currentDifficult.value) {flag3= true}
            else { flag3 = false }

            if (flag1 && flag2 && flag3) { recipesFiltering.push(element) }
        })

        recipesCount.value = recipesFiltering.length
    }

    function setRecipesOnPage() {
        recipesOnPage.splice(0, recipesOnPage.length)
        
        var index = (currentPage.value - 1) * recipesPerPage.value
        var stop = currentPage.value*recipesPerPage.value
        while (index < stop && index < recipesFiltering.length) {
            recipesOnPage.push(recipesFiltering[index])
            index++
        }
    }

    async function setKitchen() {
        try {
            const response  = await fetch(
                'https://dummyjson.com/recipes?' +
                'limit=50&' +
                'select=cuisine'
            )
            const data = await response.json()
    
            kitchens.splice(0, kitchens.length)
            kitchens.push({key: 'Any', selected: true})

            const tmp = []
            data['recipes'].forEach(element => {
                if (!tmp.includes(element['cuisine'])) {
                    kitchens.push({key: element['cuisine'], selected: false})
                    tmp.push(element['cuisine'])
                }
            })

        } catch (error) { alert('Internal server error!') }
    }

    async function setMealType() {
        try {
            const response  = await fetch(
                'https://dummyjson.com/recipes?' +
                'limit=50&' +
                'select=mealType'
            )
            const data = await response.json()
    
            mealTypes.splice(0, mealTypes.length)
            mealTypes.push({key: 'Any', selected: true})

            const tmp = []
            data['recipes'].forEach(element => {
                element['mealType'].forEach(value => {
                    if (!tmp.includes(value)) {
                        mealTypes.push({key: value, selected: false})
                        tmp.push(value)
                    }
                })
            })

        } catch (error) { alert('Internal server error!') }
    }

    function setCurrentRecipe(id) {
        var index = 0
        while (index < recipesFiltering.length) {
            if (recipesFiltering[index].id == id) {
                currentRecipe.indexInRecipesFiltering = index
                Object.keys(currentRecipe.recipe).forEach(key => {
                    currentRecipe.recipe[key] = recipesFiltering[index][key]
                })
            }

            index++
        }
    }

    function setCurrentKitchen(newKitchen) {
        if (newKitchen != currentKitchen.value) {
            kitchens.forEach(element => {
                if (element.key == currentKitchen.value) { element.selected = false }
                else if (element.key == newKitchen) { element.selected = true }
            })
    
            currentKitchen.value = newKitchen
        }
    }

    function setCurrentMealType(newMealType) {
        if (newMealType != currentMealType.value) {
            mealTypes.forEach(element => {
                if (element.key == currentMealType.value) { element.selected = false }
                else if (element.key == newMealType) { element.selected = true }
            })
    
            currentMealType.value = newMealType
        }
    }

    function setCurrentDifficult(newDifficult) {
        if (newDifficult != currentDifficult.value) {
            difficults.forEach(element => {
                if (element.key == currentDifficult.value) { element.selected = false }
                else if (element.key === newDifficult) { element.selected = true }
            })

            currentDifficult.value = newDifficult
        }
    }

    function setCurrentPage(newPage) { currentPage.value = newPage }

    function resetFilters() {
        setCurrentKitchen('Any')
        setCurrentMealType('Any')
        setCurrentDifficult('Any')
        setRecipesFiltering()
        setRecipesOnPage()
    }

    function getRandomRecipe() {
        const recipesId = []
        recipesFiltering.forEach(element => { recipesId.push(element['id']) })

        const randomIndex = Math.floor(Math.random()*recipesId.length)
        return recipesId[randomIndex]
    }

    return {
        recipes,
        recipesCount,
        recipesFiltering,
        recipesOnPage,
        recipesPerPage,

        currentRecipe,

        currentKitchen,
        kitchens,

        currentMealType,
        mealTypes,

        currentDifficult,
        difficults,

        currentPage,

        setRecipes,
        setRecipesFiltering,
        setRecipesOnPage,

        setCurrentRecipe,

        setKitchen,
        setMealType,

        setCurrentKitchen,
        setCurrentMealType,
        setCurrentDifficult,
        setCurrentPage,

        resetFilters,

        getRandomRecipe
    }
})
