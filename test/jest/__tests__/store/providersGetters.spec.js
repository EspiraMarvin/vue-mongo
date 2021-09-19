import getters from '../../../../src/store/modules/providers'

const providers = [
  {
    name: "Client One",
  },
  {
    name: "Provider 2"
  },
  {
    name: "Provider 3"
  }
]

const state = { providers }

describe("get providers", () => {
  it('should return providers', function () {
    const actualProviders = getters.getters.GET_PROVIDERS(state)
    expect(actualProviders).toBeTruthy()

  });
})
