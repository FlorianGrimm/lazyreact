import {
    Transformator,
    TransformationDefinition,
    TStateBase
} from "./types";

import { DirtyState } from "./DirtyState";

// type TransformatorOrder<TState extends TStateBase> = {

type TransformationStatenternal<TState extends TStateBase> = {
    stateOrder: StateOrder<TState>;
    transformationName: string;
    transformators: TransformationOrderInternal<TState>;
}
type TransformationOrderInternal<TState extends TStateBase> = {
    stateOrder: StateOrder<TState>;
    transformationName: string;
    transformator: Transformator<TState>;
}

type StateOrder<TState extends TStateBase> = {
    key: string;
    prev: Map<string, StateOrder<TState>>;
    succ: Map<string, StateOrder<TState>>;
    position: number;
    order: number;
};

export class StateRoot<TState extends TStateBase>{
    states: TState;
    stateVersion: number;
    dirtyState: Map<keyof (TState), DirtyState>;
    transformations: TransformationDefinition<TState>[];
    stateOrder: Map<keyof (TState), StateOrder<TState>>;
    transformationOrder: Map<keyof (TState), (TransformationDefinitionInternal<TState>)[]>;


    constructor(initalState?: TState) {
        this.states = initalState ?? ({} as TState)
        this.stateVersion = 1;
        this.dirtyState = new Map();
        this.transformations = [];
        this.stateOrder = new Map();
        this.transformationOrder = new Map();
    }

    setDirty(key: keyof (TState), value: DirtyState) {
        this.dirtyState.set(key, value);
    }

    addTransformation(
        transformationName: string,
        sourceNames: (keyof (TState))[],
        targetNames: (keyof (TState))[],
        transformator: Transformator<TState>
    ) {
        let oneTransformation: TransformationDefinition<TState> = {
            transformationName: transformationName,
            sourceNames: sourceNames,
            targetNames: targetNames,
            transformator: transformator
        };
        this.transformations.push(oneTransformation);
        //
        let stateOrderSources = sourceNames.map((sourceName) => this.getStateOrder(sourceName));
        let stateOrderTargets = targetNames.map((targetName) => this.getStateOrder(targetName));
        stateOrderSources.forEach((stateOrderSource) => {
            stateOrderTargets.forEach(
                (stateOrderTarget) => {
                    stateOrderSource.succ.set(stateOrderTarget.key, stateOrderTarget);
                    if (stateOrderTarget.position <= stateOrderSource.position) {
                        stateOrderTarget.position = stateOrderSource.position + 1;
                    }
                }
            );
        });
        stateOrderTargets.forEach((stateOrderTarget) => {
            stateOrderSources.forEach(
                (transformatorOrderSource) => {
                    stateOrderTarget.prev.set(transformatorOrderSource.key, transformatorOrderSource);
                    if (stateOrderTarget.position <= transformatorOrderSource.position) {
                        stateOrderTarget.position = transformatorOrderSource.position + 1;
                    }
                }
            );
        });
        //
    }
    //getTransformatorOrder
    getStateOrder(key: keyof (TState)) {
        let transformatorOrder = this.stateOrder.get(key);
        if (transformatorOrder === undefined) {
            transformatorOrder = {
                key: key as string,
                prev: new Map(),
                succ: new Map(),
                position: 0,
                order: this.stateOrder.size,
            };
            this.stateOrder.set(key, transformatorOrder);
        }
        return transformatorOrder;
    }

    buildTransformatorOrder() {

        let changed = true;
        for (let iWatchDog = this.stateOrder.size; (iWatchDog >= 0) && (changed); iWatchDog--) {
            changed = false;
            for (const stateOrder of this.stateOrder.values()) {
                for (const succStateOrder of stateOrder.succ.values()) {
                    if (succStateOrder.position <= stateOrder.position) {
                        succStateOrder.position = stateOrder.position + 1;
                        changed = true;
                    }
                }
            }
        }

        let arrStateOrder = Array.from(this.stateOrder.entries());
        arrStateOrder = arrStateOrder.sort((a, b) => {
            if (a[1].position === b[1].position) {
                return a[1].order - b[1].order;
            } else {
                return a[1].position - b[1].position;
            }
        });

        for(const [keyState, stateOrder] of arrStateOrder){
            // stateOrder.key
        }

        for (const stateOrder of this.stateOrder.values()) {
            console.log(
                "key:",
                stateOrder.key,
                " prev:",
                Array.from(stateOrder.prev.keys()),
                " succ:",
                Array.from(stateOrder.succ.keys()),
                " position:",
                stateOrder.position,
                " order:",
                stateOrder.order
            );
        }
        //transformatorOrder
    }

    process() {
    }
}