/// <reference types="vite/client"/>
import { Meta } from "@storybook/react";
import { composeStories } from "@storybook/testing-react";
import type { StoryFn } from "@storybook/testing-react/dist/types";
import React from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { describe, expect, it } from "vitest";

type StoryFile = {
  default: Meta;
  [name: string]: StoryFn | Meta;
};

const storyFiles = Object.values(import.meta.glob<StoryFile>("../**/*.stories.tsx"));

await Promise.all(
  storyFiles.map(async (fn) => {
    const storyFile = await fn();

    describe(`${storyFile.default.title}`, () => {
      Object.values(composeStories(storyFile)).forEach((story) => {
        it(`${story.storyName}`, () => {
          let renderer: ReactTestRenderer;

          act(() => {
            renderer = create(React.createElement(story), {
              createNodeMock: (node) => document.createElement(String(node.type)),
            });
          });

          const split = fn.name.split("/");
          const last = split.length - 1;
          split.splice(last, 0, "__snapshots__");

          const filename = split.join("/").replace(/tsx$/, "snap");

          expect.setState({ currentTestName: `${storyFile.default.title} > ${story.storyName}` });
          expect(renderer).toMatchSpecificSnapshot(filename);
        });
      });
    });
  })
);
