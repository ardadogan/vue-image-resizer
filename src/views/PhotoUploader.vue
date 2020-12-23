<template>
  <div class="container">
    <div class="row">
        <div class="col-12 mt-5">
          <label for="file_upload" id="images" class="w-100">
            <div class="d-flex justify-content-center bg-styles">
              <div class="d-flex flex-column justify-content-center">
                <span class="py-5"><b>Browse</b> your images...</span>
              </div>
            </div>
          </label>
          <input type="file" multiple id="file_upload" ref="file" @change="readURL" name="post-image" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" class="input-file" >
        </div>
      </div>
    <div class="row mt-3">
      <div class="col-4" v-for="(item, key) in photos" :key="key">
        <img :src="item.src" class="img-fluid" alt="file" >
        <span class="text-center">{{sizeConverter(item.file.size)}} - MB</span>
      </div>
    </div>
  </div>
</template>

<script>
import ImageResizer from '../js/image-resizer';

export default {
  name: 'PhotoUploader',
  data() {
    return {
      resizedImg: null,
      photos: [],
    };
  },
  methods: {
    async readURL() {
      const images = [...this.$refs.file.files];
        for (const file of images) {
          const result = await ImageResizer.resizeImage({ file, maxSize: 1200 });
          console.log(result);
          this.photos.push({ file: result.file, src: result.src });
        }
    },
    sizeConverter(file) {
      return (file / (1024 * 1024)).toFixed(2);
    }
  }
};
</script>

<style scoped>
.bg-styles {
  background-color: #f7f7f7;
  border: 1px dashed #dfe0e7;
  border-radius: 3px;
}
input {
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>İ