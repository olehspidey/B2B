export const mapSubscriptionType = (type: number) => {
    switch (type) {
        case 0:
            return 'Lite';
        case 1:
            return 'Base';
        case 2:
            return 'Gold';
        case 3:
            return 'Free';
        default:
            return 'None';
    }
}

export const mapPersonType = (type: number) => {
    switch (type) {
        case 0:
            return 'Physical';
        case 1:
            return 'Legal';
        default:
            return 'None';
    }
}