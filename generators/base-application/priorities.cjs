const { PRIORITY_PREFIX, QUEUE_PREFIX, PRIORITY_NAMES, QUEUES } = require('../base/priorities.cjs');

const { DEFAULT, TRANSFORM, PRE_CONFLICTS } = PRIORITY_NAMES;

const CONFIGURING_EACH_ENTITY = 'configuringEachEntity';
const CONFIGURING_EACH_ENTITY_QUEUE = `${QUEUE_PREFIX}${CONFIGURING_EACH_ENTITY}`;

const LOADING_ENTITIES = 'loadingEntities';
const LOADING_ENTITIES_QUEUE = `${QUEUE_PREFIX}${LOADING_ENTITIES}`;

const PREPARING_EACH_ENTITY = 'preparingEachEntity';
const PREPARING_EACH_ENTITY_QUEUE = `${QUEUE_PREFIX}${PREPARING_EACH_ENTITY}`;

const PREPARING_EACH_ENTITY_FIELD = 'preparingEachEntityField';
const PREPARING_EACH_ENTITY_FIELD_QUEUE = `${QUEUE_PREFIX}${PREPARING_EACH_ENTITY_FIELD}`;

const PREPARING_EACH_ENTITY_RELATIONSHIP = 'preparingEachEntityRelationship';
const PREPARING_EACH_ENTITY_RELATIONSHIP_QUEUE = `${QUEUE_PREFIX}${PREPARING_EACH_ENTITY_RELATIONSHIP}`;

const POST_PREPARING_EACH_ENTITY = 'postPreparingEachEntity';
const POST_PREPARING_EACH_ENTITY_QUEUE = `${QUEUE_PREFIX}${POST_PREPARING_EACH_ENTITY}`;

const WRITING_ENTITIES = 'writingEntities';
const WRITING_ENTITIES_QUEUE = `${QUEUE_PREFIX}${WRITING_ENTITIES}`;

const POST_WRITING_ENTITIES = 'postWritingEntities';
const POST_WRITING_ENTITIES_QUEUE = `${QUEUE_PREFIX}${POST_WRITING_ENTITIES}`;

const CUSTOM_PRIORITIES = [
  {
    priorityName: CONFIGURING_EACH_ENTITY,
    queueName: CONFIGURING_EACH_ENTITY_QUEUE,
    before: LOADING_ENTITIES,
    skip: true,
  },
  {
    priorityName: LOADING_ENTITIES,
    queueName: LOADING_ENTITIES_QUEUE,
    before: PREPARING_EACH_ENTITY,
    skip: true,
  },
  {
    priorityName: PREPARING_EACH_ENTITY,
    queueName: PREPARING_EACH_ENTITY_QUEUE,
    before: PREPARING_EACH_ENTITY_FIELD,
    skip: true,
  },
  {
    priorityName: PREPARING_EACH_ENTITY_FIELD,
    queueName: PREPARING_EACH_ENTITY_FIELD_QUEUE,
    before: PREPARING_EACH_ENTITY_RELATIONSHIP,
    skip: true,
  },
  {
    priorityName: PREPARING_EACH_ENTITY_RELATIONSHIP,
    queueName: PREPARING_EACH_ENTITY_RELATIONSHIP_QUEUE,
    before: POST_PREPARING_EACH_ENTITY,
    skip: true,
  },
  {
    priorityName: POST_PREPARING_EACH_ENTITY,
    queueName: POST_PREPARING_EACH_ENTITY_QUEUE,
    before: DEFAULT,
    skip: true,
  },
  {
    priorityName: WRITING_ENTITIES,
    queueName: WRITING_ENTITIES_QUEUE,
    before: TRANSFORM,
    skip: true,
  },
  {
    priorityName: POST_WRITING_ENTITIES,
    queueName: POST_WRITING_ENTITIES_QUEUE,
    before: PRE_CONFLICTS,
    skip: true,
  },
].reverse();

const ENTITY_QUEUES = {
  CONFIGURING_EACH_ENTITY_QUEUE,
  LOADING_ENTITIES_QUEUE,
  PREPARING_EACH_ENTITY_QUEUE,
  PREPARING_EACH_ENTITY_FIELD_QUEUE,
  PREPARING_EACH_ENTITY_RELATIONSHIP_QUEUE,
  POST_PREPARING_EACH_ENTITY_QUEUE,
  WRITING_ENTITIES_QUEUE,
  POST_WRITING_ENTITIES_QUEUE,
};

const ENTITY_PRIORITY_NAMES = {
  CONFIGURING_EACH_ENTITY,
  LOADING_ENTITIES,
  PREPARING_EACH_ENTITY,
  PREPARING_EACH_ENTITY_FIELD,
  PREPARING_EACH_ENTITY_RELATIONSHIP,
  POST_PREPARING_EACH_ENTITY,
  WRITING_ENTITIES,
  POST_WRITING_ENTITIES,
};

const PRIORITY_NAMES_LIST = [
  PRIORITY_NAMES.INITIALIZING,
  PRIORITY_NAMES.PROMPTING,
  PRIORITY_NAMES.CONFIGURING,
  PRIORITY_NAMES.COMPOSING,
  PRIORITY_NAMES.LOADING,
  PRIORITY_NAMES.PREPARING,
  CONFIGURING_EACH_ENTITY,
  LOADING_ENTITIES,
  PREPARING_EACH_ENTITY,
  PREPARING_EACH_ENTITY_FIELD,
  PREPARING_EACH_ENTITY_RELATIONSHIP,
  POST_PREPARING_EACH_ENTITY,
  DEFAULT,
  PRIORITY_NAMES.WRITING,
  WRITING_ENTITIES,
  PRIORITY_NAMES.POST_WRITING,
  POST_WRITING_ENTITIES,
  PRIORITY_NAMES.INSTALL,
  PRIORITY_NAMES.POST_INSTALL,
  PRIORITY_NAMES.END,
];

module.exports = {
  PRIORITY_PREFIX,
  CUSTOM_PRIORITIES,
  PRIORITY_NAMES_LIST,
  PRIORITY_NAMES: {
    ...PRIORITY_NAMES,
    ...ENTITY_PRIORITY_NAMES,
  },
  ENTITY_PRIORITY_NAMES,
  QUEUES: {
    ...QUEUES,
    ...ENTITY_QUEUES,
  },
};
