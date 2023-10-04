/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
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

/**
 * Merge two objects.
 * The order is important here: o1.merge(o2) means that the keys values of o2
 * will replace those identical to o1.
 * The keys that don't belong to the other object will be added.
 * @param object1 the object whose properties might be overridden by object2.
 * @param object2 the object to be merged with.
 * @returns {Object} the object result of the merge
 */
// TODO move it to a JHipsterEntityEqualityChecker file or inside the JSONEntity
export function merge<A, B>(object1: A, object2: B) {
  if (!object1 || Object.keys(object1).length === 0) {
    return object2;
  }
  if (!object2 || Object.keys(object2).length === 0) {
    return object1;
  }
  return {
    ...object1,
    ...object2,
  };
}

function removeEntriesWithUndefinedValue(entity: any) {
  Object.keys(entity).forEach(key => {
    if (entity[key] === undefined) {
      delete entity[key];
    }
  });
}

function checkIfSecurityDiffers(firstEntity, secondEntity) {
  if (firstEntity.security) {
    if (!secondEntity.security) {
      return true;
    }
  }
  if (secondEntity.security) {
    if (!firstEntity.security) {
      return true;
    }
  }
  return false;
}

export function areEntitiesEqual(firstEntity: any, secondEntity: any) {
  removeEntriesWithUndefinedValue(firstEntity);
  removeEntriesWithUndefinedValue(secondEntity);
  if (
    firstEntity.fields.length !== secondEntity.fields.length ||
    firstEntity.relationships.length !== secondEntity.relationships.length ||
    firstEntity.javadoc !== secondEntity.javadoc ||
    firstEntity.entityTableName !== secondEntity.entityTableName ||
    Object.keys(firstEntity).length !== Object.keys(secondEntity).length ||
    checkIfSecurityDiffers(firstEntity, secondEntity)
  ) {
    return false;
  }
  return (
    areFieldsEqual(firstEntity.fields, secondEntity.fields) &&
    areRelationshipsEqual(firstEntity.relationships, secondEntity.relationships) &&
    areOptionsTheSame(firstEntity, secondEntity) &&
    areSecurityOptionsAreTheSame(firstEntity, secondEntity)
  );
}

function areSecurityOptionsAreTheSame(firstEntity, secondEntity) {
  let result = true;
  if (firstEntity.secure && secondEntity.secure) {
    result = firstEntity.secure.securityType === secondEntity.secure.securityType;
    if (result) {
      if (firstEntity.secure.securityType === 'roles') {
        if (firstEntity.secure.roles && secondEntity.secure.roles) {
          result = firstEntity.secure.roles.length === secondEntity.secure.roles.length;
          if (result) {
            for (let i = 0; i < firstEntity.secure.roles.length; i++) {
              const role1 = firstEntity.secure.roles[i];
              const role2 = secondEntity.secure.roles[i];
              result = result && role1.role === role2.role;
              if (result && role1.actionList && role2.actionList && role1.actionList.length === role2.actionList.length)
                for (let j = 0; j < role1.actionList.length; j++) {
                  result = result && role1.actionList[j] === role2.actionList[j];
                }
            }
          }
        }
      } else if (firstEntity.secure.customSecurity && secondEntity.secure.customSecurity) {
        result = firstEntity.secure.customSecurity.length === secondEntity.secure.customSecurity.length;
        if (result) {
          for (let i = 0; i < firstEntity.secure.customSecurity.length; i++) {
            const item1 = firstEntity.secure.customSecurity[i];
            const item2 = secondEntity.secure.customSecurity[i];
            result = result && item1.action === item2.action;
            if (result && item1.privList && item2.privList && item1.privList.length === item2.privList.length)
              for (let j = 0; j < item1.privList.length; j++) {
                result = result && item1.privList[j] === item2.privList[j];
              }
          }
        }
      }
    }
  } else {
    return !firstEntity.secure && !secondEntity.secure;
  }
  return result;
}

function areFieldsEqual(firstFields: any[], secondFields: any[]) {
  return firstFields.every((field, index) => {
    if (Object.keys(field).length !== Object.keys(secondFields[index]).length) {
      return false;
    }
    const secondEntityField = secondFields[index];
    return Object.keys(field).every(key => {
      if (field[key].constructor === Array) {
        return field[key].toString() === secondEntityField[key].toString();
      }
      return field[key] === secondEntityField[key];
    });
  });
}

function areRelationshipsEqual(firstRelationships: any[], secondRelationships: any[]) {
  return firstRelationships.every((relationship, index) => {
    if (Object.keys(relationship).length !== Object.keys(secondRelationships[index]).length) {
      return false;
    }
    const secondEntityRelationship = secondRelationships[index];
    return Object.keys(relationship).every(key => relationship[key] === secondEntityRelationship[key]);
  });
}

function areOptionsTheSame(firstEntity: any, secondEntity: any) {
  if (firstEntity.jpaMetamodelFiltering === 'no') {
    firstEntity.jpaMetamodelFiltering = false;
  }
  if (secondEntity.jpaMetamodelFiltering === 'no') {
    secondEntity.jpaMetamodelFiltering = false;
  }

  return (
    firstEntity.dto === secondEntity.dto &&
    firstEntity.pagination === secondEntity.pagination &&
    firstEntity.service === secondEntity.service &&
    firstEntity.searchEngine === secondEntity.searchEngine &&
    firstEntity.jpaMetamodelFiltering === secondEntity.jpaMetamodelFiltering
  );
}
