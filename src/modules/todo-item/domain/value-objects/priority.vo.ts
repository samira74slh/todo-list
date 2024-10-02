import { PriorityLevel } from "../../application/enum/priority-level.enum";

export class Priority {
    constructor(
        private readonly _value: PriorityLevel
    ) {
        if (!Object.values(PriorityLevel).includes(_value)) {
            throw new Error(`Invalid priority level: ${_value}`);
        }
    }

    public getValue(): number {
        switch (this._value) {
            case PriorityLevel.Low:
                return 3;

            case PriorityLevel.Medium:
                return 2;

            case PriorityLevel.High:
                return 1;
        }
    }
}