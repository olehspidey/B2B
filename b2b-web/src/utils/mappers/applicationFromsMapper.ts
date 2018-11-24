export const mapApplicationFromStatus = (status: number) => {
    switch (status) {
        case 0:
            return 'New';
        case 1:
            return 'Confirmed';
        case 2:
            return 'Rejected';
        default:
            return 'None';
    }
}