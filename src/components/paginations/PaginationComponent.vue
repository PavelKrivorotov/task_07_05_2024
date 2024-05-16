<script setup>
import { ref, reactive, watch} from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const props = defineProps({
    height: {
        type: Number ,
        required: false,
        default: 40
    },
    maxHeight: {
        type: Number,
        required: false,
        default: 40
    },
    pageCount: {
        type: Number,
        required: false,
        default: 9
    }
})

const emits = defineEmits(['changePage'])

const route = useRoute()

const visiblePageCount = ref(9)
const pageArray = reactive([])
const previewPage = reactive({to: null, disabled: null})
const nextPage = reactive({to: null, disabled: null})

watch(
    () => route.query,
    () => {
        const page = Number(route.query['page'])
        emits('changePage', page)
        setOptions(page)
    },
    {immediate: true}
)

watch(
    () => props.pageCount,
    () => {
        const page = Number(route.query['page'])
        setOptions(page)
    },
    {immediate: true}
)

function setPageArray(currentPage) {
    pageArray.splice(0, pageArray.length)

    if (props.pageCount < visiblePageCount.value + 1) {
        Array.from({length: props.pageCount}, (_, i) => i + 1).forEach(
            element => {
                const e = makePageArrayElement(element, currentPage, false)
                pageArray.push(e)
            }
        )

    } else {
        if (currentPage < 5) {
            let page = 1
            while (page < 8) {
                const e = makePageArrayElement(page, currentPage, false)
                pageArray.push(e)
                page++
            }

            let w = makePageArrayElement(page, currentPage, true)
            pageArray.push(w)

            let r = makePageArrayElement(props.pageCount, currentPage, false)
            pageArray.push(r)

        } else if (currentPage > props.pageCount - 5) {
            let l = makePageArrayElement(1, currentPage, false)
            pageArray.push(l)

            let w = makePageArrayElement(2, currentPage, true)
            pageArray.push(w)

            let page = props.pageCount - 6
            while (page < props.pageCount + 1) {
                const e = makePageArrayElement(page, currentPage, false)
                pageArray.push(e)
                page++
            }

        } else {
            let l = makePageArrayElement(1, currentPage, false)
            pageArray.push(l)

            let w1 = makePageArrayElement(2, currentPage, true)
            pageArray.push(w1)

            let page = currentPage - 2
            while (page < currentPage + 3) {
                const e = makePageArrayElement(page, currentPage, false)
                pageArray.push(e)
                page++
            }

            let w2 = makePageArrayElement(props.pageCount - 1, currentPage, true)
            pageArray.push(w2)

            let r = makePageArrayElement(props.pageCount, currentPage, false)
            pageArray.push(r)
        }
    }
}

function setPreviewPage(currentPage) {
    if (currentPage > 1) {
        previewPage.to = constructToUrl(currentPage - 1)
        previewPage.disabled = false

    } else {
        previewPage.to = ''
        previewPage.disabled = true
    }
}

function setNextPage(currentPage) {
    if (currentPage < props.pageCount) {
        nextPage.to = constructToUrl(currentPage + 1)
        nextPage.disabled = false

    } else {
        nextPage.to = ''
        nextPage.disabled = true
    }
}

function makePageArrayElement(value, currentPage, wildcard) {
    if (wildcard == true) {
        return {to: '', value: '', active: false, wildcard: true}

    } else {
        return {
            to: constructToUrl(value),
            value: value,
            active: value == currentPage? true: false,
            wildcard: false
        }
    }
}

function constructToUrl(value) {
    const path = route.fullPath
    const newPage = 'page=' + String(value)
    return path.replace(RegExp('page=[0-9]*'), newPage)
}

function setOptions(page) {
    setPreviewPage(page)
    setNextPage(page)
    setPageArray(page)
}

</script>

<template>
    <div class="container-fluid px-0" :style="`height: ${props.height}px; max-height: ${props.maxHeight}px`">
        <div class="row h-100 mx-0">
            <div class="col h-100 px-0">
                <ul class="pagination justify-content-center align-items-center h-100 mb-0">
                    <li class="page-item pe-2">
                        <RouterLink
                        aria-label="Previous"
                        :to="previewPage.to"
                        class="page-link"
                        :class="previewPage.disabled? 'disabled': ''"
                        >
                            <span aria-hidden="true">&lt</span>
                        </RouterLink>
                    </li>

                    <template v-for="item in pageArray">
                        <template v-if="item.wildcard">
                            <li class="pe-2">
                                <div class="w-100 h-100 px-1 py-1">
                                    <span style="user-select: none;">...</span>
                                </div>
                            </li>
                        </template>

                        <template v-else>
                            <li class="page-item pe-2">
                                <RouterLink
                                :to="item.to"
                                class="page-link"
                                :class="item.active? 'active': ''"
                                >
                                    {{ item.value }}
                                </RouterLink>
                            </li>
                        </template>
                    </template>

                    <li class="page-item">
                        <RouterLink
                        aria-label="Next"
                        :to="nextPage.to"
                        class="page-link"
                        :class="nextPage.disabled? 'disabled': ''"
                        >
                            <span aria-hidden="true">&gt</span>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
