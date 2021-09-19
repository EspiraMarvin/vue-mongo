import actions from '../../../../src/store/modules/providers'

describe("ADD_PROVIDER",  () => {
  it('add a provider to the state', function () {
    const provider =  {
      name: "provider 12",
    }

    const state = {
      providers: [],
    }

    actions.actions.ADD_PROVIDER(state, {provider})

    expect(state.providers).toBeTruthy()
  });
})


describe("DELETE_PROVIDER",  () => {
  it('delete provider from state', function () {
    const provider =  {
      name: "provider 12",
    }

    const state = {
      providers: [],
    }

    actions.actions.DELETE_PROVIDER(state, {provider})

    expect(state.providers.find(x => x.name === "provider 12")).toBeFalsy()
  });
})
