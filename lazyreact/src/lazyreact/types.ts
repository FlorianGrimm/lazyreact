export interface IStateTransformator<TState> {
    setResult(newState: Partial<TState>): void;
}

export interface IStateTransformatorInternal<Target> {
    getResult(): TransformatorResult<Target>;
}
export type TransformationLink<TState> = {
    sourceName: keyof (TState);
    targetName: keyof (TState);
}

export type TransformationDefinition<TState> = {
    transformationName:string;
    sourceNames: (keyof (TState))[];
    targetNames: (keyof (TState))[];
    transformator: Transformator<TState>;
}

export type Transformator<TState> = (
    stateTransformator: IStateTransformator<TState>,
    state: TState,
) => TransformatorResult<Partial<TState>> | void;

export type TransformatorResult<TState> = {
    changed: boolean;
    result: Partial<TState>;
} | {
    changed: true;
    result: Partial<TState>;
} | {
    changed: false;
};

export type TStateBase = { [key: string]: any };

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