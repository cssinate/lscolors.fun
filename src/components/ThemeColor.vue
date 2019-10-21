<template>
  <button class="themeSetColor"
          @click="$emit('color-selected', {event: $event, index: index})">
    <span class="themeSetColor_name">{{meta.friendly}}{{changed ? '*' : ''}}</span>
    <div class="themeSetColor_preview" :style="`background-color: var(--${meta.prefix}-${meta.name})`"></div>
  </button>
</template>

<script>

export default {
  props: {
    index: Number,
    meta: Object,
    changed: Boolean
  }
}
</script>
