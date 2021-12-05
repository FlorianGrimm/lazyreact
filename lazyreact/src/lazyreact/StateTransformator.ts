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
    newState: TState | undefined;

    constructor(
        stateVersion: number,
        oldValue?: TState
    ) {
        this.stateVersion = stateVersion;
        this.changed = false;
        this.oldState = undefined;
        this.newState = undefined;
    }

    setResult(newValue: TState): void {
        const changed = deepEquals(newValue, this.oldState);
        if (changed) {
            this.changed = true;
            if ((typeof newValue === "object") && (typeof (newValue as any).stateVersion === "number")){
                (newValue as any).stateVersion = this.stateVersion;
            }
            this.newState = newValue;
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