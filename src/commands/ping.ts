import type { ApplicationCommandRegistry, Awaitable } from "@sapphire/framework";

import { Command } from "@sapphire/framework";
import { codeBlock, EmbedBuilder, type ChatInputCommandInteraction } from "discord.js";
import database from "prisma/connection";

class PingCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, { ...options });
  }

  public override async chatInputRun(interaction: ChatInputCommandInteraction): Promise<void> {
    const pingResponse = await interaction.reply({ content: "Ping?", withResponse: true });

    const pingMessage = pingResponse.resource!.message!;

    if (!pingMessage) return;

    const wsPing = Math.round(this.container.client.ws.ping);
    const restPing = pingMessage.createdTimestamp - interaction.createdTimestamp;

    const db1 = Date.now();
    await database.$queryRaw`SELECT 1`;
    const db2 = Date.now();

    const dbPing = db2 - db1;

    const embed = new EmbedBuilder() //
      .setTitle("Ping")
      .addFields([
        { name: "WebSocket", value: codeBlock("c", `${wsPing}ms`), inline: true },
        { name: "REST", value: codeBlock("c", `${restPing}ms`), inline: true },
        { name: "Database", value: codeBlock("c", `${dbPing}ms`), inline: true },
      ]);

    interaction.editReply({
      content: null,
      embeds: [embed],
    });
  }
  public override registerApplicationCommands(
    registry: ApplicationCommandRegistry,
  ): Awaitable<void> {
    registry.registerChatInputCommand((builder) => {
      return builder.setName("ping").setDescription("Replies with pong");
    });
  }
}

export default PingCommand;
