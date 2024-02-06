import { createApp } from 'vue';
import { createStore } from 'vuex';
import {describe, it, expect} from "vitest";
import ContactForm from '@/components/ContactForm.vue';
import { mount } from '@vue/test-utils';

const store = createStore({
    state: {
        formData: {
            name: '',
            email: '',
            message: '',
        },
    },
    getters: {
        formData: (state) => state.formData,
    },
    mutations: {
        setFormData(state, payload) {
            state.formData = payload;
        },
    },
    actions: {},
});

describe('ContactForm.vue', () => {
    it('should render correctly', () => {
        const app = createApp(ContactForm).use(store);
        const wrapper = mount(app)
        expect(wrapper.html()).toMatchSnapshot();
    })



})

