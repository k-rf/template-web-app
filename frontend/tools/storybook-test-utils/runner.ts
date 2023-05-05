import { generateStorybookTest } from "./generate-storybook-test.ts";

generateStorybookTest()
  .then((results) => {
    for (const result of results) {
      console.log(`[storyTest] ${result}`);
    }
  })
  .catch(() => process.exit(1));
