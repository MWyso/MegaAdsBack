import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    // Jeżeli w prog byłaby mozliwość, że wychodzimy do elementu, który nie istenieje to przydałaby się taka obsługa błędu:

    /*
     if (err instanceof NotFoundError) {
        res
            .status(404)
            .render('error', {
                massage: 'Nie można znaleźć elementu o danym ID',
            });
        return;
    }
     */
    console.error(err);

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .json( {
            message: err instanceof ValidationError ? err.message : 'Sorry, please try again later',
        });
};