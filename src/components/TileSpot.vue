<script setup lang="ts">
defineProps<{
    i: number,
}>()
</script>

<template>
    <div class="spot-container">
        <div class="spot" :id="'spot-' + i">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.spot-container {
    background-color: #FF000088;
    min-height: 128px;
    padding: 12px;
}
.spot{
    background-color: #007FFF88;
    position: relative;
    height: 100%;
}
</style>
