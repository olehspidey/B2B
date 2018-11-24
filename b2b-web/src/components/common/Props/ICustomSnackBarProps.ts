export interface ICustomSnackBarProps {
    classes: {
        success: string,
        icon: string,
        iconVariant: string,
        message: string,
        error: string
    },
    open: boolean,
    onClose: () => void,
    message: string,
    autoHideDuration?: number,
    type?: "alert" | "error"
}