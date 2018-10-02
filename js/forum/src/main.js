import app from 'flarum/app';
import User from 'flarum/models/User';
import UserCard from 'flarum/components/UserCard';
import icon from 'flarum/helpers/icon';
import Model from 'flarum/Model';
import { extend } from 'flarum/extend';
import Post from 'flarum/components/Post';
import PostUser from 'flarum/components/PostUser';

import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import userOnline from 'flarum/helpers/userOnline';
import listItems from 'flarum/helpers/listItems';
import SettingsPage from 'flarum/components/SettingsPage';
import LogInModal from 'flarum/components/LogInModal';


import Modal from 'flarum/components/Modal';
// import ForgotPasswordModal from 'flarum/components/ForgotPasswordModal';
import SignUpModal from 'flarum/components/SignUpModal';
import Alert from 'flarum/components/Alert';
import Button from 'flarum/components/Button';
import LogInButtons from 'flarum/components/LogInButtons';
import extractText from 'flarum/utils/extractText';



app.initializers.add('flarumx-flarum-ext-user-extra-info', function () {
	// remove change password and change email buttons from profile settings
	extend(SettingsPage.prototype, 'settingsItems', function(items) {
		items.remove('account')
	})

	LogInModal.prototype.content = function() {
		return [
			<div className="Modal-body">
				<LogInButtons />

				<div className="Form Form--centered">
					<div className="Form-group">
						<input className="FormControl" name="identification" type="text" placeholder={extractText(app.translator.trans('core.forum.log_in.username_or_email_placeholder'))}
							bidi={this.identification}
							disabled={this.loading} />
					</div>

					<div className="Form-group">
						<input className="FormControl" name="password" type="password" placeholder={extractText(app.translator.trans('core.forum.log_in.password_placeholder'))}
							bidi={this.password}
							disabled={this.loading} />
					</div>

					<div className="Form-group">
						<div>
							<label className="checkbox">
								<input type="checkbox" bidi={this.remember} disabled={this.loading} />
								{app.translator.trans('core.forum.log_in.remember_me_label')}
							</label>
						</div>
					</div>

					<div className="Form-group">
						{Button.component({
							className: 'Button Button--primary Button--block',
							type: 'submit',
							loading: this.loading,
							children: app.translator.trans('core.forum.log_in.submit_button')
						})}
					</div>
				</div>
			</div>,
			<div className="Modal-footer">
				<p>
					<a href="https://www.aviationsafetyplatform.com/register#individual">Register</a>
				</p>
			</div>
		];
	}

	PostUser.prototype.view = function() {
		const post = this.props.post;
		const user = post.user();

		if (!user) {
			return (
				<div className="PostUser"> -first
					<h3>{avatar(user, { className: 'PostUser-avatar' })} {username(user)}</h3>
				</div>
			);
		}

		let card = '';

		if (!post.isHidden() && this.cardVisible) {
			card = UserCard.component({
				user,
				className: 'UserCard--popover',
				controlsButtonClassName: 'Button Button--icon Button--flat'
			});
		}

		return (
			<div className="PostUser">
				{userOnline(user)}
				<h3>
					<a href={app.route.user(user)} config={m.route}>
						{avatar(user, { className: 'PostUser-avatar' })}{' '}{username(user)}
					</a>
				</h3>

				&nbsp;{' | '}
				{icon('briefcase')}
				{' ' + user.data.attributes['jobTitle'] + ' |'}

				<ul className="PostUser-badges badges">
					{listItems(user.badges().toArray())}
				</ul>
				{card}
			</div>
		);
	}

	User.prototype.views = Model.attribute('views');
	extend(UserCard.prototype, 'infoItems', function (items) {
		const user = this.props.user;

		items.add('job-title', (
			<span>
				{icon('briefcase')}
				{' ' + user.data.attributes['jobTitle']}
			</span>
		));
	});
});
