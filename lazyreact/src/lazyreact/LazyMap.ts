// import { StateVersionTracker } from "./StateVersionTracker";

// export class LazyMap<K, V> implements Map<K, V> {
//     map: Map<K, V>;
//     stateVersionTracker: StateVersionTracker;

//     constructor(map?: Map<K, V>, stateVersionTracker?: StateVersionTracker) {
//         this.map = map ?? (new Map<K, V>());
//         this.stateVersionTracker = stateVersionTracker ?? (new StateVersionTracker());
//     }

//     clear(): void {
//         if (this.map.size > 0) {
//             this.map.clear();
//             this.stateVersionTracker.stateVersion=0;
//         }
//     }
//     delete(key: K): boolean {
//         const result = this.map.delete(key);
//         if (result) {
//             this.stateVersionTracker.stateVersion=0;
//         }
//         return result;
//     }

//     forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
//         this.map.forEach(callbackfn, thisArg);
//     }

//     get(key: K): V | undefined {
//         return this.get(key);
//     }

//     has(key: K): boolean {
//         return this.map.has(key);
//     }
    
//     set(key: K, value: V): this {
//         this.map.set(key, value);
//         this.stateVersionTracker.stateVersion=0;
//         return this;
//     }

//     get size(): number {
//         return this.map.size;
//     }

//     /** Returns an iterable of entries in the map. */
//     [Symbol.iterator](): IterableIterator<[K, V]>{
//         return this.map[Symbol.iterator]();
//     }

//     /**
//      * Returns an iterable of key, value pairs for every entry in the map.
//      */
//     entries(): IterableIterator<[K, V]>{
//         return this.map.entries();
//     }

//     /**
//      * Returns an iterable of keys in the map
//      */
//     keys(): IterableIterator<K>{
//         return this.map.keys();
//     }

//     /**
//      * Returns an iterable of values in the map
//      */
//     values(): IterableIterator<V>{
//         return this.map.values();
//     }

//     readonly [Symbol.toStringTag]: string{
//         return this.map.[Symbol.toStringTag];
//     }
// }