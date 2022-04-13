import Index from '@/../pages/index.vue';
import DatePicker from '@/../components/datepicker.vue';
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
  it("Index renders", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("Index has data", () => {
    expect(typeof Index.data).toBe('function')
  });
  it("Index has reconcile button", () => {
    expect(wrapper.html()).toContain("Reconcile")
  });
  it("Index has 'From Date' dropdown", () => {
    const wrapper = shallowMount(Index)
    wrapper.findComponent(DatePicker).vm.$emit('From Date')
    expect(wrapper.html()).toContain('From Date')
  });
  it("Index has 'To Date' datepicker", () => {
    const wrapper = shallowMount(Index)
    wrapper.findComponent(DatePicker).vm.$emit('To Date')
    expect(wrapper.html()).toContain('To Date')
  });
  it("Index fdate updating",()=>{
    expect(wrapper.vm.fdate).toBe(null);
    let s="2022-03-21";
    wrapper.vm.getfdate(s);
    expect(wrapper.vm.fdate).toBe(s);
  });
  it("Index tdate updating",()=>{
    expect(wrapper.vm.tdate).toBe(null);
    let s="2022-04-07";
    wrapper.vm.gettdate(s);
    expect(wrapper.vm.tdate).toBe(s);
  });
  it("Index forceRerender working",()=>{
    expect(wrapper.vm.renderComponent).toBe(false);
    wrapper.vm.$nextTick(()=>{
      expect(wrapper.vm.renderComponent).toBe(true);
    })
  });
});