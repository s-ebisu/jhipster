// @ts-nocheck
/**
 * Copyright 2013-2024 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { camelCase, defaults, kebabCase, startCase, upperFirst } from 'lodash-es';

import BaseApplicationGenerator from '../base-application/index.js';
import { getHipster } from '../base/support/index.js';
import { getDefaultAppName } from './support/index.js';

import { BASE_NAME } from './constants.js';
import { validateProjectName } from './support/name-resolver.js';

/**
 * @class
 * @extends {BaseApplicationGenerator<import('../base-application/types.js').BaseApplication>}
 */
export default class ProjectNameGenerator extends BaseApplicationGenerator {
  javaApplication;

  async beforeQueue() {
    this.sharedData.getControl().existingProject =
      this.options.defaults || this.options.applicationWithConfig || (this.jhipsterConfig.baseName !== undefined && this.config.existed);

    if (!this.fromBlueprint) {
      await this.composeWithBlueprints();
    }
  }

  get initializing() {
    return this.asInitializingTaskGroup({
      parseOptions() {
        if (this.options.defaults) {
          if (!this.jhipsterConfig.baseName) {
            this.jhipsterConfig.baseName = getDefaultAppName({
              reproducible: this.options.reproducible,
              javaApplication: this.javaApplication,
            });
          }
        }
      },
    });
  }

  get [BaseApplicationGenerator.INITIALIZING]() {
    return this.delegateTasksToBlueprint(() => this.initializing);
  }

  get prompting() {
    return {
      async showPrompts() {
        await this.prompt(
          [
            {
              name: BASE_NAME,
              type: 'input',
              validate: input => this.validateBaseName(input),
              message: 'What is the base name of your application?',
              default: () => getDefaultAppName({ reproducible: this.options.reproducible, javaApplication: this.javaApplication }),
            },
          ],
          this.config,
        );
      },
    };
  }

  get [BaseApplicationGenerator.PROMPTING]() {
    return this.delegateTasksToBlueprint(() => this.prompting);
  }

  get loading() {
    return this.asLoadingTaskGroup({
      load({ application }) {
        const { baseName, projectDescription } = this.jhipsterConfig;
        application.baseName = baseName;
        application.projectDescription = projectDescription;
      },
    });
  }

  get [BaseApplicationGenerator.LOADING]() {
    return this.delegateTasksToBlueprint(() => this.loading);
  }

  get preparing() {
    return this.asPreparingTaskGroup({
      preparing({ application }) {
        const { baseName, upperFirstCamelCaseBaseName } = application;
        const humanizedBaseName = baseName.toLowerCase() === 'jhipster' ? 'JHipster' : startCase(baseName);
        defaults(application, {
          humanizedBaseName,
          camelizedBaseName: camelCase(baseName),
          hipster: getHipster(baseName),
          capitalizedBaseName: upperFirst(baseName),
          dasherizedBaseName: kebabCase(baseName),
          lowercaseBaseName: baseName.toLowerCase(),
          upperFirstCamelCaseBaseName,
          projectDescription: `Description for ${humanizedBaseName}`,
        });
      },
    });
  }

  get [BaseApplicationGenerator.PREPARING]() {
    return this.delegateTasksToBlueprint(() => this.preparing);
  }

  /*
   * Start of local public API, blueprints may override to customize the generator behavior.
   */

  /**
   * Validates baseName
   * @param {String} input - Base name to be checked
   * @returns Boolean
   */
  validateBaseName(input) {
    return validateProjectName(input, { javaApplication: this.javaApplication });
  }
}
