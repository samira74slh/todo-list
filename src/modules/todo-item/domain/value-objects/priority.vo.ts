import { PriorityLevel } from "../../application/enum/priority-level.enum";

export class Priority {
    constructor(
        private readonly value: PriorityLevel
    ) {
        if (!Object.values(PriorityLevel).includes(value)) {
            throw new Error(`Invalid priority level: ${value}`);
        }
    }

    public getValue(): PriorityLevel {
        return this.value;
    }
}