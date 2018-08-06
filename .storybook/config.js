import { configure } from '@storybook/react';

// automatically import all nested .story.js files
const req = require.context('../stories', true, /.story.js$/);
function loadStories() {
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);