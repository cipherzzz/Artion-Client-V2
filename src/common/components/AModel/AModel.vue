<template>
    <model-gltf :src="src" :lights="lights" backgroundColor="#f6f6f6" />
</template>
<script>
import { ModelGltf } from 'vue-3d-model';
import { DirectionalLight, HemisphereLight } from 'three';

function createLights() {
    const ambientLight = new HemisphereLight(
        'white', // bright sky color
        'darkslategrey', // dim ground color
        8 // intensity
    );
    const mainLight = new DirectionalLight('white', 8);
    mainLight.position.set(10, 10, 10);

    return [ambientLight, mainLight];
}
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
        lights: {
            type: [DirectionalLight],
            default: createLights(),
            required: true,
        },
    },
};
</script>
