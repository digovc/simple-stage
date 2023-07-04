<template>
  <div>
    <Menu v-if="isVisible" @onClose="isVisible = false">
      <MenuItem @click="openTranspose">
        Transpose
      </MenuItem>
      <MenuItem>
        Test 1
      </MenuItem>
      <MenuItem>
        Test 2
      </MenuItem>
      <MenuItem>
        Test 3
      </MenuItem>
    </Menu>

    <Transpose ref="transposeRef"/>
  </div>
</template>

<script setup lang="ts">
import Menu from "@/components/Menu.vue";
import MenuItem from "@/components/MenuItem.vue";
import { ref } from "vue";
import Transpose from "@/dialogs/transpose/Transpose.vue";

const isVisible = ref<boolean>(false);
const transposeRef = ref<HTMLElement>() as any;

const openTranspose = () => {
  isVisible.value = false;
  transposeRef.value?.show();
};

const show = () => {
  isVisible.value = true;
};

defineExpose({
  show
})

</script>
