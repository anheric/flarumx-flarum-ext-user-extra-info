<?php namespace Flarumx\UserExtraInfo\Listeners;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Serializer\UserSerializer;
class LoadSettingsFromDatabase
{
	protected $settings;

	public function __construct(SettingsRepositoryInterface $settings) {
		$this->settings = $settings;
	}

	public function subscribe(Dispatcher $events) {
		$events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
	}

	public function prepareApiAttributes(PrepareApiAttributes $event) {
		// if ($event->isSerializer(ForumSerializer::class)) {
		// 	$event->attributes['flarumx.jobTitlename'] = $this->settings->get('flarumx.jobTitlename');
		// }
		if ($event->isSerializer(UserSerializer::class)) {
			// $canEditMoney = $event->actor->can('edit_money', $event->model);
			$event->attributes['jobTitle'] = $event->model->job_title;
		}
	}
}
