import type { ApplicationCommandRegistry, Awaitable } from "@sapphire/framework";
import type { ChatInputCommandInteraction } from "discord.js";

import { Command } from "@sapphire/framework";

class GitHubLinkCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, { ...options });
  }

  public override async chatInputRun(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply(
      "Here's the GitHub repository link to my source code: https://github.com/AlexMan123456/alex-g-bot-2",
    );
  }
  public override registerApplicationCommands(
    registry: ApplicationCommandRegistry,
  ): Awaitable<void> {
    registry.registerChatInputCommand((builder) => {
      return builder
        .setName("github")
        .setDescription("Respond with GitHub repository link to bot source code");
    });
  }
}

export default GitHubLinkCommand;
