import { mountQuasar, mountFactory } from '@quasar/quasar-app-extension-testing-unit-jest';
import AddEditClient from '../../../../src/components/AddEditClient'
// import AddEditClient from "components/AddEditClient";

import store from '../../../../src/store';
import Vue from "vue";
import {config, mount} from "@vue/test-utils";
import * as All from "quasar";


Vue.config.silent = true;

config.mocks.$store = store();


const components = Object.keys(All).reduce((object, key) => {
  const val = All[key];
  if (val && val.component && val.component.name != null) {
    object[key] = val;
  }
  return object;
}, {});

describe('AddEditClient Component', () => {
  it('mounts without errors', function () {
    const wrapper = mountQuasar(AddEditClient, {
      quasar: {
        components: {

        }
      },
      propsData: {
        isEditing: true
      }
    })
    expect(wrapper).toBeTruthy()
  });
})


describe('Mounts AddEditClient Component',  () => {
  const wrapper = mountQuasar(AddEditClient)

  it('should have props providers', async function () {
    await wrapper.setProps({ providers: 'providers' })
    expect(wrapper.props().tab).toBe('providers')
  });

})
