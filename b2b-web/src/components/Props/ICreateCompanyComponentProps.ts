import { ICreateCompany } from '../../Actions/Companies/ICreateCompany';

export interface ICreateCompanyComponentProps {
    classes: {
        root: string,
        info: string,
        but: string,
        infoText: string
    },
    loading: boolean,
    onCreateCompany: (body: ICreateCompany) => void
}