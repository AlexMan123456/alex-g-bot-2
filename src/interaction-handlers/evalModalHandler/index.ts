import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import type { ModalSubmitInteraction } from "discord.js";
import { MessageFlags } from "discord.js";
import evaluateCode from "src/interaction-handlers/evalModalHandler/_evaluate-code";
import formatEvalResponse from "src/interaction-handlers/evalModalHandler/_format-eval-response";

class EvalModalHandler extends InteractionHandler {
  public constructor(
    context: InteractionHandler.LoaderContext,
    options: InteractionHandler.Options,
  ) {
    super(context, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.ModalSubmit,
    });
  }

  public override parse(interaction: ModalSubmitInteraction) {
    if (interaction.customId === "eval") {
      return this.some();
    }
    return this.none();
  }

  public override async run(interaction: ModalSubmitInteraction) {
    const code = interaction.fields.getTextInputValue("code");
    const lineSpacing = interaction.fields.getTextInputValue("lineSpacing");
    const parsedLineSpacing = lineSpacing !== "" ? parseInt(lineSpacing) : 2;
    const showEnvironmentVariables = interaction.fields.getTextInputValue(
      "showEnvironmentVariables",
    );

    if (code.includes("process.env") && !showEnvironmentVariables) {
      const attemptedToAccess = code.split(".")[2];

      const container = formatEvalResponse(
        code,
        attemptedToAccess
          ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          : { BOT_TOKEN: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        {
          lineSpacing: parsedLineSpacing,
          success: false,
          showEnvironmentVariables: !!showEnvironmentVariables,
        },
      );
      await interaction.reply({ components: [container], flags: MessageFlags.IsComponentsV2 });
      return;
    }

    const { evaluatedCode, success } = evaluateCode(code);

    const container = formatEvalResponse(code, evaluatedCode, {
      lineSpacing: parsedLineSpacing,
      success,
      showEnvironmentVariables: !!showEnvironmentVariables,
    });

    await interaction.reply({ components: [container], flags: MessageFlags.IsComponentsV2 });
  }
}

export default EvalModalHandler;
