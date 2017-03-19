export function initialize (application) {
  application.inject('route', 'storage', 'service:storage');
  application.inject('controller', 'storage', 'service:storage');
}

export default {
  name: 'storage',
  initialize
};
