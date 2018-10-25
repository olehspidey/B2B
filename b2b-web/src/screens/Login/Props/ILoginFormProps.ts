import * as React from 'react';

export interface ILoginFormProps {
    classes: {
        container: string,
        textField: string,
        button: string,
        formElems: string,
        link: string
    },
    loading: boolean,
    onLogin(e: React.FormEvent<HTMLFormElement>): void
}