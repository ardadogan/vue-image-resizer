<template>
  <div id="app">
    <PhotoUploader/>
  </div>
</template>

<script>
const PhotoUploader = () => import('./views/PhotoUploader.vue');
export  default {
  components: {
    PhotoUploader,
  }
}
</script>
