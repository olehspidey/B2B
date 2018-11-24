export interface ISpinnerProps {
    color?: 'primary' | 'secondary' | 'inherit',
    flex?: boolean,
    classes: {
        root: string,
        progress: string,
        rootFlex: string
    }
}