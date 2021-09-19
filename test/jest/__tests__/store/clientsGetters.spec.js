import getters from '../../../../src/store/modules/clients'

const clients = [
  {
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
]

const state = { clients }

describe("get clients", () => {
  it('should return clients', function () {
    const actualClients = getters.getters.GET_CLIENTS(state)
    expect(actualClients).toBeTruthy()

  });
})
