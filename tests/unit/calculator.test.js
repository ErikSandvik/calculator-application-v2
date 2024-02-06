import {describe, it, expect} from 'vitest';
import CalculatorPageView from "@/views/CalculatorPageView.vue";
import Calculator from "@/components/Calculator.vue";
import {mount} from '@vue/test-utils';

describe('Calculator', () => {
    it('should render correctly', () => {
        const wrapper = mount(Calculator)

    })
})