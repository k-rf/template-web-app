import fs from "fs";
import path from "path";

import { glob } from "glob";

import { storybookTestTemplate } from "./storybook-test-template.ts";

const writeFile = async (file: string, data: string) => {
  return new Promise<void>((resolve, rejects) => {
    fs.writeFile(file, data, { encoding: "utf-8" }, (err) => {
      if (err) rejects(err);
      resolve();
    });
  });
};

export const generateStorybookTest = async () => {
  const storyFiles = await glob("src/**/*.stories.tsx");

  return await Promise.all(
    storyFiles.map(async (filename) => {
      const testPath = filename.replace(/\.stories\.tsx$/, ".spec.tsx");
      const storyName = path.basename(filename, ".stories.tsx");

      if (!fs.existsSync(testPath)) {
        await writeFile(testPath, storybookTestTemplate(storyName));

        return `Generated: ${testPath}`;
      }

      return `Existed: ${testPath}`;
    })
  );
};
