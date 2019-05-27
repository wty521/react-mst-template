import request from 'superagent';

export default request
    .agent()
    .set('x-requested-with', 'XMLHttpRequest');