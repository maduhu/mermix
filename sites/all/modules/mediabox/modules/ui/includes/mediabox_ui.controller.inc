<?php

/**
 * Mediabox display controller class.
 */
class MediaboxDisplayController extends EntityAPIController {

  public function create(array $values = array()) {
    global $user;

    $values += array(
      'title' => '',
      'alternate_text' => '',
      'crop_id' => '',
      'meta_dimensions' => '0x0',
      'created' => REQUEST_TIME,
      'modified' => REQUEST_TIME,
      'user_id' => $user->uid,
    );

    return parent::create($values);
  }

}
