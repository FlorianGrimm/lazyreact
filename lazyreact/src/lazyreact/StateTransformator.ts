import { deepEquals } from "./deepEquals";
import {
    IStateTransformator,
    IStateTransformatorInternal,
    TransformatorResult
} from "./types";

export class StateTransformator<TState = any> 
    implements IStateTransformator<TState>, IStateTransformatorInternal<TState> {
    readonly stateVersion: number;
    changed: boolean;
    readonly oldState: TState | undefined;
    newState: Partial<TState> | undefined;

    constructor(
        stateVersion: number,
        oldValue?: TState
    ) {
        this.stateVersion = stateVersion;
        this.changed = false;
        this.oldState = undefined;
        this.newState = undefined;
    }

    setResult(newState: Partial<TState>): void {
        const changed = deepEquals(newState, this.oldState);
        if (changed) {
            this.changed = true;
            for (const key in newState) {
                if (Object.prototype.hasOwnProperty.call(newState, key)) {
                    const subState = newState[key];
                    if ((typeof subState === "object") && (typeof (subState as any).stateVersion === "number")){
                        (subState as any).stateVersion = this.stateVersion;
                    }
                }
            }
            this.newState = newState;
        }
    }

    getResult(): TransformatorResult<TState>{
        if (this.changed){
            return {
                changed: false,
                result: this.oldState
            };
        } else {
            return {
                changed: true,
                result: this.newState!
            };
        }
    }
}