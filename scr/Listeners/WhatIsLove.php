<?php
namespace Flarumx\UserExtraInfo\Listeners;

use Flarum\Event\PostWillBeSaved;
use Illuminate\Contracts\Events\Dispatcher;

class WhatIsLove {
	public function subscribe(Dispatcher $events) {
		$events->listen(PostWillBeSaved::class, [$this, 'execute']);
	}

	public function execute(PostWillBeSaved $event) {
		$event->post->content = 'Baby don\'t hurt me';
	}
}
