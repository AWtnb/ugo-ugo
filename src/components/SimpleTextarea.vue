<script setup lang="ts">
import { ref, onMounted } from "vue";
const props = defineProps<{
  defaultVal: string;
}>();

const emit = defineEmits<{
  updateContent: [value: string];
}>();
const content = ref(props.defaultVal);
onMounted(() => {
  emit("updateContent", content.value);
});
const onInput = () => {
  emit("updateContent", content.value);
};
</script>

<template>
  <textarea @input="onInput" v-model="content" placeholder="paste here!"></textarea>
</template>

<style scoped>
textarea {
  tab-size: 8;
  min-height: 200px;
}
</style>
