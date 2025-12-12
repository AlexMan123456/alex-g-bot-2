import type { Guild } from "discord.js";
import type { GuildModel as PrismaGuild } from "generated/prisma/models/Guild";

import database from "prisma/connection";

export async function addGuildToDatabase(guild: Guild) {
  return await database.guild.create({
    data: {
      guildId: guild.id,
      name: guild.name,
    },
  });
}

export async function getGuildById(guildId: string) {
  return await database.guild.findUnique({
    where: {
      guildId,
    },
  });
}

export async function patchGuild(guildId: string, data: Partial<PrismaGuild>) {
  return await database.guild.update({
    where: { guildId },
    data,
  });
}
