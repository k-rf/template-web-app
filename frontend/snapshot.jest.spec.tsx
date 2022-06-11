import "jest-specific-snapshot";

import { readdirSync } from "fs";
import * as path from "path";

import { composeStories } from "@storybook/testing-react";
import type { StoryFile, StoryFn } from "@storybook/testing-react/dist/types";
import { render } from "@testing-library/react";

const helper = <T extends StoryFile>(storyFile: T, testName: string, filepath: string) => {
  const Stories = composeStories(storyFile) as Record<string, StoryFn<unknown>>;

  describe(testName, () => {
    Object.values(Stories).map((Story) => {
      describe(Story.name, () => {
        it(`${Story.storyName}`, async () => {
          const { container } = render(<Story />);
          const split = filepath.split("/");
          split.splice(split.length - 1, 0, "__snapshots__");
          expect(container).toMatchSpecificSnapshot(`${split.join("/")}.jest.snap`);
        });
      });
    });
  });
};

const testName = (str: string) => {
  const s = str.split("/");
  return s[s.length - 1].split(".")[0];
};

const readAllFiles = (pathName: string): string[] => {
  return readdirSync(pathName, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? readAllFiles(path.join(pathName, e.name)) : path.join(pathName, e.name)
  );
};

const allStoryTests = readAllFiles("src")
  .filter((e) => /.+\.stories\.tsx$/.test(e))
  .map((e) => {
    const s = e.split(".");
    return { filename: `./${s.slice(0, s.length - 1).join(".")}`, filepath: e };
  })
  .map((e) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const story = require(e.filename);
    return () => helper(story, testName(e.filename), e.filepath);
  });

allStoryTests.forEach((test) => test());
