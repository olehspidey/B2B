export interface IBaseContainerState {
    errorMessage: string,
    canRenderErrorMessage: boolean,
    statusCode: number | null,
    alertMessage: string,
    canRenderAlertMessage: boolean
}