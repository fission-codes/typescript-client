import axios from 'axios'

// NOTE: We must import sinon in this manner: https://github.com/sinonjs/sinon/issues/1711
const sinon = require('sinon')

/* Helpers */

type DescribeRequestOptions = {
  desc: string
  responseData: object
  requestFn: () => Promise<any>
  expectedReturn: any
  expectedUrl: string
  expectedArguments: Array<any>
  method: string
}

/**
 * A convienience method to mock test axios based requests.
 */
export const describeRequest = (opts: DescribeRequestOptions) => {
  return describe(opts.desc, () => {
    let response: any
    let fake: sinon.SinonSpy

    beforeAll(async () => {
      fake = sinon.fake.returns(new Promise(r => r(opts.responseData)))
      sinon.replace(axios, opts.method, fake)
      response = await opts.requestFn()
    })

    it('returns expected response', () => {
      expect(response).toEqual(opts.expectedReturn)
    })

    it('sends only one request', () => {
      expect(fake.callCount).toEqual(1)
    })

    it('sends request with a properly formatted url', () => {
      expect(fake.args[0][0]).toEqual(opts.expectedUrl)
    })

    it('has expected arguments', () => {
      opts.expectedArguments.map((arg, index) => {
        expect(fake.args[0][index + 1]).toEqual(arg)
      })
    })
  })
}
