export class Deducor<S, D>{
    constructor(
        public getSource: () => S,
        public transform: (value: S) => undefined | D,
        public setTarget: (value: D) => void
    ) {
    }
    execute() {
        const source = this.getSource();
        const target = this.transform(source);
        if (target === undefined) {
            //
        } else {
            this.setTarget(target);
        }
    }
}