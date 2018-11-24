import {
    FETCH_APPLICATION_FORMS_REQUEST,
    FETCH_APPLICATION_FORMS_SUCCESS,
    FETCH_APPLICATION_FORMS_FAILURE
} from '../../Actions/ApplicationForms/applicationForms';
import { IApplicationFormsState } from './IApplicationFormsState';
import { IApplicationFormsAction } from '../../Actions/ApplicationForms/IApplicationFormsAction';

const initState: IApplicationFormsState = {
    applicationForm: null,
    applicationForms: [],
    loading: false,
    error: null
};

export default (state = initState, action: IApplicationFormsAction): IApplicationFormsState => {
    switch (action.type) {
        case FETCH_APPLICATION_FORMS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_APPLICATION_FORMS_SUCCESS:
            return {
                ...state,
                loading: false,
                applicationForms: action.applicationForms
            };
        case FETCH_APPLICATION_FORMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return {
                ...state
            };
    }
}