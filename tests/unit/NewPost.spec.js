import { shallowMount } from '@vue/test-utils';
import NewPost from '../../src/components/posts/NewPost.vue';


describe('NewPost component tests: ', () => {

    const wrapper = shallowMount(NewPost, {
        propsData: {
            userId: '2194',
            userName: "Deepan Nayar PhD"
        }
    })

    test('Component render', async () => {

        const newUserForm = wrapper.find('#new-post-container')
    
        expect(newUserForm.isVisible())
    });

    test('Form Validation', async () => {

        const input = wrapper.find('#post-title');
        input.setValue('');

        const createPostButton = wrapper.find('#new-post-btn')
        await createPostButton.trigger('click')

        const titleError = wrapper.find('#title-error');
    
        expect(titleError.isVisible())
    });


});