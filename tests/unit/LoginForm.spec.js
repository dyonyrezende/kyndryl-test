import { shallowMount } from '@vue/test-utils';
import LoginForm from '../../src/components/ui/LoginForm.vue';


describe('LoginForm component tests: ', () => {

    const wrapper = shallowMount(LoginForm) 

    test('Renders buttons', () => {


        const btnLogin = wrapper.find('#btn-login');
        const btnNewUser = wrapper.find('#btn-new-user');
    
        expect(btnLogin.isVisible() && btnNewUser.isVisible())
    });

    test('Invalid email or userId', () => {


        wrapper.find('#userId').setValue('2313');
        wrapper.find('#userEmail').setValue('');

        wrapper.find('#btn-login').trigger('click');

        const errorDiv = wrapper.find('#email-id-error');

        expect(errorDiv.exists());

    })

    test('Load create user form', async () => {
        wrapper.find('#btn-new-user').trigger('click')

        const newUserForm = wrapper.find('#new-user-form')

        expect(newUserForm.exists());

    })
});