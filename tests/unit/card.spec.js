import Card from '@/../components/card.vue';
import { shallowMount, mount } from "@vue/test-utils";

const $router = {
  replace: jest.fn()
}
describe('card.vue',()=>{
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Card, {
      mocks: {
        $router
      }
    });
    jest.resetModules();
    jest.clearAllMocks();
  });
  it("Card renders", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("Card got props - icon", () => {
    const icon = "mdi-bookmark-check"
    const wrapper = mount(Card,{
      propsData: {
        icon: icon
      }
    })
    expect(wrapper.vm.icon).toBe(icon);
  });
  it("Card got props - title", () => {
    const title = "134"
    const wrapper = mount(Card,{
      propsData: {
        title: title
      }
    })
    expect(wrapper.vm.title).toBe(title);
  });
  it("Card got props - subTitle", () => {
    const subTitle = "Matches"
    const wrapper = mount(Card,{
      propsData: {
        subTitle: subTitle
      }
    })
    expect(wrapper.vm.subTitle).toBe(subTitle);
  });
  it("Card got props - color", () => {
    const color = "green"
    const wrapper = mount(Card,{
      propsData: {
        color: color
      }
    })
    expect(wrapper.vm.color).toBe(color);
  });
});