import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const worktreePath = path.resolve(repoRoot, "../cesium-gh-pages");

function run(cmd, cwd = repoRoot) {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function main() {
  console.log("=== 1. Building Cesium core packages ===");
  run("npm run build");

  console.log("=== 2. Building Sandcastle static app ===");
  run("npx gulp -f gulpfile.apps.js buildSandcastle --no-embeddings");

  console.log("=== 3. Preparing gh-pages worktree ===");
  if (fs.existsSync(worktreePath)) {
    try {
      run(`git worktree remove --force "${worktreePath}"`);
    } catch {
      fs.rmSync(worktreePath, { recursive: true, force: true });
      run("git worktree prune");
    }
  }
  run(`git worktree add "${worktreePath}" gh-pages`);

  console.log("=== 4. Syncing built artifacts to gh-pages ===");
  // Sync Apps/Sandcastle2
  fs.rmSync(path.join(worktreePath, "Apps/Sandcastle2"), {
    recursive: true,
    force: true,
  });
  copyDir(
    path.join(repoRoot, "Apps/Sandcastle2"),
    path.join(worktreePath, "Apps/Sandcastle2"),
  );

  // Sync Build/CesiumUnminified
  fs.rmSync(path.join(worktreePath, "Build/CesiumUnminified"), {
    recursive: true,
    force: true,
  });
  copyDir(
    path.join(repoRoot, "Build/CesiumUnminified"),
    path.join(worktreePath, "Build/CesiumUnminified"),
  );

  // Sync packages/*/Build
  const packagesWithBuild = ["core", "gltf", "engine", "widgets"];
  for (const pkg of packagesWithBuild) {
    const srcPkgBuild = path.join(repoRoot, `packages/${pkg}/Build`);
    const destPkgBuild = path.join(worktreePath, `packages/${pkg}/Build`);
    if (fs.existsSync(srcPkgBuild)) {
      fs.rmSync(destPkgBuild, { recursive: true, force: true });
      copyDir(srcPkgBuild, destPkgBuild);
    }
  }

  // Sync packages/engine/Source/Core/Ion.js
  fs.copyFileSync(
    path.join(repoRoot, "packages/engine/Source/Core/Ion.js"),
    path.join(worktreePath, "packages/engine/Source/Core/Ion.js"),
  );

  // Sync .d.ts files
  const dtsFiles = [
    "Source/Cesium.d.ts",
    "packages/core/index.d.ts",
    "packages/gltf/index.d.ts",
    "packages/engine/index.d.ts",
    "packages/widgets/index.d.ts",
  ];
  for (const f of dtsFiles) {
    const src = path.join(repoRoot, f);
    if (fs.existsSync(src)) {
      const dest = path.join(worktreePath, f);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
    }
  }

  // Ensure .nojekyll exists
  const nojekyll = path.join(worktreePath, ".nojekyll");
  if (!fs.existsSync(nojekyll)) {
    fs.writeFileSync(nojekyll, "");
  }

  console.log("=== 5. Committing to gh-pages ===");
  run("git add -A", worktreePath);
  run(
    "git add -f packages/core/Build packages/gltf/Build packages/engine/Build packages/widgets/Build Build/CesiumUnminified Source/Cesium.d.ts packages/core/index.d.ts packages/gltf/index.d.ts packages/engine/index.d.ts packages/widgets/index.d.ts Apps/Sandcastle2",
    worktreePath,
  );
  try {
    run('git commit -m "deploy: update gh-pages static build"', worktreePath);
  } catch {
    console.log("No changes to commit on gh-pages (already up to date).");
  }

  console.log("=== 6. Cleaning up worktree ===");
  run(`git worktree remove "${worktreePath}"`);

  console.log("\n✅ gh-pages 分支构建并提交成功！");
  console.log("👉 请执行以下命令推送到远程：");
  console.log("   git push origin gh-pages\n");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
