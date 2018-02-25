'use strict';

System.register('flarumx/ext-user-extra-info/main', ['flarum/app', 'flarum/models/User', 'flarum/components/UserCard', 'flarum/helpers/icon', 'flarum/Model', 'flarum/extend', 'flarum/components/Post', 'flarum/components/PostUser', 'flarum/helpers/avatar', 'flarum/helpers/username', 'flarum/helpers/userOnline', 'flarum/helpers/listItems', 'flarum/components/SettingsPage'], function (_export, _context) {
	"use strict";

	var app, User, UserCard, icon, Model, extend, Post, PostUser, avatar, username, userOnline, listItems, SettingsPage;
	return {
		setters: [function (_flarumApp) {
			app = _flarumApp.default;
		}, function (_flarumModelsUser) {
			User = _flarumModelsUser.default;
		}, function (_flarumComponentsUserCard) {
			UserCard = _flarumComponentsUserCard.default;
		}, function (_flarumHelpersIcon) {
			icon = _flarumHelpersIcon.default;
		}, function (_flarumModel) {
			Model = _flarumModel.default;
		}, function (_flarumExtend) {
			extend = _flarumExtend.extend;
		}, function (_flarumComponentsPost) {
			Post = _flarumComponentsPost.default;
		}, function (_flarumComponentsPostUser) {
			PostUser = _flarumComponentsPostUser.default;
		}, function (_flarumHelpersAvatar) {
			avatar = _flarumHelpersAvatar.default;
		}, function (_flarumHelpersUsername) {
			username = _flarumHelpersUsername.default;
		}, function (_flarumHelpersUserOnline) {
			userOnline = _flarumHelpersUserOnline.default;
		}, function (_flarumHelpersListItems) {
			listItems = _flarumHelpersListItems.default;
		}, function (_flarumComponentsSettingsPage) {
			SettingsPage = _flarumComponentsSettingsPage.default;
		}],
		execute: function () {

			app.initializers.add('flarumx-flarum-ext-user-extra-info', function () {
				// remove change password and change email buttons from profile settings
				extend(SettingsPage.prototype, 'settingsItems', function (items) {
					items.remove('account');
				});

				PostUser.prototype.view = function () {
					var post = this.props.post;
					var user = post.user();

					if (!user) {
						return m(
							'div',
							{ className: 'PostUser' },
							' -first',
							m(
								'h3',
								null,
								avatar(user, { className: 'PostUser-avatar' }),
								' ',
								username(user)
							)
						);
					}

					var card = '';

					if (!post.isHidden() && this.cardVisible) {
						card = UserCard.component({
							user: user,
							className: 'UserCard--popover',
							controlsButtonClassName: 'Button Button--icon Button--flat'
						});
					}

					return m(
						'div',
						{ className: 'PostUser' },
						userOnline(user),
						m(
							'h3',
							null,
							m(
								'a',
								{ href: app.route.user(user), config: m.route },
								avatar(user, { className: 'PostUser-avatar' }),
								' ',
								username(user)
							)
						),
						'\xA0',
						' | ',
						icon('briefcase'),
						' ' + user.data.attributes['jobTitle'] + ' |',
						m(
							'ul',
							{ className: 'PostUser-badges badges' },
							listItems(user.badges().toArray())
						),
						card
					);
				};

				User.prototype.views = Model.attribute('views');
				extend(UserCard.prototype, 'infoItems', function (items) {
					var user = this.props.user;

					items.add('job-title', m(
						'span',
						null,
						icon('briefcase'),
						' ' + user.data.attributes['jobTitle']
					));
				});
			});
		}
	};
});