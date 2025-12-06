import type { ChatInputCommandInteraction } from "discord.js";

import { EmbedBuilder } from "discord.js";

import util from "node:util";

import { getGuildById } from "src/database-helpers/guilds";

async function logError(client: ChatInputCommandInteraction, error: unknown) {
  console.error(error);
  if (!client.guild) {
    return;
  }
  const guild = await getGuildById(client.guild.id);
  if (!guild) {
    return;
  }
  if (!guild.errorLogChannelId) {
    return;
  }
  const errorChannel = await client.guild.channels.cache.get(guild.errorLogChannelId);
  const errorMessage = new EmbedBuilder()
    .setTitle("An error has occured")
    .setDescription(util.inspect(error, { depth: 5 }))
    .setColor("Red");
  if (errorChannel?.isTextBased() && errorChannel.isSendable()) {
    errorChannel?.send({ embeds: [errorMessage] });
  }
}

export default logError;
