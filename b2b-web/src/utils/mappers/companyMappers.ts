export const mapCompanyType = (type: number) => {
    switch (type) {
        case 0:
            return 'Industrial Chemistry';
        case 1:
            return 'Consumer Goods';
        case 2:
            return 'Medicine and Pharmaceuticals';
        case 3:
            return 'Electronics';
        case 4:
            return 'Transport';
        case 5:
            return 'All for Office';
        case 6:
            return 'Food and Agriculture';
        case 7:
            return 'Metallurgy and Hardware';
        case 8:
            return 'Construction and Repair';
        default:
            return 'None';
    }
}