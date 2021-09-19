import actions from '../../../../src/store/modules/clients'

describe("DELETE_CLIENT",  () => {
  it('deletes client from state', function () {
    const client =  {
      name: "Client Thirty",
      email: "clientthirty@gmail.com",
      phone: "12025886501",
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

    actions.actions.DELETE_CLIENT(state, {client})

    expect(state.clients.find(x => x.name === "Client Thirty")).toBeFalsy()
  });
})
