import { idType } from "../../../../shared/types/id-type";

export class GetTodoListsQuery {
  constructor(
    public readonly id: idType,
  ) { }
}