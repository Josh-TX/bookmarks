<script setup lang="ts">
import type { Bookmark } from '@/models';
import { dragService } from '@/services/DragService';
import { onMounted, useTemplateRef, watch } from 'vue';

const props = defineProps<{
    i: number,
    tempi: number,
    bookmark: Bookmark
}>()
const el = useTemplateRef('display')
watch(props, () => {
    console.log("change", "i=" + props.i, "tempi=" + props.tempi);
    moveToTemp();
})
onMounted(() => {
    dragService.setupCard(props.i);
})

function moveToTemp(){
    if (!el || !el.value){
        return
    }
    if (props.i == props.tempi){
        el.value.style.top = `0`
        el.value.style.left = `0`
        el.value.style.right = `0`
        el.value.style.bottom = `0`
        return;
    }
    var spot = el.value.parentElement;
    var tempSpot = document.getElementById("spot-" + props.tempi)!;
    if (!spot || !tempSpot){
        return;
    }
    var diffX = spot.offsetLeft - tempSpot.offsetLeft;
    var diffY = spot.offsetTop - tempSpot.offsetTop;
    el.value.style.top = `${-diffY}px`
    el.value.style.left = `${-diffX}px`
    el.value.style.right = `${diffX}px`
    el.value.style.bottom = `${diffY}px`
}

</script>

<template>google
    <div ref="display" class="display" :id="'card-' + i">
        {{ bookmark.name }}
    </div>
</template>

<style scoped>
    .display{
        position: absolute;
        left: 0;
        right: 0;
        top: 0; 
        bottom: 0;
        background-color: #FFFF0022;
        border: 1px solid green;
        transition: left 0.2s, top 0.2s, right 0.2s, bottom 0.2s;
    }
    .dragging {
        transition: none;
        pointer-events: none;
    }

</style>
