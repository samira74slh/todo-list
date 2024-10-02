import { idType } from "src/shared/types/id-type";

export class GetTodoItemsQuery {
  constructor(
    public readonly id: idType,
  ) { }
}