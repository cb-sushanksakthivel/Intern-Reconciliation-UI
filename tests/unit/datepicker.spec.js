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
  it("Datepicker renders", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("Datepicker has data", () => {
    expect(typeof DatePicker.data).toBeDefined;
  });
  it("Datepicker got props", () => {
    const when = "From Date"
    wrapper = mount(DatePicker,{
      propsData: {
        when: when
      }
    })
    expect(wrapper.vm.when).toBe(when);
  });
  it("Datepicker method save working",()=>{
    let s="2022-04-07";
    var d=new Date(s);
    d.setHours(0,0,0,0);
    var send=Math.floor(d.getTime()/1000);
    wrapper.vm.$emit('getdate',send);
    expect(wrapper.emitted().getdate[0][0]).toBe(send);
  });
});