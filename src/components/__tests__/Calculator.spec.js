import {describe, it, expect} from 'vitest';
import Calculator from '../Calculator.vue';
import {mount} from '@vue/test-utils'

describe('Calculator', () => {
    it('should render correctly', () => {
        const wrapper = mount(Calculator)
        expect(wrapper.html()).toMatchSnapshot()
    })
})