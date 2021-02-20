<template>
  <div class="c-file-upload">
    <label v-if="label" :for="fieldId" class="c-file-upload__label">
      {{ label }}
    </label>
    <div
      class="c-file-upload__uploader"
      :class="{
        'v--rounded': rounded,
        'v--block': block,
        'v--active': file && file.name,
        'v--light': !(file && file.name)
      }"
    >
      <input
        class="c-file-upload__uploader-input"
        type="file"
        :name="name"
        :required="required"
        @change="onChange"
      />
      <div
        class="c-file-upload__uploader-false-btn v--flex v--flex-align-middle"
      >
        <Icon name="upload-cloud" :size="14" />
        <Spacing class="c-file-upload__uploader-text" left="1">{{
          file && file.name ? file.name : 'Clique para escolher um arquivo'
        }}</Spacing>
      </div>
    </div>
    <small v-if="!file && maxSize">Máximo {{ maxSize }}MB</small>
    <small v-if="file">
      {{ file && file.name.split('.').pop().toUpperCase() }} -
      {{ file && size(file.size) }}
    </small>
  </div>
</template>
<script>
if (!window.FileReader) {
  console.error('Your browser does not support FileReader API!')
}

export default {
  name: 'FileUpload',
  emits: ['size-exceeded'],
  props: {
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    block: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    imageClass: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: ''
    },
    maxSize: {
      type: Number,
      default: 25 // megabytes
    },
    disablePreview: {
      type: Boolean,
      default: false
    },
    fileName: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Click here to upload image'
    },
    defaultPreview: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      file: null,
      preview: null,
      visiblePreview: false
    }
  },

  computed: {
    fieldId() {
      return `field-${this.name}`
    },
    wrapperStyles() {
      return {
        position: 'relative',
        width: '100%'
      }
    },
    fileInputStyles() {
      return {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        overflow: 'hidden',
        outline: 'none',
        cursor: 'pointer'
      }
    },
    textInputStyles() {
      return {
        width: '100%',
        cursor: 'pointer',
        position: 'relative'
      }
    },
    previewImage() {
      return this.preview || this.defaultPreview
    }
  },
  methods: {
    onChange(e) {
      const files = e.target.files || e.dataTransfer.files

      if (!files.length) {
        return
      }

      const file = files[0]
      const size = file.size && file.size / Math.pow(1000, 2)

      // check file max size
      if (size > this.maxSize) {
        this.$emit('size-exceeded', { size, maxSize: this.maxSize })
        return
      }

      // update file
      this.file = file
      this.$emit('file', file)

      const reader = new FileReader()

      reader.onload = (e) => {
        const dataURI = e.target.result

        if (dataURI) {
          this.$emit('load', {
            data: dataURI,
            localName: file.name,
            extension: file.name.split('.').pop().toLowerCase()
          })

          this.preview = dataURI
        }
      }

      // read blob url from file data
      reader.readAsDataURL(file)
    },
    size(size) {
      const options = ['KB', 'MB', 'GB']
      let i = 0
      let output = size
      for (i = 0; i < options.length; i++) {
        output = output / 1024
        if (output < 1024) {
          break
        }
      }

      return `${output.toFixed(2)} ${options[i === options.length ? i - 1 : i]}`
    }
  }
}
</script>

<style lang="stylus" src="./style.styl" scoped />
