export interface IStateVersion {
    stateVersion: number;
}

export type StateVersion<T> = T & {
    stateVersion: number;
}

export type LazyEvent<
    Payload = void,
    ActionType extends string = string
    > = {
        type: ActionType;
        payload: Payload;
    };

/*
export type Action<
    Payload = void,
    ActionType extends string = string,
    Meta = never,
    Error = never> = {
        type: ActionType;
        payload: Payload;
    } & (
        [Meta] extends [never]
        ? {}
        : {
            meta: Meta;
        }
    ) & (
        [Error] extends [never]
        ? {}
        : {
            error: Error;
        }
    );    
*/    