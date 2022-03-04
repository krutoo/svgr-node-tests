import { readFile } from "fs/promises";
import { transform } from "@svgr/core";

async function main() {
  const svgCode = await readFile(
    new URL("./unknown.svg", import.meta.url),
    "utf-8"
  );

  const jsCode = await transform(svgCode, {
    svgo: true,
    prettier: true,
    svgoConfig: {
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              removeTitle: false,
            },
          },
        },
      ],
    },
  });

  console.log(jsCode);
}

main();
