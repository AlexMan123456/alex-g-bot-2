import type { ChatInputCommandInteraction } from "discord.js";

import { MessageFlags } from "discord.js";

import executeQuery from "src/commands/database/helpers/_execute-query";
import formatQueryResponse from "src/commands/database/helpers/_format-query-response";

async function query(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();
  const queryString = interaction.options.getString("query", true);

  const { queryResult, success } = await executeQuery(queryString);

  const outputContainer = await formatQueryResponse(queryString, queryResult, { success });

  await interaction.editReply({
    components: [outputContainer],
    flags: [MessageFlags.IsComponentsV2],
  });
}

export default query;
