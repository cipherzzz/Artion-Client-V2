/**
 * @param {File} file
 * @return {boolean}
 */
export function imageValidator(file) {
    console.log('file.type', file.type);
    return (
        file &&
        (file.type.indexOf('image/') > -1 ||
            file.type.indexOf('video/') > -1 ||
            file.type.indexOf('audio/') > -1 ||
            file.name.indexOf('.glb') > -1)
    );
}
