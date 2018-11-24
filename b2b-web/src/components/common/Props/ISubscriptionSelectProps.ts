export interface ISubscriptionSelectProps {
    classes: {
        root: string,
        paper: string,
        icon: string,
        lite: string,
        base: string,
        gold: string,
        paddingTop: string,
        margin: string
    },
    onSelect: (subscriptionType: number) => void
}