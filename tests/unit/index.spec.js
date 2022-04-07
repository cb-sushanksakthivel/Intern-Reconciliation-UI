import Index from '@/../pages/index.vue';
import { shallowMount, mount } from "@vue/test-utils";

const $router = {
  replace: jest.fn()
}
describe('index.vue',()=>{
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Index, {
      mocks: {
        $router
      }
    });
    jest.resetModules();
    jest.clearAllMocks();
  });
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });
});