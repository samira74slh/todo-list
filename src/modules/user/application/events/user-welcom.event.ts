import { IEvent } from "@nestjs/cqrs";

export class UserWelcomeEvent implements IEvent {
  constructor(
    public readonly username: string
  ) { }
}