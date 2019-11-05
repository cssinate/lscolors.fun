<template>
  <button class="schemeSetColor"
          @click="$emit('color-selected', {event: $event, index: index})">
    <div class="schemeSetColor_preview" :style="`background-color: var(--${meta.prefix}-${meta.name})`"></div>
    <span class="schemeSetColor_name">{{meta.friendly}}{{changed ? '*' : ''}}</span>
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
