import DatePicker from '@/../components/datepicker.vue';
import { shallowMount, mount } from "@vue/test-utils";

const $router = {
  replace: jest.fn()
}
describe('datepicker.vue',()=>{
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(DatePicker, {
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