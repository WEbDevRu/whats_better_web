import { useEffect, useState } from 'react';
import { IResponse, IResponseError } from './useRequest';
import { RequestStatuses } from '../const/http';

interface IExpectedError {
    errorCode: string,
    errorText?: string,
    fieldName: string,
}

interface IFieldError {
    name: string,
    errors: string[] | []
}

export const useFieldResponseErrors = (
    {
        response, expectedErrors
    }:{
        response:IResponse, expectedErrors?:IExpectedError[]
    }):{
        fieldErrors: IFieldError[] | []
} => {
    const [fieldErrors, setFieldErrors] = useState<IFieldError[]>();

    useEffect(() => {
        if ([
            RequestStatuses.Unauthorized,
            RequestStatuses.Succeeded,
            RequestStatuses.Failed
        ].includes(response.status)) {
            const responseErrors = response.errors;
            const fieldsErrors = responseErrors?.reduce((totalFieldErrors:IFieldError[], currentError:IResponseError) => {
                const foundExpectedErrors = expectedErrors?.filter((expectedError) =>
                    expectedError.errorCode === currentError.code
                );

                const totalFieldsErrorsCopy = [...totalFieldErrors] || [];
                console.log(foundExpectedErrors);
                
                foundExpectedErrors?.map((err) => {
                    console.log(totalFieldsErrorsCopy);
                    const fieldNameIndex = totalFieldsErrorsCopy.findIndex((fieldError) => fieldError.name === err.fieldName);

                    console.log(fieldNameIndex);
                    if (fieldNameIndex === -1) {
                        totalFieldsErrorsCopy.push({
                            name: err.fieldName,
                            errors: err.errorText ? [err.errorText] : []
                        });
                    } else if (err.errorText) {
                        let fieldErrorsCopy = totalFieldsErrorsCopy[fieldNameIndex].errors;
                        fieldErrorsCopy = [...fieldErrorsCopy, err.errorText];

                        totalFieldsErrorsCopy[fieldNameIndex].errors = fieldErrorsCopy;
                    }
                });

                return totalFieldsErrorsCopy;
            }, [] as IFieldError[]);

            setFieldErrors(fieldsErrors);
        }
    }, [response.status]);

    return {
        fieldErrors: fieldErrors || []
    };
};