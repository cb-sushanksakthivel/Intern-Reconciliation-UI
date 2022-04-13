import History from '@/../pages/history.vue';
import { shallowMount, mount } from "@vue/test-utils";

const $router = {
  replace: jest.fn()
}
describe('about.vue',()=>{
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(History, {
      mocks: {
        $router
      }
    });
    jest.resetModules();
    jest.clearAllMocks();
  });
  it("About renders", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("About has data", () => {
    expect(typeof History.data).toBe('function')
  });
});