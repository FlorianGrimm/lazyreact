// import { StateVersionTracker } from "./StateVersionTracker";

// export class LazyObject {
//     stateVersionTracker: StateVersionTracker;
//     constructor(stateVersionTracker?: StateVersionTracker) {
//         this.stateVersionTracker = stateVersionTracker ?? (new StateVersionTracker());
//     }

//     get stateVersion(): number {
//         return this.stateVersionTracker.stateVersion;
//     }
     
//     set stateVersion(newStateVersion: number) {
//         this.stateVersionTracker.stateVersion = newStateVersion;
//         this.stateVersionTracker.stateVersion++;
//     }

//     // private _fullName: string = "";

//     // get fullName(): string {
//     //   return this._fullName;
//     // }
   
//     // set fullName(newName: string) {
//     //   this._fullName = newName;
//     //   this.stateVersionTracker.stateVersion++;
//     // }
// }