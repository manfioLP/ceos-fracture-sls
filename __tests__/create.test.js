const {promisify} = require('util');
const lambda = require( '../handlers/create');
const handler = promisify(lambda.create);

const {closeConnection} = require('../db')

// TODO: set environment for jest with mongoose

const context = {
  "awsRequestId": "ckb8j7s4q0002qjr9azyw2xmv",
  "callbackWaitsForEmptyEventLoop": true,
  "clientContext": null,
  "functionName": "ceos-fracture-dev-create",
  "functionVersion": "$LATEST",
  "invokedFunctionArn": "offline_invokedFunctionArn_for_ceos-server-dev-create",
  "logGroupName": "offline_logGroupName_for_ceos-server-dev-create",
  "logStreamName": "offline_logStreamName_for_ceos-server-dev-create",
  "memoryLimitInMB": "128"
}

const reqBody = {
  gustillo: '1',
  ao: 'C',
  recordNumber: '123456',
  description: 'foi feio o bagulho',
  limb: 'hand',
  bone: 'metatarso',
  region: 'upperbody',
  mechanism: 'roller accident',
  associatedTraumaInjury: '(1) trauma1, (2) trauma2',
  firstSurgicalApproach: 'imobilizacao',
  amputation: false,
  patient: '5edc301ea480e94c8efd914a'
}

describe('Create', () => {

  test('Basic create', async (done) => {
    const result = await handler({body: JSON.stringify(reqBody)}, context);
    const fracture= JSON.parse(result.body)
    expect(fracture).toHaveProperty('recordNumber', '123456')
    done();
  })

  // reqBody.month = 'january';
  // reqBody.weekday = 'tuesday';
  // reqBody.name= reqBody.name + 2
  // test('Inform day and month', () => {
  //   // to include keys...
  //   const patient = create.create(reqBody)
  //   expect(patient).toHaveProperty('age', 25)
  //   expect(patient).toHaveProperty('education', 'pos-grad')
  //   expect(patient).toHaveProperty('otherComorbidities')
  //   expect(patient.associatedTraumaInjury).toHaveLength(1)
  //   expect(patient).toHaveProperty('month', 'january')
  //   expect(patient).toHaveProperty('weekday', 'tuesday')
  // });
  //
  // reqBody.associatedTraumaInjury.push({kind: 'second trauma'})
  // test('with extra associated trauma', () => {
  //   const patient = create.create(reqBody)
  //   // to include keys...
  //   expect(patient).associatedTraumaInjury.toHaveLength(2)
  // });

  afterAll(done => {
    closeConnection();
    done();
  })
});
