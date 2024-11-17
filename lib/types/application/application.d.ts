/* eslint-disable @typescript-eslint/consistent-type-imports */
import type { BaseApplication, CommonClientServerApplication } from '../../../generators/base-application/types.js';
import type { ClientSourceType } from '../../../generators/client/types.js';
import type { LanguagesSource } from '../../../generators/languages/types.js';
import type { SpringBootSourceType } from '../../../generators/server/types.js';
import type { ExportApplicationPropertiesFromCommand } from '../../command/types.js';
import { Entity } from './entity.js';

export type ApplicationType<E = Entity> = BaseApplication &
  CommonClientServerApplication<E> &
  ExportApplicationPropertiesFromCommand<typeof import('../../../generators/spring-boot/command.ts').default>;

export type BaseApplicationSource = SpringBootSourceType & ClientSourceType & LanguagesSource;
