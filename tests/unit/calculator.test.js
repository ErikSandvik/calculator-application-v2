import {describe, it, expect} from 'vitest'
import { shallowMount } from '@vue/test-utils';
import Calculator from '@/components/Calculator.vue';


describe('Calculator.vue', () => {
    it('renders correctly', () => {
        const wrapper = shallowMount(Calculator, {
            propsData: {
                isLogButtonPressed: false,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    it('writes numbers correctly', () => {
        const wrapper = shallowMount(Calculator, {
            propsData: {
                isLogButtonPressed: false,
            },
        });

        wrapper.vm.handleNumpadInput(1);
        wrapper.vm.handleNumpadInput(2);
        wrapper.vm.handleNumpadInput(3);

        expect(wrapper.vm.screenValue).toBe('123');
    });

    it('adds numbers correctly', () => {
        const wrapper = shallowMount(Calculator, {
            propsData: {
                isLogButtonPressed: false,
            },
        });
        // Simulate button clicks to add numbers
        wrapper.vm.handleNumpadInput(1);
        wrapper.vm.addOperation('+');
        wrapper.vm.handleNumpadInput(2);
        wrapper.vm.calculate();

        expect(wrapper.vm.screenValue).toBe('3');
    });


    it('gives math error when dividing by zero', () => {
        const wrapper = shallowMount(Calculator, {
            propsData: {
                isLogButtonPressed: false,
            },
        });
        wrapper.vm.handleNumpadInput(1);
        wrapper.vm.addOperation('/');
        wrapper.vm.handleNumpadInput(0);
        wrapper.vm.calculate();
        expect(wrapper.vm.screenValue).toBe('Math Error');
    });

    it('resets calc', () => {
        const wrapper = shallowMount(Calculator, {
            propsData: {
                isLogButtonPressed: false,
            },
        });
        wrapper.vm.resetCalc();
        expect(wrapper.vm.screenValue).toBe('0');
    });


    it('handles backspace', () => {
        const wrapper = shallowMount(Calculator, {
            propsData: {
                isLogButtonPressed: false,
            },
        });
        wrapper.vm.handleNumpadInput(1);
        wrapper.vm.handleNumpadInput(1);
        wrapper.vm.backspace();
        expect(wrapper.vm.screenValue).toBe('1');
    });

    it('handles ans correctly', () => {
        const wrapper = shallowMount(Calculator, {
            propsData: {
                isLogButtonPressed: false,
            },
        });
        wrapper.vm.handleNumpadInput(1);
        wrapper.vm.addOperation('+');
        wrapper.vm.handleNumpadInput(2);
        wrapper.vm.calculate();

        wrapper.vm.ansButtonPressed()
        wrapper.vm.calculate();


        expect(wrapper.vm.screenValue).toBe('3');
    });


});
