/** @odoo-module **/
import {ImageField, imageField} from "@web/views/fields/image/image_field";
import {registry} from "@web/core/registry";
import {useState} from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";

export class AvatarImgUpload extends ImageField {
    setup() {
        this.state = useState({
            videoVisible: false,
            imageVisible: false,
            capturedImage: ''
        });
           super.setup();

        this.orm = useService('orm');
    }

    async oncamera() {
        $('#cameraModal').modal('show');
        if (!this.state.videoVisible) {
            await this.toggleCamera(true);
        }
    }

    async onremove() {
        $('#cameraModal').modal('hide');
        await this.toggleCamera(false);
        this.state.imageVisible = false;
    }

    async toggleCamera(visible) {
        this.state.videoVisible = visible;
        const video = document.getElementById('video');

        if (!video) {
            console.error('Video element not found.');
            return;
        }

        if (visible) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;
                video.play();
            } catch (error) {
                console.error('Error accessing camera:', error);
                alert(_t('Check if the camera is being used and that you have granted permission.'));
            }
        } else {
            const stream = video.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                video.srcObject = null;
            }
        }
    }

    captureImage() {
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        if (!video || !canvas) {
            console.error('Video or Canvas element not found.');
            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL('image/webp');
        this.state.capturedImage = imageData;
        this.state.videoVisible = false;
        this.state.imageVisible = true;
        $('#cameraModal').modal('hide');
        this.uploadImageToBackend(imageData);
        this.toggleCamera(false);
    }

    async uploadImageToBackend(imageData) {
        try {
            const base64Data = imageData.split(',')[1]; // Extract base64 data
            this.props.record.update({ [this.props.name]: base64Data });
            this.notification.add(_t('Image successfully uploaded'), { type: 'success' });
        } catch (error) {
            console.error('Error uploading image:', error);
            this.notification.add(_t('Failed to upload the image'), { type: 'danger' });
        }
    }
}

AvatarImgUpload.template = "input_mask.ImageField";

registry.category('fields').add('avatar_img_upload', {
    ...imageField,
    component: AvatarImgUpload
});
