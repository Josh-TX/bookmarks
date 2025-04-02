<script setup lang="ts">
import type { Bookmark } from '@/models';
import TileCard from './TileCard.vue';
import TileSpot from './TileSpot.vue';
import { ref, watch } from 'vue';
import { dragService } from '@/services/DragService';

const props = defineProps<{
    bookmarks: Bookmark[]
}>();
watch(props, () => {
    console.log("tileContainer watch")
    tempIndexes.value = props.bookmarks.map((z, i) => i);
});
var tempIndexes = ref<number[]>(props.bookmarks.map((z, i) => i));
// setInterval(() => {
//     tempIndexes.value[0] = 1;
// }, 2000);

dragService.listenDragOver((index: number, to: number )=> {
    tempIndexes.value = props.bookmarks.map((z, i) => i);
    console.log("listenDragOver", index, to);
    if (index == to){
        return;
    }
    if (to > index){
        for (var i = index+1; i <= to; i++){
            tempIndexes.value[i]--;
        }
    } else {
        for (var i = index-1; i >= to; i--){
            tempIndexes.value[i]++;
        }
    }
    console.log(tempIndexes.value)
});


</script>

<template>
    <div class="container-container">
        <div class="spot-grid">
            <template v-for="(bookmark, index) in bookmarks">
                <TileSpot :i="index" :bookmark="bookmark">
                    <TileCard :bookmark="bookmark" :i="index" :tempi="tempIndexes[index]"></TileCard>
                </TileSpot>
            </template>
        </div>
    </div>

</template>

<style scoped>
.container-container {
    position: relative;
    height: 100%;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

.spot-grid {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
}

.display-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

@media (min-width: 1200px) {
    .container-container{
        max-width: 1600px;
    }
    .spot-grid{
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }
}
</style>
