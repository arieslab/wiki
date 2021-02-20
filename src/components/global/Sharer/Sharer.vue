<template>
  <Dropdown
    tooltip="Compartilhar"
    hide-indicator
    :items="share"
    :change-name-on-select="false"
    @change="select"
  >
    <Icon name="share" size="16" />
  </Dropdown>
</template>
<script>
export default {
  name: 'Sharer',
  props: {
    urlTitle: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      twitter: 'http://twitter.com/share?',
      facebook: 'https://www.facebook.com/sharer.php?'
    }
  },
  computed: {
    share() {
      return [
        { name: 'Facebook', icon: 'facebook', value: 'facebook' },
        { name: 'Twitter', icon: 'twitter', value: 'twitter' },
        { name: 'Copiar link', icon: 'link-icon', value: 'link' }
      ]
    },
    route() {
      if (this.url.startsWith('http')) {
        return this.url
      }
      return 'https://meforma.app' + this.url
    }
  },
  methods: {
    select(item) {
      switch (item.value) {
        case 'facebook':
          return this.shareFacebook()
        case 'twitter':
          return this.shareTwitter()
        case 'link':
          return this.copyLink()
      }
    },
    shareUrl(url, title) {
      window.open(
        url,
        title,
        'height=670, width=670, top=' +
          (window.innerHeight / 2 - 200) +
          ', left=' +
          (window.innerWidth / 2 - 335) +
          ', toolbar=no, menubar=no, scrollbars=yes, resizable=yes'
      )
      window.setTimeout(() => {
        this.$emit('opened')
      }, 300)
    },
    shareFacebook() {
      this.shareUrl(
        `${this.facebook}u=${encodeURIComponent(this.route)}`,
        'Compartilhe no Facebook'
      )
    },
    shareTwitter() {
      this.shareUrl(
        `${this.twitter}text=${this.urlTitle
          .split('|')
          .join('-')}&url=${encodeURIComponent(this.route)}&via=MeForma!`,
        'Compartilhe no Twitter'
      )
    },
    copyLink() {
      this.$copyText(`${this.urlTitle}\n${this.route}`)
        .then(() => {
          this.$toast.show('Link copiado!')
        })
        .catch(() => {
          this.$toast.error('Não foi possível copiar. Tente novamente.')
        })
    }
  }
}
</script>
