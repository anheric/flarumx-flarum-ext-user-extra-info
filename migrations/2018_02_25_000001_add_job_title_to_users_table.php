<?php
use Flarum\Database\Migration;
return Migration::addColumns('users', [
	'job_title' => ['string', 'length' => 255, 'nullable' => true]
]);
