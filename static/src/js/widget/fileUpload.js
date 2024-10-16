/** @odoo-module **/
import {Component, useState, onWillStart, onWillUpdateProps} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {standardFieldProps} from "@web/views/fields/standard_field_props";
import {useService} from "@web/core/utils/hooks";

class RpcDragFile extends Component {
    static props = {
        ...standardFieldProps,
    };

    setup() {
        this.rpc = useService("rpc");

        this.state = useState({
            fileDetails: [],
            isLoading: false,
            error: null,
            fileIds: this.props.record.data.file_upload || [],
        });

        onWillStart(() => {
            console.log("Component is about to start");
            this.fetchFileNames(); // Fetch initial data
        });

        onWillUpdateProps(() => {
            console.log("Props are about to update");
            // Update fileIds from props and fetch file names
            this.state.fileIds = this.props.record.data.file_upload || [];
            this.fetchFileNames();
        });

        // Event handlers
        this.handleDragOver = (event) => {
            event.preventDefault();
        };

        this.handleDrop = async (event) => {
            event.preventDefault();
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                await this.handleFileChange({target: {files}});
            }
        };

        this.handleFileChange = async (event) => {
            const files = event.target.files;
            if (files.length > 0) {
                this.state.isLoading = true;
                this.state.error = null;

                try {
                    const filesData = await Promise.all(
                        Array.from(files).map((file) => this.convertFileToBase64(file))
                    );

                    const result = await this.rpc("/web/dataset/call_kw", {
                        model: "ir.attachment",
                        method: "create",
                        args: [
                            filesData.map((file) => ({
                                name: file.name,
                                type: "binary",
                                datas: file.content,
                            })),
                        ],
                        kwargs: {},
                    });

                    if (Array.isArray(result)) {
                        this.state.fileIds = [...this.state.fileIds, ...result];
                        await this.props.record.update({[this.props.name]: this.state.fileIds});
                        await this.fetchFileNames();
                    } else {
                        this.state.error = "Unexpected server response format";
                    }
                } catch (error) {
                    this.state.error = `Error uploading files: ${error.message}`;
                } finally {
                    this.state.isLoading = false;
                }
            }
        };


        this.handleDelete = async (fileId) => {
            this.state.isLoading = true;
            this.state.error = null;

            try {
                await this.rpc("/web/dataset/call_kw", {
                    model: "ir.attachment",
                    method: "unlink",
                    args: [[fileId]],
                    kwargs: {},
                });

                this.state.fileIds = this.state.fileIds.filter((id) => id !== fileId);
                await this.props.record.update({[this.props.name]: this.state.fileIds});
                await this.fetchFileNames();
            } catch (error) {
                this.state.error = `Error deleting file: ${error.message}`;
            } finally {
                this.state.isLoading = false;
            }
        };


    }

    async fetchFileNames() {
        try {
            this.state.isLoading = true;
            const fileIds = Array.from(this.state.fileIds);
            console.log("Fetching file names for IDs:", fileIds);

            if (fileIds.length === 0) {
                this.state.isLoading = false;
                console.log("No file IDs to fetch");
                return;
            }

            const result = await this.rpc("/web/dataset/call_kw", {
                model: "ir.attachment",
                method: "read",
                args: [fileIds, ["name", "file_size"]],
                kwargs: {},
            });

            console.log("Fetched file names:", result);

            this.state.fileDetails = result.map((file) => ({
                id: file.id,
                name: file.name,
                size: file.file_size,
            }));
        } catch (error) {
            console.error("Error fetching file names:", error.message);
            this.state.error = error.message;
        } finally {
            this.state.isLoading = false;
        }
    }

    convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () =>
                resolve({
                    name: file.name,
                    content: reader.result.split(",")[1],
                    type: file.type,
                });
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }


    get hasError() {
        return this.state.error !== null;
    }

    get isLoading() {
        return this.state.isLoading;
    }

    get fileDetails() {
        return this.state.fileDetails;
    }
}

RpcDragFile.template = "input_mask.rpcUpload";

export const DragFileCustom = {
    component: RpcDragFile,
};

registry.category("fields").add("RpcDragFile", DragFileCustom);
