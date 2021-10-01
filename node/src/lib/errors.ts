import { ErrorObject } from 'ajv';

export class HttpError extends Error {
    statusCode: number;

    constructor(code: number, message: string) {
        super(message);
        this.name = 'HttpError';
        this.statusCode = code;
    }
}

export class ValidationError extends Error {
    constructor(errorList: ErrorObject[] | null | undefined) {
        let messages: Record<string, string | undefined>[] = [];

        if (Array.isArray(errorList)) {
            errorList.forEach(el => {
                let error: Record<string, string | undefined>;

                if (el.instancePath == '' && el.keyword == 'additionalProperties') {
                    error = Object.fromEntries([[el.params.additionalProperty, el.message]]);
                } else if (typeof el.instancePath == "string" && el.instancePath !== '' ) {
                    error = Object.fromEntries([[el.instancePath.substr(1), el.message]]);
                } else {
                    error = {'error': 'unknown'};
                }

                messages.push(error)
            });
        }

        super(JSON.stringify(messages));
    }
}
