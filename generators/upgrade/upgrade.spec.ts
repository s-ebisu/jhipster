import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, writeFileSync } from 'fs';
import { escapeRegExp } from 'lodash-es';
import { before, describe, expect, it } from 'esmocha';
import { execaCommandSync } from 'execa';
import { packageJson } from '../../lib/index.js';
import { GENERATOR_APP, GENERATOR_UPGRADE } from '../generator-list.js';
import { basicHelpers as helpers, result as runResult } from '../../lib/testing/index.js';

const writeJsonSync = (file, content) => writeFileSync(file, JSON.stringify(content, null, 2));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('generator - upgrade', function () {
  describe('default application', () => {
    before(async () => {
      await helpers
        .runJHipster(GENERATOR_APP)
        .withJHipsterConfig({
          skipClient: true,
          skipServer: true,
          baseName: 'upgradeTest',
        })
        .withOptions({ skipGit: false, useVersionPlaceholders: false });
      await runResult
        .createJHipster(GENERATOR_UPGRADE)
        .withSpawnMock()
        .withOptions({ useVersionPlaceholders: false } as any)
        .run();
    });

    it('generated git commits to match snapshot', () => {
      const commits = execaCommandSync('git log --pretty=format:%s', { stdio: 'pipe', reject: false }).stdout;
      expect(commits.replace(new RegExp(escapeRegExp(packageJson.version), 'g'), 'VERSION').replaceAll('master', 'main'))
        .toMatchInlineSnapshot(`
"upgrade merge of jhipster_upgrade branch into main
generated jhipster_upgrade using JHipster VERSION
reference merge of jhipster_upgrade branch into main
generated jhipster_upgrade using JHipster VERSION
Initial version of upgradeTest generated by generator-jhipster@undefined"
`);
    });

    it('generates expected number of commits', () => {
      const commitsCount = execaCommandSync('git rev-list --count HEAD', { stdio: 'pipe', reject: false }).stdout.replace('\n', '');
      // Expecting 5 commits in history (because we used `force` option):
      //   - master: initial commit
      //   - jhipster_upgrade; initial generation
      //   - master: block-merge commit of jhipster_upgrade
      //   - jhipster_upgrade: new generation in jhipster_upgrade
      //   - master: merge commit of jhipster_upgrade
      expect(commitsCount).toBe('5');
    });
  });
  describe.skip('blueprint application', () => {
    const blueprintName = 'generator-jhipster-sample-blueprint';
    const blueprintVersion = '0.1.1';
    before(async () => {
      await helpers.prepareTemporaryDir();
      const dir = process.cwd();
      /* eslint-disable-next-line no-console */
      console.log(`Generating JHipster application in directory: ${dir}`);
      // Fake the presence of the blueprint in node_modules: we don't install it, but we need its version
      const packagejs = {
        name: blueprintName,
        version: blueprintVersion,
      };
      const fakeBlueprintModuleDir = path.join(dir, `node_modules/${blueprintName}`);
      mkdirSync(path.join(fakeBlueprintModuleDir, 'generators', 'fake'), { recursive: true });
      writeJsonSync(path.join(fakeBlueprintModuleDir, 'package.json'), packagejs);
      // Create an fake generator, otherwise env.lookup doesn't find it.
      writeFileSync(path.join(fakeBlueprintModuleDir, 'generators', 'fake', 'index.js'), '');
      await helpers
        .runJHipster('app', { tmpdir: false })
        .withJHipsterConfig({
          skipClient: true,
          skipServer: true,
          baseName: 'upgradeTest',
        })
        .withOptions({
          skipGit: false,
          blueprints: blueprintName,
        });
      await helpers.runJHipsterInApplication('upgrade').withOptions({
        force: true,
        silent: false,
        targetVersion: packageJson.version,
      });
    });

    it('generated git commits to match snapshot', () => {
      const commits = execaCommandSync('git log --pretty=format:%s', { stdio: 'pipe', reject: false }).stdout;
      expect(commits.replace(new RegExp(escapeRegExp(packageJson.version), 'g'), 'VERSION')).toMatchInlineSnapshot(`
`);
    });

    it('generates expected number of commits', () => {
      const commitsCount = execaCommandSync('git rev-list --count HEAD', { stdio: 'pipe', reject: false }).stdout.replace('\n', '');
      // Expecting 5 commits in history (because we used `force` option):
      //   - master: initial commit
      //   - jhipster_upgrade; initial generation
      //   - master: block-merge commit of jhipster_upgrade
      //   - jhipster_upgrade: new generation in jhipster_upgrade
      //   - master: merge commit of jhipster_upgrade
      expect(commitsCount).toBe('5');
    });

    it('still contains blueprint information', () => {
      runResult.assertJsonFileContent('.yo-rc.json', {
        'generator-jhipster': { blueprints: [{ name: blueprintName, version: blueprintVersion }] },
      });
      runResult.assertFileContent('package.json', new RegExp(`"${blueprintName}": "${blueprintVersion}"`));
    });
  });
});
