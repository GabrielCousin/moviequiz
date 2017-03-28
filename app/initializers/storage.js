export function initialize (application) {
  application.inject('route', 'storage', 'service:storage');
}

export default {
  name: 'storage',
  initialize
};
