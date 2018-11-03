import { IUser } from '../../Core/Models/ReducerModels/User/IUser';

export interface IUserPanelLayoutProps {
    user: IUser | null,
    userLoading: boolean,
    classes: {
        root: string,
        appBar: string,
        appBarShift: string,
        menuButton: string,
        hide: string,
        drawerPaper: string,
        drawerPaperClose: string,
        toolbar: string,
        content: string,
        link: string,
        toolbarActions: string
    }
}