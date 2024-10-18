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
import type { JHipsterCommandDefinition } from '../../lib/command/index.js';
import { BASE_NAME_DESCRIPTION } from './constants.js';

const command = {
  configs: {
    defaultBaseName: {
      internal: true,
      scope: 'generator',
    },
    validateBaseName: {
      internal: true,
      scope: 'generator',
    },
    baseName: {
      description: BASE_NAME_DESCRIPTION,
      cli: {
        type: String,
      },
      prompt: gen => ({
        type: 'input',
        validate: input => gen.validateBaseName(input),
        message: 'What is the base name of your application?',
        default: () => gen.defaultBaseName(),
      }),
      scope: 'storage',
    },
  },
} as const satisfies JHipsterCommandDefinition;

export default command;
