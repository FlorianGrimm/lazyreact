import {
    Transformator,
    TransformationDefinition,
    TStateBase,
    IStateTransformator
} from "./types";

import { DirtyState } from "./DirtyState";
import { StateTransformator } from "./StateTransformator";

// type TransformatorOrder<TState extends TStateBase> = {

type TActiveState<TState extends TStateBase> = {
    stateName: keyof (TState);
    mapSucc: Map<keyof (TState), Map<keyof (TState), TActiveState<TState>>>;
    isDirty: boolean;
    stateVersion: number;
    transformators: TArrayTransformatorDefinition<TState>;
}

type TArrayTransformatorDefinition<TState extends TStateBase> = (TTransformatorDefinition<TState>)[];

type TTransformatorDefinition<TState extends TStateBase> = {
    transformationName: string;
    transformator: Transformator<TState>;
}

type TStateDefinition<TState extends TStateBase> = {
    key: keyof (TState);
    prev: Map<keyof (TState), TStateDefinition<TState>>;
    succ: Map<keyof (TState), TStateDefinition<TState>>;
    position: number;
    order: number;
};

export class StateRoot<TState extends TStateBase>{
    states: TState;
    stateVersion: number;
    arrTransformationDefinition: (TransformationDefinition<TState>)[];
    mapStateDefinition: Map<keyof (TState), TStateDefinition<TState>>;
    arrActiveState: (TActiveState<TState>)[];
    mapActiveState: Map<keyof (TState), TActiveState<TState>>;

    constructor(initialState?: TState) {
        this.states = initialState ?? ({} as TState)
        this.stateVersion = 1;
        this.arrTransformationDefinition = [];
        this.mapStateDefinition = new Map();
        this.arrActiveState = [];
        this.mapActiveState = new Map();
        if ((initialState !== undefined) && (typeof initialState === "object")) {
            for (const key in initialState) {
                if (Object.prototype.hasOwnProperty.call(initialState, key)) {
                    this.getStateDefinition(key);
                }
            }
        }
    }

    setDirty(key: keyof (TState)) {
        const activeState = this.mapActiveState.get(key);
        if (activeState === undefined) {
            return;
        } else {
            activeState.isDirty = true;
        }
    }

    addTransformation(
        transformationName: string,
        sourceNames: (keyof (TState))[],
        targetNames: (keyof (TState))[],
        transformator: Transformator<TState>
    ) {
        let transformationDefinition: TransformationDefinition<TState> = {
            transformationName: transformationName,
            sourceNames: sourceNames,
            targetNames: targetNames,
            transformator: transformator
        };
        this.arrTransformationDefinition.push(transformationDefinition);
        //
        let stateOrderSources = sourceNames.map((sourceName) => this.getStateDefinition(sourceName));
        let stateOrderTargets = targetNames.map((targetName) => this.getStateDefinition(targetName));
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
    }

    getStateDefinition(key: keyof (TState)): TStateDefinition<TState> {
        let transformatorOrder = this.mapStateDefinition.get(key);
        if (transformatorOrder === undefined) {
            transformatorOrder = {
                key: key as string,
                prev: new Map(),
                succ: new Map(),
                position: 0,
                order: this.mapStateDefinition.size,
            };
            this.mapStateDefinition.set(key, transformatorOrder);
        }
        return transformatorOrder;
    }

    getActiveState(key: keyof (TState)): TActiveState<TState> {
        let activeState = this.mapActiveState.get(key);
        if (activeState === undefined) {
            activeState = {
                stateName: key,
                mapSucc: new Map(),
                isDirty: false,
                stateVersion: 0,
                transformators: []
            };
            this.mapActiveState.set(key, activeState);
        }
        return activeState;
    }

    buildTransformatorOrder() {
        let changed = true;
        for (let iWatchDog = this.mapStateDefinition.size; (iWatchDog >= 0) && (changed); iWatchDog--) {
            changed = false;
            for (const stateOrder of this.mapStateDefinition.values()) {
                for (const succStateOrder of stateOrder.succ.values()) {
                    if (succStateOrder.position <= stateOrder.position) {
                        succStateOrder.position = stateOrder.position + 1;
                        changed = true;
                    }
                }
            }
        }

        let arrStateOrder = Array.from(this.mapStateDefinition.entries());
        arrStateOrder = arrStateOrder.sort((a, b) => {
            if (a[1].position === b[1].position) {
                return a[1].order - b[1].order;
            } else {
                return a[1].position - b[1].position;
            }
        });

        for (const [keyState, stateOrder] of arrStateOrder) {
            // stateOrder.key
        }

        for (const stateOrder of this.mapStateDefinition.values()) {
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
        this.stateVersion++;
        const stateTransformator :IStateTransformator<TState>= new StateTransformator(this.stateVersion,this.states);
        for (const activeState of this.arrActiveState) {
            if (activeState.isDirty) {
                activeState.isDirty = false;
                for (const transformator of activeState.transformators) {
                    try {
                        transformator.transformator(stateTransformator, this.states);
                    } catch (error) {
                        console.error("Error", transformator.transformationName, error);
                    }
                }
            }
        }
    }

    handleAction(actionType: string) {
        const result = this.executeAction(actionType);
        if (result !== undefined && typeof result.then === "function") {
            //result.then(()=>{},()=>{}).finally(()=>{
            result.finally(() => {
                this.process();
            }).then(() => { return null; });
        } else {
            this.process();
        }
    }
    executeAction(actionType: string): void | Promise<void> {
        // TODO
        // const f=this.action.get(actionType);
        // return f();
        return;
    }
}