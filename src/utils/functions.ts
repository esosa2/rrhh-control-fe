import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function showAlert(
    message: string,
    alert: 'success' | 'error' | 'warning' | 'info' | 'question',
    focus?: string
) {
    onFocus(focus);
    const mySwal = withReactContent(Swal);

    mySwal.fire({
        title: message,
        icon: alert,
    });

}

function onFocus(focus?: string) {
    if (focus) {
        const element = document.querySelector(focus);
        if (element) {
            (element as HTMLElement).focus();
        }
    }
}