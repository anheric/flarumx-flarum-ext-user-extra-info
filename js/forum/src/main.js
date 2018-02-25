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

app.initializers.add('flarumx-flarum-ext-user-extra-info', function () {
	// remove change password and change email buttons from profile settings
	extend(SettingsPage.prototype, 'settingsItems', function(items) {
		items.remove('account')
	})

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
