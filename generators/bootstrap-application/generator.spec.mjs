/**
 * Copyright 2013-2022 the original author or authors from the JHipster project.
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
import expect from 'expect';
import lodash from 'lodash';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';

import Generator from './index.mjs';
import { dryRunHelpers as helpers } from '../../test/utils/utils.mjs';
import fieldTypes from '../../jdl/jhipster/field-types.js';

const {
  CommonDBTypes: { UUID },
} = fieldTypes;

const { snakeCase } = lodash;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generatorPath = join(__dirname, 'index.mjs');
const generator = basename(__dirname);

const filterEntity = entity => ({
  ...entity,
  faker: '[faker] function',
  resetFakerSeed: '[resetFakerSeed] function',
  generateFakeData: '[generateFakeData] function',
  fields: entity.fields.map(field => ({
    ...field,
    entity: `[entity] ${entity.entityName}`,
    generateFakeData: '[generateFakeData] function',
    createRandexp: '[createRandexp] function',
    reference: '[reference]',
  })),
  relationships: entity.relationships.map(relationship => ({
    ...relationship,
    otherEntity: `[otherEntity] ${entity.entityName}`,
  })),
  primaryKey: {
    ...entity.primaryKey,
    ownFields: '[ownFields] getter',
    fields: '[fields] getter',
    derivedFields: '[derivedFields] getter',
    ids: entity.primaryKey.ids.map(id => ({
      ...id,
      field: `[field] ${id.field.fieldName}`,
    })),
  },
});

describe(`JHipster ${generator} generator`, () => {
  it('generator-list constant matches folder name', async () => {
    await expect((await import('../generator-list.js')).default[`GENERATOR_${snakeCase(generator).toUpperCase()}`]).toBe(generator);
  });
  it('should be exported at package.json', async () => {
    await expect((await import(`generator-jhipster/esm/generators/${generator}`)).default).toBe(Generator);
  });
  it('should support features parameter', () => {
    const instance = new Generator([], { help: true }, { bar: true });
    expect(instance.features.bar).toBe(true);
  });

  describe('with', () => {
    describe('default config', () => {
      let runResult;
      before(async () => {
        runResult = await helpers.run(generatorPath).withOptions({
          defaults: true,
          creationTimestamp: '2000-01-01',
          applicationWithEntities: {
            config: {
              baseName: 'jhipster',
            },
            entities: [
              {
                name: 'EntityA',
                changelogDate: '20220129025419',
                fields: [
                  {
                    fieldName: 'id',
                    fieldType: UUID,
                  },
                ],
              },
            ],
          },
        });
      });

      it('should write files', () => {
        expect(runResult.getSnapshot('**/{.jhipster/**, entities.json}')).toMatchInlineSnapshot(`
Object {
  ".jhipster/EntityA.json": Object {
    "contents": "{
  \\"changelogDate\\": \\"20220129025419\\",
  \\"fields\\": [
    {
      \\"fieldName\\": \\"id\\",
      \\"fieldType\\": \\"UUID\\"
    }
  ],
  \\"name\\": \\"EntityA\\",
  \\"relationships\\": []
}
",
    "stateCleared": "modified",
  },
  ".jhipster/User.json": Object {
    "contents": null,
  },
}
`);
      });
      it('should prepare entities', () => {
        expect(Object.keys(runResult.env.sharedOptions.sharedData.jhipster.sharedEntities)).toMatchInlineSnapshot(`
Array [
  "User",
  "EntityA",
]
`);
      });
      it('should prepare User', () => {
        const entity = runResult.env.sharedOptions.sharedData.jhipster.sharedEntities.User;
        expect(filterEntity(entity)).toMatchInlineSnapshot(`
Object {
  "authenticationType": "jwt",
  "blobFields": Array [],
  "builtIn": true,
  "builtInUser": true,
  "clientFramework": "angularX",
  "clientRootFolder": "",
  "databaseType": "sql",
  "differentRelationships": Object {},
  "differentTypes": Array [],
  "dto": true,
  "dtoClass": "User",
  "dtoInstance": "user",
  "dtoMapstruct": false,
  "embedded": false,
  "entityAngularJSSuffix": undefined,
  "entityAngularName": "User",
  "entityAngularNamePlural": "Users",
  "entityApi": "",
  "entityApiUrl": "users",
  "entityClass": "User",
  "entityClassHumanized": "User",
  "entityClassPlural": "Users",
  "entityClassPluralHumanized": "Users",
  "entityFileName": "user",
  "entityFolderName": "user",
  "entityI18nVariant": "default",
  "entityInstance": "user",
  "entityInstancePlural": "users",
  "entityModelFileName": "user",
  "entityNameCapitalized": "User",
  "entityNamePlural": "Users",
  "entityNamePluralizedAndSpinalCased": "users",
  "entityPackage": undefined,
  "entityPage": "user",
  "entityParentPathAddition": "",
  "entityPluralFileName": "usersundefined",
  "entityReactName": "User",
  "entityServiceFileName": "user",
  "entityStateName": "user",
  "entityTableName": "_user",
  "entityTranslationKey": "user",
  "entityTranslationKeyMenu": "user",
  "entityUrl": "user",
  "enums": Array [],
  "existingEnum": false,
  "faker": "[faker] function",
  "fieldNameChoices": Array [],
  "fields": Array [
    Object {
      "autoGenerate": true,
      "autoGenerateByRepository": true,
      "autoGenerateByService": false,
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "builtIn": true,
      "columnName": "id",
      "createRandexp": "[createRandexp] function",
      "dynamic": false,
      "entity": "[entity] undefined",
      "fieldInJavaBeanMethod": "Id",
      "fieldIsEnum": false,
      "fieldName": "id",
      "fieldNameAsDatabaseColumn": "id",
      "fieldNameCapitalized": "Id",
      "fieldNameHumanized": "ID",
      "fieldNameUnderscored": "id",
      "fieldTranslationKey": "global.field.id",
      "fieldType": "Long",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": false,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": true,
      "fieldTypeNumeric": true,
      "fieldTypeString": false,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesMaxlength": undefined,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": "[generateFakeData] function",
      "id": true,
      "jpaGeneratedValue": "sequence",
      "nullable": true,
      "path": Array [
        "id",
      ],
      "readonly": true,
      "reference": "[reference]",
      "relationshipsPath": Array [],
      "tsType": "number",
      "unique": false,
      "uniqueValue": Array [],
    },
    Object {
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "builtIn": true,
      "columnName": "login",
      "createRandexp": "[createRandexp] function",
      "entity": "[entity] undefined",
      "fieldInJavaBeanMethod": "Login",
      "fieldIsEnum": false,
      "fieldName": "login",
      "fieldNameAsDatabaseColumn": "login",
      "fieldNameCapitalized": "Login",
      "fieldNameHumanized": "Login",
      "fieldNameUnderscored": "login",
      "fieldTranslationKey": "undefined.user.login",
      "fieldType": "String",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": true,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": "[generateFakeData] function",
      "nullable": true,
      "path": Array [
        "login",
      ],
      "reference": "[reference]",
      "relationshipsPath": Array [],
      "tsType": "string",
      "unique": false,
      "uniqueValue": Array [],
    },
    Object {
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "columnName": "first_name",
      "createRandexp": "[createRandexp] function",
      "entity": "[entity] undefined",
      "fieldInJavaBeanMethod": "FirstName",
      "fieldIsEnum": false,
      "fieldName": "firstName",
      "fieldNameAsDatabaseColumn": "first_name",
      "fieldNameCapitalized": "FirstName",
      "fieldNameHumanized": "First Name",
      "fieldNameUnderscored": "first_name",
      "fieldTranslationKey": "undefined.user.firstName",
      "fieldType": "String",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": true,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": "[generateFakeData] function",
      "nullable": true,
      "path": Array [
        "firstName",
      ],
      "reference": "[reference]",
      "relationshipsPath": Array [],
      "tsType": "string",
      "unique": false,
      "uniqueValue": Array [],
    },
    Object {
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "columnName": "last_name",
      "createRandexp": "[createRandexp] function",
      "entity": "[entity] undefined",
      "fieldInJavaBeanMethod": "LastName",
      "fieldIsEnum": false,
      "fieldName": "lastName",
      "fieldNameAsDatabaseColumn": "last_name",
      "fieldNameCapitalized": "LastName",
      "fieldNameHumanized": "Last Name",
      "fieldNameUnderscored": "last_name",
      "fieldTranslationKey": "undefined.user.lastName",
      "fieldType": "String",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": true,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": "[generateFakeData] function",
      "nullable": true,
      "path": Array [
        "lastName",
      ],
      "reference": "[reference]",
      "relationshipsPath": Array [],
      "tsType": "string",
      "unique": false,
      "uniqueValue": Array [],
    },
  ],
  "fieldsContainBigDecimal": false,
  "fieldsContainBlob": false,
  "fieldsContainBlobOrImage": false,
  "fieldsContainDate": false,
  "fieldsContainDuration": false,
  "fieldsContainEmbedded": false,
  "fieldsContainImageBlob": false,
  "fieldsContainInstant": false,
  "fieldsContainLocalDate": false,
  "fieldsContainManyToOne": false,
  "fieldsContainNoOwnerOneToOne": false,
  "fieldsContainOneToMany": false,
  "fieldsContainOwnerManyToMany": false,
  "fieldsContainOwnerOneToOne": false,
  "fieldsContainTextBlob": false,
  "fieldsContainUUID": false,
  "fieldsContainZonedDateTime": false,
  "fieldsIsReactAvField": false,
  "fluentMethods": true,
  "generateFakeData": "[generateFakeData] function",
  "haveFieldWithJavadoc": false,
  "i18nAlertHeaderPrefix": "undefined.user",
  "i18nKeyPrefix": "undefined.user",
  "i18nToLoad": Array [],
  "jhiPrefix": "jhi",
  "jpaMetamodelFiltering": false,
  "microfrontend": undefined,
  "name": "User",
  "otherRelationships": Array [],
  "pagination": "no",
  "paginationInfiniteScroll": false,
  "paginationNo": true,
  "paginationPagination": false,
  "persistClass": "User",
  "persistInstance": "user",
  "primaryKey": Object {
    "autoGenerate": true,
    "composite": false,
    "derived": false,
    "derivedFields": "[derivedFields] getter",
    "fields": "[fields] getter",
    "hasLong": true,
    "hasUUID": false,
    "ids": Array [
      Object {
        "autoGenerate": true,
        "field": "[field] id",
        "getter": "getId",
        "name": "id",
        "nameCapitalized": "Id",
        "nameDotted": "id",
        "nameDottedAsserted": "id!",
        "relationshipsPath": Array [],
        "setter": "setId",
      },
    ],
    "name": "id",
    "nameCapitalized": "Id",
    "ownFields": "[ownFields] getter",
    "relationships": Array [],
    "tsType": "number",
    "type": "Long",
    "typeLong": true,
    "typeNumeric": true,
    "typeString": false,
    "typeUUID": false,
  },
  "prodDatabaseType": "postgresql",
  "reactive": false,
  "readOnly": false,
  "relationships": Array [],
  "resetFakerSeed": "[resetFakerSeed] function",
  "restClass": "User",
  "restInstance": "user",
  "saveUserSnapshot": false,
  "searchEngine": false,
  "service": "no",
  "serviceImpl": false,
  "serviceNo": true,
  "skipUiGrouping": false,
  "useMicroserviceJson": false,
  "validation": false,
}
`);
      });
      it('should prepare EntityA', () => {
        const entity = runResult.env.sharedOptions.sharedData.jhipster.sharedEntities.EntityA;
        expect(filterEntity(entity)).toMatchInlineSnapshot(`
Object {
  "authenticationType": "jwt",
  "blobFields": Array [],
  "builtInUser": false,
  "changelogDate": "20220129025419",
  "changelogDateForRecent": 2022-01-29T02:54:19.000Z,
  "clientFramework": "angularX",
  "clientRootFolder": "",
  "databaseType": "sql",
  "differentRelationships": Object {},
  "differentTypes": Array [],
  "dto": "no",
  "dtoMapstruct": false,
  "embedded": false,
  "entityAngularJSSuffix": undefined,
  "entityAngularName": "EntityA",
  "entityAngularNamePlural": "EntityAS",
  "entityApi": "",
  "entityApiUrl": "entity-as",
  "entityClass": "EntityA",
  "entityClassHumanized": "Entity A",
  "entityClassPlural": "EntityAS",
  "entityClassPluralHumanized": "Entity AS",
  "entityFileName": "entity-a",
  "entityFolderName": "entity-a",
  "entityI18nVariant": "default",
  "entityInstance": "entityA",
  "entityInstancePlural": "entityAS",
  "entityModelFileName": "entity-a",
  "entityNameCapitalized": "EntityA",
  "entityNamePlural": "EntityAS",
  "entityNamePluralizedAndSpinalCased": "entity-as",
  "entityPackage": undefined,
  "entityPage": "entity-a",
  "entityParentPathAddition": "",
  "entityPluralFileName": "entity-asundefined",
  "entityReactName": "EntityA",
  "entityServiceFileName": "entity-a",
  "entityStateName": "entity-a",
  "entityTableName": "entitya",
  "entityTranslationKey": "entityA",
  "entityTranslationKeyMenu": "entityA",
  "entityUrl": "entity-a",
  "enums": Array [],
  "existingEnum": false,
  "faker": "[faker] function",
  "fieldNameChoices": Array [],
  "fields": Array [
    Object {
      "autoGenerate": true,
      "autoGenerateByRepository": true,
      "autoGenerateByService": false,
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "columnName": "id",
      "createRandexp": "[createRandexp] function",
      "dynamic": false,
      "entity": "[entity] undefined",
      "fieldInJavaBeanMethod": "Id",
      "fieldIsEnum": false,
      "fieldName": "id",
      "fieldNameAsDatabaseColumn": "id",
      "fieldNameCapitalized": "Id",
      "fieldNameHumanized": "Id",
      "fieldNameUnderscored": "id",
      "fieldTranslationKey": "undefined.entityA.id",
      "fieldType": "UUID",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": false,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": true,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": "[generateFakeData] function",
      "id": true,
      "jpaGeneratedValue": true,
      "nullable": true,
      "path": Array [
        "id",
      ],
      "readonly": true,
      "reference": "[reference]",
      "relationshipsPath": Array [],
      "tsType": "string",
      "unique": false,
      "uniqueValue": Array [],
    },
  ],
  "fieldsContainBigDecimal": false,
  "fieldsContainBlob": false,
  "fieldsContainBlobOrImage": false,
  "fieldsContainDate": false,
  "fieldsContainDuration": false,
  "fieldsContainEmbedded": false,
  "fieldsContainImageBlob": false,
  "fieldsContainInstant": false,
  "fieldsContainLocalDate": false,
  "fieldsContainManyToOne": false,
  "fieldsContainNoOwnerOneToOne": false,
  "fieldsContainOneToMany": false,
  "fieldsContainOwnerManyToMany": false,
  "fieldsContainOwnerOneToOne": false,
  "fieldsContainTextBlob": false,
  "fieldsContainUUID": true,
  "fieldsContainZonedDateTime": false,
  "fieldsIsReactAvField": false,
  "fluentMethods": true,
  "generateFakeData": "[generateFakeData] function",
  "haveFieldWithJavadoc": false,
  "i18nAlertHeaderPrefix": "undefined.entityA",
  "i18nKeyPrefix": "undefined.entityA",
  "i18nToLoad": Array [],
  "jhiPrefix": "jhi",
  "jpaMetamodelFiltering": false,
  "microfrontend": false,
  "name": "EntityA",
  "otherRelationships": Array [],
  "pagination": "no",
  "paginationInfiniteScroll": false,
  "paginationNo": true,
  "paginationPagination": false,
  "persistClass": "EntityA",
  "persistInstance": "entityA",
  "primaryKey": Object {
    "autoGenerate": true,
    "composite": false,
    "derived": false,
    "derivedFields": "[derivedFields] getter",
    "fields": "[fields] getter",
    "hasLong": false,
    "hasUUID": true,
    "ids": Array [
      Object {
        "autoGenerate": true,
        "field": "[field] id",
        "getter": "getId",
        "name": "id",
        "nameCapitalized": "Id",
        "nameDotted": "id",
        "nameDottedAsserted": "id!",
        "relationshipsPath": Array [],
        "setter": "setId",
      },
    ],
    "name": "id",
    "nameCapitalized": "Id",
    "ownFields": "[ownFields] getter",
    "relationships": Array [],
    "tsType": "string",
    "type": "UUID",
    "typeLong": false,
    "typeNumeric": false,
    "typeString": false,
    "typeUUID": true,
  },
  "prodDatabaseType": "postgresql",
  "reactive": false,
  "readOnly": false,
  "relationships": Array [],
  "resetFakerSeed": "[resetFakerSeed] function",
  "restClass": "EntityA",
  "restInstance": "entityA",
  "saveUserSnapshot": false,
  "searchEngine": false,
  "service": "no",
  "serviceImpl": false,
  "serviceNo": true,
  "skipUiGrouping": false,
  "useMicroserviceJson": false,
  "validation": false,
}
`);
      });
    });

    describe('skipUserManagement', () => {
      let runResult;
      before(async () => {
        runResult = await helpers.run(generatorPath).withOptions({
          defaults: true,
          applicationWithEntities: {
            config: {
              baseName: 'jhipster',
              skipUserManagement: true,
            },
            entities: [
              {
                name: 'EntityA',
                changelogDate: '20220129025419',
                fields: [
                  {
                    fieldName: 'id',
                    fieldType: UUID,
                  },
                ],
              },
            ],
          },
        });
      });

      it('should write files', () => {
        expect(runResult.getSnapshot('**/{.jhipster/**, entities.json}')).toMatchInlineSnapshot(`
Object {
  ".jhipster/EntityA.json": Object {
    "contents": "{
  \\"changelogDate\\": \\"20220129025419\\",
  \\"fields\\": [
    {
      \\"fieldName\\": \\"id\\",
      \\"fieldType\\": \\"UUID\\"
    }
  ],
  \\"name\\": \\"EntityA\\",
  \\"relationships\\": []
}
",
    "stateCleared": "modified",
  },
}
`);
      });
      it('should prepare entities', () => {
        expect(Object.keys(runResult.env.sharedOptions.sharedData.jhipster.sharedEntities)).toMatchInlineSnapshot(`
Array [
  "EntityA",
]
`);
      });
      it('should prepare EntityA', () => {
        const entity = runResult.env.sharedOptions.sharedData.jhipster.sharedEntities.EntityA;
        expect(filterEntity(entity)).toMatchInlineSnapshot(`
Object {
  "authenticationType": "jwt",
  "blobFields": Array [],
  "builtInUser": false,
  "changelogDate": "20220129025419",
  "changelogDateForRecent": 2022-01-29T02:54:19.000Z,
  "clientFramework": "angularX",
  "clientRootFolder": "",
  "databaseType": "sql",
  "differentRelationships": Object {},
  "differentTypes": Array [],
  "dto": "no",
  "dtoMapstruct": false,
  "embedded": false,
  "entityAngularJSSuffix": undefined,
  "entityAngularName": "EntityA",
  "entityAngularNamePlural": "EntityAS",
  "entityApi": "",
  "entityApiUrl": "entity-as",
  "entityClass": "EntityA",
  "entityClassHumanized": "Entity A",
  "entityClassPlural": "EntityAS",
  "entityClassPluralHumanized": "Entity AS",
  "entityFileName": "entity-a",
  "entityFolderName": "entity-a",
  "entityI18nVariant": "default",
  "entityInstance": "entityA",
  "entityInstancePlural": "entityAS",
  "entityModelFileName": "entity-a",
  "entityNameCapitalized": "EntityA",
  "entityNamePlural": "EntityAS",
  "entityNamePluralizedAndSpinalCased": "entity-as",
  "entityPackage": undefined,
  "entityPage": "entity-a",
  "entityParentPathAddition": "",
  "entityPluralFileName": "entity-asundefined",
  "entityReactName": "EntityA",
  "entityServiceFileName": "entity-a",
  "entityStateName": "entity-a",
  "entityTableName": "entitya",
  "entityTranslationKey": "entityA",
  "entityTranslationKeyMenu": "entityA",
  "entityUrl": "entity-a",
  "enums": Array [],
  "existingEnum": false,
  "faker": "[faker] function",
  "fieldNameChoices": Array [],
  "fields": Array [
    Object {
      "autoGenerate": true,
      "autoGenerateByRepository": true,
      "autoGenerateByService": false,
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "columnName": "id",
      "createRandexp": "[createRandexp] function",
      "dynamic": false,
      "entity": "[entity] undefined",
      "fieldInJavaBeanMethod": "Id",
      "fieldIsEnum": false,
      "fieldName": "id",
      "fieldNameAsDatabaseColumn": "id",
      "fieldNameCapitalized": "Id",
      "fieldNameHumanized": "Id",
      "fieldNameUnderscored": "id",
      "fieldTranslationKey": "undefined.entityA.id",
      "fieldType": "UUID",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": false,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": true,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": "[generateFakeData] function",
      "id": true,
      "jpaGeneratedValue": true,
      "nullable": true,
      "path": Array [
        "id",
      ],
      "readonly": true,
      "reference": "[reference]",
      "relationshipsPath": Array [],
      "tsType": "string",
      "unique": false,
      "uniqueValue": Array [],
    },
  ],
  "fieldsContainBigDecimal": false,
  "fieldsContainBlob": false,
  "fieldsContainBlobOrImage": false,
  "fieldsContainDate": false,
  "fieldsContainDuration": false,
  "fieldsContainEmbedded": false,
  "fieldsContainImageBlob": false,
  "fieldsContainInstant": false,
  "fieldsContainLocalDate": false,
  "fieldsContainManyToOne": false,
  "fieldsContainNoOwnerOneToOne": false,
  "fieldsContainOneToMany": false,
  "fieldsContainOwnerManyToMany": false,
  "fieldsContainOwnerOneToOne": false,
  "fieldsContainTextBlob": false,
  "fieldsContainUUID": true,
  "fieldsContainZonedDateTime": false,
  "fieldsIsReactAvField": false,
  "fluentMethods": true,
  "generateFakeData": "[generateFakeData] function",
  "haveFieldWithJavadoc": false,
  "i18nAlertHeaderPrefix": "undefined.entityA",
  "i18nKeyPrefix": "undefined.entityA",
  "i18nToLoad": Array [],
  "jhiPrefix": "jhi",
  "jpaMetamodelFiltering": false,
  "microfrontend": false,
  "name": "EntityA",
  "otherRelationships": Array [],
  "pagination": "no",
  "paginationInfiniteScroll": false,
  "paginationNo": true,
  "paginationPagination": false,
  "persistClass": "EntityA",
  "persistInstance": "entityA",
  "primaryKey": Object {
    "autoGenerate": true,
    "composite": false,
    "derived": false,
    "derivedFields": "[derivedFields] getter",
    "fields": "[fields] getter",
    "hasLong": false,
    "hasUUID": true,
    "ids": Array [
      Object {
        "autoGenerate": true,
        "field": "[field] id",
        "getter": "getId",
        "name": "id",
        "nameCapitalized": "Id",
        "nameDotted": "id",
        "nameDottedAsserted": "id!",
        "relationshipsPath": Array [],
        "setter": "setId",
      },
    ],
    "name": "id",
    "nameCapitalized": "Id",
    "ownFields": "[ownFields] getter",
    "relationships": Array [],
    "tsType": "string",
    "type": "UUID",
    "typeLong": false,
    "typeNumeric": false,
    "typeString": false,
    "typeUUID": true,
  },
  "prodDatabaseType": "postgresql",
  "reactive": false,
  "readOnly": false,
  "relationships": Array [],
  "resetFakerSeed": "[resetFakerSeed] function",
  "restClass": "EntityA",
  "restInstance": "entityA",
  "saveUserSnapshot": false,
  "searchEngine": false,
  "service": "no",
  "serviceImpl": false,
  "serviceNo": true,
  "skipUiGrouping": false,
  "useMicroserviceJson": false,
  "validation": false,
}
`);
      });
    });
  });
});
