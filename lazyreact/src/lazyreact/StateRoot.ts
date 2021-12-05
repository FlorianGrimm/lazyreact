import {
    Transformator,
    TransformationDefinition,
    TStateBase
} from "./types";

import { DirtyState } from "./DirtyState";

type TransformatorOrder<TState extends TStateBase> = {
    key: string;
    prev: Map<string, TransformatorOrder<TState>>;
    succ: Map<string, TransformatorOrder<TState>>;
    position: number;
    order: number;
};

export class StateRoot<TState extends TStateBase>{
    states: TState;
    stateVersion: number;
    dirtyState: Map<keyof (TState), DirtyState>;
    transformations: TransformationDefinition<TState>[];
    transformatorOrder: Map<keyof (TState), TransformatorOrder<TState>>;

    constructor(initalState?: TState) {
        this.states = initalState ?? ({} as TState)
        this.stateVersion = 1;
        this.dirtyState = new Map();
        this.transformations = [];
        this.transformatorOrder = new Map();
    }

    setDirty(key: keyof (TState), value: DirtyState) {
        this.dirtyState.set(key, value);
    }

    addTransformation(
        sourceNames: (keyof (TState))[],
        targetNames: (keyof (TState))[],
        transformator: Transformator<TState>
    ) {
        let oneTransformation: TransformationDefinition<TState> = {
            sourceNames: sourceNames,
            targetNames: targetNames,
            transformator: transformator
        };
        this.transformations.push(oneTransformation);
        //

        let transformatorOrderSources = sourceNames.map((sourceName) => this.getTransformatorOrder(sourceName));
        let transformatorOrderTargets = targetNames.map((targetName) => this.getTransformatorOrder(targetName));
        transformatorOrderSources.forEach((transformatorOrderSource) => {
            transformatorOrderTargets.forEach(
                (transformatorOrderTarget) => {
                    transformatorOrderSource.succ.set(transformatorOrderTarget.key, transformatorOrderTarget);
                    if (transformatorOrderTarget.position <= transformatorOrderSource.position) {
                        transformatorOrderTarget.position = transformatorOrderSource.position + 1;
                    }
                }
            );
        });
        transformatorOrderTargets.forEach((transformatorOrderTarget) => {
            transformatorOrderSources.forEach(
                (transformatorOrderSource) => {
                    transformatorOrderTarget.prev.set(transformatorOrderSource.key, transformatorOrderSource);
                    if (transformatorOrderTarget.position <= transformatorOrderSource.position) {
                        transformatorOrderTarget.position = transformatorOrderSource.position + 1;
                    }
                }
            );s
        });
        //
    }

    getTransformatorOrder(key: keyof (TState)) {
        let transformatorOrder = this.transformatorOrder.get(key);
        if (transformatorOrder === undefined) {
            transformatorOrder = {
                key: key as string,
                prev: new Map(),
                succ: new Map(),
                position: 0,
                order: 0,
            };
            this.transformatorOrder.set(key, transformatorOrder);
        }
        return transformatorOrder;
    }

    buildTransformatorOrder() {
        const arrTransformatorOrder = Array.of(this.transformatorOrder.values());
        for (const transformatorOrder of arrTransformatorOrder) {
        }
    }
}