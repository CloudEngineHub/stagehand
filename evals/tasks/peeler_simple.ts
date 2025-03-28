import { EvalFunction } from "@/types/evals";
import { initStagehand } from "@/evals/initStagehand";
import { StagehandEnvironmentError } from "@/types/stagehandErrors";

const env: "BROWSERBASE" | "LOCAL" =
  process.env.EVAL_ENV?.toLowerCase() === "browserbase"
    ? "BROWSERBASE"
    : "LOCAL";

export const peeler_simple: EvalFunction = async ({ modelName, logger }) => {
  const { stagehand, initResponse } = await initStagehand({
    modelName,
    logger,
  });

  const { debugUrl, sessionUrl } = initResponse;

  if (env === "BROWSERBASE") {
    throw new StagehandEnvironmentError(
      "BROWSERBASE",
      "LOCAL",
      "peeler_simple eval",
    );
  }

  await stagehand.page.goto(`file://${process.cwd()}/evals/assets/peeler.html`);
  await stagehand.page.act({ action: "add the peeler to cart" });

  const successMessageLocator = stagehand.page.locator(
    'text="Congratulations, you have 1 A in your cart"',
  );
  const isVisible = await successMessageLocator.isVisible();

  await stagehand.close();

  return {
    _success: isVisible,
    debugUrl,
    sessionUrl,
    logs: logger.getLogs(),
  };
};
