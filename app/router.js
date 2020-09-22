import EmberRouter from '@ember/routing/router';
import config from 'graphics/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

/**
 * Defining the route where the diagram is rendered
 * The template graph is rendered for the path /
 */
Router.map(function() {
    this.route('graph', { path: '/'});
});
