export default {
    dataURLtoFile(dataurl, filename) {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    },
    resizeImage({ file, maxSize }) {
        const reader = new FileReader();
        const image = new Image();
        const canvas = document.createElement('canvas');
        const resize = () => {
            let { width, height } = image;
            if (width > height) {
                if (width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                }
            } else if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
            }
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            const convertedFile = this.dataURLtoFile(dataUrl, file.name);
            return { file: convertedFile, src: dataUrl };
        };
        return new Promise((ok, no) => {
            if (!file.type.match(/image.*/)) {
                no(new Error('Not an image'));
                return;
            }
            reader.onload = (readerEvent) => {
                image.onload = () => {
                    ok(resize());
                };
                image.src = readerEvent.target.result;
            };

            reader.readAsDataURL(file);
        });
    },
};
