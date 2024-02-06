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

    it('adds numbers correctly', () => {
        const wrapper = shallowMount(Calculator, {
            propsData: {
                isLogButtonPressed: false,
            },
        });
        // Simulate button clicks to add numbers
        wrapper.vm.handleNumpadInput(1);
        wrapper.vm.handleNumpadInput(2);
        wrapper.vm.handleNumpadInput(3);
        // Check if the screen value is updated correctly
        expect(wrapper.vm.screenValue).toBe('123');
    });

    it('performs addition correctly', () => {
        const wrapper = shallowMount(Calculator, {
            propsData: {
                isLogButtonPressed: false,
            },
        });
        wrapper.vm.handleNumpadInput(1);
        wrapper.vm.handleNumpadInput(2);
        wrapper.vm.addOperation('+');
        wrapper.vm.handleNumpadInput(3);
        wrapper.vm.calculate();
        expect(wrapper.vm.screenValue).toBe('15');
    });


});
