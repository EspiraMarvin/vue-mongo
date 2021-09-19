import mutations from '../../../../src/store/modules/providers'

describe("SET_PROVIDER",  () => {
  it('set a new provider to the state', function () {
    const provider =  {
      name: "provider 10",
    }

    const state = {
      providers: [],
    }

    mutations.mutations.SET_PROVIDERS(state, {provider})

    expect(state.providers).toBeTruthy()
  });
})

