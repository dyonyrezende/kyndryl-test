import { shallowMount } from '@vue/test-utils';
import NewUserForm from '../../src/components/ui/NewUserForm.vue';


describe('NewUserForm component tests: ', () => {

    const wrapper = shallowMount(NewUserForm, {
        propsData: {
        showModal: true
        }
    })

    test('Component render', async () => {

        const newUserForm = wrapper.find('#new-user-form')
    
        expect(newUserForm.isVisible())
    });

    test('Form Validation', async () => {

        const input = wrapper.find('#new-user-name');
        input.setValue('');

        const createUserButton = wrapper.find('#create-user')
        await createUserButton.trigger('click')

        const userNameError = wrapper.find('#username-error');
    
        expect(userNameError.isVisible())
    });



    test('Closing Form', async () => {

        await wrapper.find('#btn-close').trigger('click')

        const newUserForm = wrapper.find('#new-user-form')

        expect(!newUserForm.exists())
    });

});