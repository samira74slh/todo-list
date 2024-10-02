import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserWelcomeEvent } from "../events/user-welcom.event";

@EventsHandler(UserWelcomeEvent)
export class SendWelcomeMsgHandler implements IEventHandler<UserWelcomeEvent> {
    handle(event: UserWelcomeEvent) {
        console.log(`Dear ${event.username}, welcome to the app!`);
    }
}