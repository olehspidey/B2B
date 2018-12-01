export interface ISubscriptionComponentPropsClasses {
    root: string,
    subType: string,
    lite: string,
    base: string,
    gold: string,
    free: string
}

export interface ISubscriptionComponentProps {
    text: string,
    subscriptionType: number,
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "title",
    subTypePadding?: string,
    classes: ISubscriptionComponentPropsClasses
}