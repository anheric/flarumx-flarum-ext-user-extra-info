'use strict';

System.register('flarumx/ext-user-extra-info/main', ['flarum/app', 'flarum/models/User', 'flarum/components/UserCard', 'flarum/helpers/icon', 'flarum/Model', 'flarum/extend', 'flarum/components/Post', 'flarum/components/PostUser', 'flarum/helpers/avatar', 'flarum/helpers/username', 'flarum/helpers/userOnline', 'flarum/helpers/listItems', 'flarum/components/SettingsPage', 'flarum/components/LogInModal', 'flarum/components/Modal', 'flarum/components/SignUpModal', 'flarum/components/Alert', 'flarum/components/Button', 'flarum/components/LogInButtons', 'flarum/utils/extractText'], function (_export, _context) {
	"use strict";

	var app, User, UserCard, icon, Model, extend, Post, PostUser, avatar, username, userOnline, listItems, SettingsPage, LogInModal, Modal, SignUpModal, Alert, Button, LogInButtons, extractText;
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
		}, function (_flarumComponentsLogInModal) {
			LogInModal = _flarumComponentsLogInModal.default;
		}, function (_flarumComponentsModal) {
			Modal = _flarumComponentsModal.default;
		}, function (_flarumComponentsSignUpModal) {
			SignUpModal = _flarumComponentsSignUpModal.default;
		}, function (_flarumComponentsAlert) {
			Alert = _flarumComponentsAlert.default;
		}, function (_flarumComponentsButton) {
			Button = _flarumComponentsButton.default;
		}, function (_flarumComponentsLogInButtons) {
			LogInButtons = _flarumComponentsLogInButtons.default;
		}, function (_flarumUtilsExtractText) {
			extractText = _flarumUtilsExtractText.default;
		}],
		execute: function () {

			app.initializers.add('flarumx-flarum-ext-user-extra-info', function () {
				// remove change password and change email buttons from profile settings
				extend(SettingsPage.prototype, 'settingsItems', function (items) {
					items.remove('account');
				});

				LogInModal.prototype.content = function () {
					return [m(
						'div',
						{ className: 'Modal-body' },
						m(LogInButtons, null),
						m(
							'div',
							{ className: 'Form Form--centered' },
							m(
								'div',
								{ className: 'Form-group' },
								m('input', { className: 'FormControl', name: 'identification', type: 'text', placeholder: extractText(app.translator.trans('core.forum.log_in.username_or_email_placeholder')),
									bidi: this.identification,
									disabled: this.loading })
							),
							m(
								'div',
								{ className: 'Form-group' },
								m('input', { className: 'FormControl', name: 'password', type: 'password', placeholder: extractText(app.translator.trans('core.forum.log_in.password_placeholder')),
									bidi: this.password,
									disabled: this.loading })
							),
							m(
								'div',
								{ className: 'Form-group' },
								m(
									'div',
									null,
									m(
										'label',
										{ className: 'checkbox' },
										m('input', { type: 'checkbox', bidi: this.remember, disabled: this.loading }),
										app.translator.trans('core.forum.log_in.remember_me_label')
									)
								)
							),
							m(
								'div',
								{ className: 'Form-group' },
								Button.component({
									className: 'Button Button--primary Button--block',
									type: 'submit',
									loading: this.loading,
									children: app.translator.trans('core.forum.log_in.submit_button')
								})
							)
						)
					), m(
						'div',
						{ className: 'Modal-footer' },
						m(
							'p',
							null,
							m(
								'a',
								{ href: '#' },
								'Register'
							)
						)
					)];
				};

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
			// import ForgotPasswordModal from 'flarum/components/ForgotPasswordModal';
		}
	};
});