import { shallowMount } from '@vue/test-utils';
import PostComment from '../../src/components/posts/PostComment.vue';


describe('PostComment component tests: ', () => {

    const wrapper = shallowMount(PostComment, {
        propsData: {
            body: 'conteudo para testar componente de comentario',
            userName: 'Joao Silva'
        }
    }) 

    test('Component Render', () => {

        const componentContainer = wrapper.find('#comment-container');

        expect(componentContainer.isVisible())
    });

    test('Comment content has render', async () => {

        const userName = wrapper.find('#user-name');

        const commentContent = wrapper.find('#comment-content');
        
        expect(userName.isVisible() && commentContent.isVisible())

    });

});