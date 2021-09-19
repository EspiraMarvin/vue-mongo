import mutations from '../../../../src/store/modules/clients'

describe("SET_CLIENT",  () => {
  it('set a new client to the state', function () {
    const client = {
      name: "Client One",
      email: "clientone@gmail.com",
      phone: "12025886500",
      providers: [
      {
        id: "614198a8f38e5f18597dbfc0"
      },
      {
        id: "614198b7f38e5f18597dbfc6"
      }
    ]
    }

    const state = {
      clients: [],
    }

    mutations.mutations.SET_CLIENTS(state, {client})

    expect(state.clients).toBeTruthy()
  });
})

