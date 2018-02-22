<?php
namespace Flarumx\UserExtraInfo;

use Illuminate\Contracts\Events\Dispatcher;

// dd(class_exists(\Flarumx\UserExtraInfo\Listeners\WhatIsLove::class));

return function (Dispatcher $events) {
	$events->subscribe(\Flarumx\UserExtraInfo\Listeners\WhatIsLove::class);
};
