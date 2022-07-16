import { mount } from "@vue/test-utils";
import TodoApp from "./AboutView.vue";

test("renders a todo", () => {
    const wrapper = mount(TodoApp);
    const todo = wrapper.get('[data-test="todo"]');
    expect(todo.text()).toBe("Learn Vue.js 3");
});
