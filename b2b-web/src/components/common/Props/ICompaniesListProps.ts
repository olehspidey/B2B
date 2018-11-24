import { ICompaniesState } from '../../../Reducers/Companies/ICompaniesState';

export interface ICompaniesListProps {
    classes?: {
        root: string,
        list: string,
        emptyBox: string,
        but: string,
        link: string,
        createBut: string,
        space: string
    },
    renderCreateBut: boolean,
    companyState: ICompaniesState,
    emptyListText: string,
    space?: boolean
}