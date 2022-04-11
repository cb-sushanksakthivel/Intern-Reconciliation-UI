import About from '@/../pages/about.vue';
import { shallowMount, mount } from "@vue/test-utils";

const $router = {
  replace: jest.fn()
}
describe('about.vue',()=>{
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(About, {
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
    expect(typeof About.data).toBe('function')
  });
  it("About image renders", () => {
    expect(wrapper.vm.isLoaded).toBe(false);
    wrapper.vm.onImgLoad();
    expect(wrapper.vm.isLoaded).toBe(true);
  });
});