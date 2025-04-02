<script setup lang="ts">
import TileContainer from './components/TileContainer.vue'

var bookmarks = [
    {name: "google", url: "http://google.com"},
    {name: "google", url: "http://google.com"},
    {name: "google", url: "http://google.com"},
    {name: "google", url: "http://google.com"},
    {name: "google", url: "http://google.com"},
    {name: "google", url: "http://google.com"},
]

// document.body.addEventListener('dragover', function (e) {
//     // Prevent default to allow drop
//     e.preventDefault();
// });

// document.body.addEventListener('drop', function (e) {
//     e.preventDefault();
//     console.log(e)
//     const dataTransfer = e.dataTransfer;
//     if (dataTransfer) {
//         // Check for the URL (text/uri-list)
//         const url = dataTransfer.getData('text/uri-list');
//         const text = dataTransfer.getData('text/plain');

//         console.log('Dropped Data:');
//         console.log('URL:', url);
//         console.log('Text:', text);

//         if (url) {
//             console.log('Bookmark URL:', url);
//         } else {
//             console.log('No URL found in dropped data.');
//         }
//     }
// });

</script>

<template>
    <div>
        heading
        <TileContainer :bookmarks="bookmarks"></TileContainer>
    </div>
</template>

<style scoped>
header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
