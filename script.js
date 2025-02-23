import { Form } from '/components/Form.js';

document.addEventListener("DOMContentLoaded", () => {
    const formComponent = new Form();
    const main = document.querySelector('main');
    formComponent.render(main);
});
