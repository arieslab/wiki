export default {
  colorContrast(bgColor, lightColor, darkColor) {
    var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor
    var r = parseInt(color.substring(0, 2), 16) // hexToR
    var g = parseInt(color.substring(2, 4), 16) // hexToG
    var b = parseInt(color.substring(4, 6), 16) // hexToB
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor
  },
  string2Hex(str) {
    return `#${this.intToRGB(this.hashCode(str))}`
  },
  hashCode(str) {
    str = str || ''
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return hash
  },
  intToRGB(i) {
    let c = (i & 0x00ffffff).toString(16).toUpperCase()

    return '00000'.substring(0, 6 - c.length) + c
  }
}
