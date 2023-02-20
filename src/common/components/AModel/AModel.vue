<template>
    <model-gltf :src="src" />
</template>
<script>
import { ModelGltf } from 'vue-3d-model';
export default {
    name: 'AModel',
    components: { ModelGltf },
    props: {
        /** Model source */
        src: {
            type: String,
            default: '',
            required: true,
        },
    },
};
</script>
