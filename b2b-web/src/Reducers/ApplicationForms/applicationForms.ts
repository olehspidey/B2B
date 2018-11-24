import {
    FETCH_APPLICATION_FORMS_REQUEST,
    FETCH_APPLICATION_FORMS_SUCCESS,
    FETCH_APPLICATION_FORMS_FAILURE,

    FETCH_APPLICATION_FORM_REQUEST,
    FETCH_APPLICATION_FORM_SUCCESS,
    FETCH_APPLICATION_FORM_FAILURE,

    CREATE_APPLICATION_FORM_REQUEST,
    CREATE_APPLICATION_FORM_SUCCESS,
    CREATE_APPLICATION_FORM_FAILURE,
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
        case FETCH_APPLICATION_FORM_REQUEST:
        case CREATE_APPLICATION_FORM_REQUEST:
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
        case FETCH_APPLICATION_FORM_SUCCESS:
        case CREATE_APPLICATION_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                applicationForm: action.applicationForm
            };
        case FETCH_APPLICATION_FORMS_FAILURE:
        case FETCH_APPLICATION_FORM_FAILURE:
        case CREATE_APPLICATION_FORM_FAILURE:
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