import DropDown from '@/../components/dropdown.vue';
import { shallowMount, mount } from "@vue/test-utils";

const $router = {
  replace: jest.fn()
}
describe('dropdown.vue',()=>{
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(DropDown, {
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