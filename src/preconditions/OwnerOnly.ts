import type { Precondition } from "@sapphire/framework";
import type {
  ChatInputCommandInteraction,
  ContextMenuCommandInteraction,
  Message,
} from "discord.js";

import { AllFlowsPrecondition } from "@sapphire/framework";

class OwnerOnly extends AllFlowsPrecondition {
  public override chatInputRun(interaction: ChatInputCommandInteraction): Precondition.Result {
    return this.doOwnerCheck(interaction.user.id);
  }
  public override contextMenuRun(interaction: ContextMenuCommandInteraction): Precondition.Result {
    return this.doOwnerCheck(interaction.user.id);
  }
  public doOwnerCheck(userId: string) {
    return process.env.OWNER_ID === userId
      ? this.ok()
      : this.error({
          message: "This command can only be used by the owner",
          context: { ephemeral: true },
        });
  }
  public override messageRun(message: Message): Precondition.Result {
    return this.doOwnerCheck(message.author.id);
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    OwnerOnly: never;
  }
}

export default OwnerOnly;
