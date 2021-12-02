import { GlobalStateVersion } from "./GlobalStateVersion";
import { globalStateVersion } from "./constants";

export class StateVersionTracker{
    gblStateVersion: GlobalStateVersion;
    _stateVersion: number;

    constructor(gblStateVersion?: GlobalStateVersion) {
        this.gblStateVersion = gblStateVersion ?? globalStateVersion;
        this._stateVersion = globalStateVersion.stateVersion;
    }

    get stateVersion(): number {
        return this._stateVersion;
    }
     
    set stateVersion(newStateVersion: number) {
        if (this._stateVersion <  newStateVersion){
            this._stateVersion =  newStateVersion;
        } else if (newStateVersion<=0){
            this._stateVersion = globalStateVersion.stateVersion;
        } else {
            return ;
        }
    }
}