import { ICreateCompany } from '../../Actions/Companies/ICreateCompany';

export interface ICreateCompanyComponentProps {
    classes: {
        root: string,
        info: string,
        but: string,
        infoText: string
    },
    onCreateCompany: (body: ICreateCompany) => void
}