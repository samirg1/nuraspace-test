import express from "express";

type ServerError = {
    error: {
        message: string;
        code: number;
    };
};

type HandlerSuccessReturnType<T extends ServerEndpoints> =
    ServerEndpointToResponseType<T> & { error?: never };

type Handler<T extends ServerEndpoints> = (
    req: express.Request,
    res: express.Response,
    body: Partial<ServerEndpointToBodyType<T>>,
) =>
    | Promise<HandlerSuccessReturnType<T> | ServerError>
    | HandlerSuccessReturnType<T>
    | ServerError;

export type HandlersRecord = {
    [K in ServerEndpoints]: { method: "get" | "post"; handler: Handler<K> };
};

const baseRouter = (handlers: Partial<HandlersRecord>) => {
    const router = express.Router();

    for (const [endpoint, { method, handler }] of Object.entries(handlers) as [
        ServerEndpoints,
        { method: "get" | "post"; handler: Handler<ServerEndpoints> },
    ][]) {
        router[method](endpoint, async (req, res) => {
            const response = await handler(
                req,
                res,
                req.body as Partial<ServerEndpointToBodyType<ServerEndpoints>>,
            );
            const { error } = response;

            if (error) {
                console.error(
                    "Internal Server Error",
                    { method, endpoint, body: req.body },
                    error,
                );
                return res.status(error.code || 500).send({
                    error: error.message,
                });
            }

            res.status(200).send(response);
        });
    }

    return router;
};

export default baseRouter;
