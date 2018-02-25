<?php
namespace Flarumx\UserExtraInfo\Listeners;

use Flarum\Event\ConfigureWebApp;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets {
	public function subscribe(Dispatcher $events) {
		$events->listen(ConfigureWebApp::class, [$this, 'configAssets']);
	}

	public function configAssets(ConfigureWebApp $event) {
		if($event->isForum()) {
			$event->addAssets(__DIR__.'/../../js/forum/dist/extension.js');
			$event->addBootstrapper('flarumx/ext-user-extra-info/main');
		}
	}
}
