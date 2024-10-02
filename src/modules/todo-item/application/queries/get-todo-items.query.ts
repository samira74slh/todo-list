import { idType } from "../../../../shared/types/id-type";

export class GetTodoItemsQuery {
  constructor(
    public readonly id: idType,
  ) { }
}