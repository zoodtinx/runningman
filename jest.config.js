import fs from "fs";
import path from "path";
import { pathsToModuleNameMapper } from "ts-jest";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsconfig = JSON.parse(
   fs.readFileSync(path.resolve(__dirname, "./tsconfig.json"), "utf-8")
);

const config = {
   preset: "ts-jest",
   testEnvironment: "node",
   transform: { "^.+\\.tsx?$": "ts-jest" },
   moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
      prefix: "<rootDir>/",
   }),
};

export default config;
