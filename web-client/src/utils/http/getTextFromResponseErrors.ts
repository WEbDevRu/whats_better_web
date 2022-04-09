import { IResponse } from '../../hooks/useRequest';

interface IExpectedError {
    errorCode: string,
    errorText?: string,
}

export const getTextFromResponseErrors = ({ response, expectedErrors }:{ response:IResponse, expectedErrors?:IExpectedError[]})  => {
    console.log(response, expectedErrors);
}