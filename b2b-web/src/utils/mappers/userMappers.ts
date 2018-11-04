export const mapSubscriptionType = (type: number) => {
    switch (type) {
        case 0:
            return 'Lite';
        case 1:
            return 'Base';
        case 2:
            return 'Gold';
        default:
            return 'None';
    }
}