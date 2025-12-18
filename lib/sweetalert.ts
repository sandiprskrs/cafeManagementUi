import Swal from 'sweetalert2';

// Custom SweetAlert2 configuration for the cafe theme
const customSwal = Swal.mixin({
    customClass: {
        popup: 'rounded-xl shadow-2xl',
        title: 'text-2xl font-bold',
        confirmButton: 'bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-6 rounded-lg transition-all',
        cancelButton: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium py-2 px-6 rounded-lg transition-all',
        denyButton: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground font-medium py-2 px-6 rounded-lg transition-all',
    },
    buttonsStyling: false,
    showClass: {
        popup: 'animate-slide-in-from-top',
    },
    hideClass: {
        popup: 'animate-fade-out',
    },
});

// Success alert
export const showSuccess = (title: string, message?: string) => {
    return customSwal.fire({
        icon: 'success',
        title,
        text: message,
        confirmButtonText: 'Great!',
        timer: 3000,
        timerProgressBar: true,
    });
};

// Error alert
export const showError = (title: string, message?: string) => {
    return customSwal.fire({
        icon: 'error',
        title,
        text: message,
        confirmButtonText: 'OK',
    });
};

// Warning alert
export const showWarning = (title: string, message?: string) => {
    return customSwal.fire({
        icon: 'warning',
        title,
        text: message,
        confirmButtonText: 'OK',
    });
};

// Info alert
export const showInfo = (title: string, message?: string) => {
    return customSwal.fire({
        icon: 'info',
        title,
        text: message,
        confirmButtonText: 'Got it',
    });
};

// Confirmation dialog
export const showConfirm = (title: string, message?: string, confirmText = 'Yes', cancelText = 'No') => {
    return customSwal.fire({
        title,
        text: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        reverseButtons: true,
    });
};

// Delete confirmation
export const showDeleteConfirm = (itemName?: string) => {
    return customSwal.fire({
        title: 'Are you sure?',
        text: itemName ? `Do you want to delete "${itemName}"? This action cannot be undone.` : 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
    });
};

// Loading alert
export const showLoading = (title: string = 'Processing...', message?: string) => {
    return Swal.fire({
        title,
        text: message,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
};

// Close loading
export const closeLoading = () => {
    Swal.close();
};

// Toast notification (non-blocking)
export const showToast = (title: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });

    return Toast.fire({
        icon,
        title,
    });
};

// Custom HTML alert
export const showCustom = (options: any) => {
    return customSwal.fire(options);
};

export default customSwal;
