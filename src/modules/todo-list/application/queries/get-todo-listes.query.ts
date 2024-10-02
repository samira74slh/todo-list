import { idType } from "src/shared/types/id-type";

export class GetTodoListsQuery {
  constructor(
    public readonly id?: idType,
  ) { }
}