import { notyf } from "$lib/config/notyf";

const showErrorToast = (msg: string = "something went wrong") => {
    notyf.error(msg);
};

function showSuccessToast(message: string = "success") {
    notyf.success(message);
}

export { showErrorToast, showSuccessToast };
