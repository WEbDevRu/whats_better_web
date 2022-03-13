import {
    useCallback,
    useRef,
    useState,
} from 'react';
import { CancelTokenSource } from 'axios';
import {
    generateHttpRequestCancelSource,
    sendHttpRequest,
} from '../utils/http/sendHttpRequest';
import {
    RequestMethod,
    RequestStatuses,
} from '../const/http';
import { isFunction } from '../utils/function/isFunction';

export type RequestFunc = (data?: any, options?: any) => Promise<any>;

export interface IRequest {
    data?: Record<string, any>;
    formData?: Record<string, unknown>;
    id?: string;
    params?: Record<string, string>;
}

interface IRequestOptions {
    ignoreErrors?: boolean;
}

interface GetUrlOptions {
    id?: string,
    url?: any
}

export interface IResponse {
    errors?: [Record<string, string>],
    isProcessing?: boolean,
    request: IRequest,
    result: Record<string, any>,
    status: RequestStatuses
}

interface UrlFuncOptions {
    id?: any
}

type UrlFunc = ({ id }:UrlFuncOptions) => string;

interface IOptions {
    url: string | UrlFunc;
    method: RequestMethod;
    withAbort?: boolean;
    formatData?: (data: any) => any;
}

const DEFAULT_STATE: IResponse = {
    status: RequestStatuses.Initial,
    isProcessing: false,
    result: {},
    errors: [{}],
    request: {},
};

function getUrl({ url, id }:GetUrlOptions) {
    if (isFunction(url)) {
        return url({ id });
    }
    if (id) {
        return `${url}/${id}`;
    }
    return url;
}

export const useRequest = ({ url, method, withAbort, formatData }: IOptions) => {
    const [state, setState] = useState<IResponse>(DEFAULT_STATE);
    const abortController = useRef<CancelTokenSource>();

    const send = useCallback(
        async (request: IRequest = {}, { ignoreErrors }: IRequestOptions = {}) => {
            const { data, id, params } = request;

            if (withAbort && abortController.current) {
                abortController.current.cancel();
            }
            abortController.current = generateHttpRequestCancelSource();

            setState({
                ...DEFAULT_STATE,
                isProcessing: true,
                status: RequestStatuses.Processing,
                request,
            });

            try {
                const result = await sendHttpRequest({
                    url: getUrl({ url, id }),
                    method,
                    data,
                    params,
                    cancelToken: abortController.current?.token,
                });
                setState({
                    ...DEFAULT_STATE,
                    isProcessing: false,
                    status: RequestStatuses.Succeeded,
                    result,
                    request,
                });
                return result;
            } catch (e:any) {
                if (e?.name !== 'AbortError') {
                    let status = RequestStatuses.Failed;
                    if (e?.statusCode === 401) {
                        status = RequestStatuses.Unauthorized;
                    }

                    setState({
                        ...DEFAULT_STATE,
                        isProcessing: false,
                        status,
                        errors: e?.errors || e,
                        request,
                    });
                    if (!ignoreErrors) {
                        throw e?.errors || e;
                    }
                }
                return null;
            }
        },
        [url, method, withAbort],
    );

    const onRequest: RequestFunc = useCallback(
        (data: IRequest = {}, options: IRequestOptions = {}) => {
            if (formatData) {
                const prepared = formatData(data);
                return send(prepared, options);
            }
            return send(data, options);
        },
        [formatData, send],
    );

    const onClearState = useCallback(() => {
        setState(DEFAULT_STATE);
    }, []);

    return {
        state,
        onRequest,
        onClearState,
    };
};
