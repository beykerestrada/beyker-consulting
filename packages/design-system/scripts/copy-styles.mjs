/**
 * Post-build: copy src/styles/ → dist/styles/
 * CSS is not bundled by tsup — consumers import it explicitly.
 */
import { cpSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

mkdirSync(resolve(root, "dist/styles"), { recursive: true });
cpSync(resolve(root, "src/styles"), resolve(root, "dist/styles"), { recursive: true });

console.log("✓  dist/styles/ (CSS copied)");
