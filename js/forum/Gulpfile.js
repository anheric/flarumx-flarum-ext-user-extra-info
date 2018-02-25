var flarum = require('flarum-gulp');

flarum({
	modules: {
		'flarumx/ext-user-extra-info': ['src/**/*.js']
	}
});
