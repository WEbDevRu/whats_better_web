export enum RequestMethods {
    Get = 'get',
    Delete = 'delete',
    Post = 'post',
    Put = 'put',
}

export type RequestMethod = `${RequestMethods}`;

export enum RequestStatuses {
    Initial,
    Processing,
    Succeeded,
    Failed,
    Unauthorized,
}

export type RequestStatus = `${RequestStatuses}`;

type ResponseFormat = 'json' | 'response';

export type { ResponseFormat };
