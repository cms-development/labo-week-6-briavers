<?php

namespace Drupal\my_best_friends\Entity;

use Drupal\views\EntityViewsData;

/**
 * Provides Views data for Best Friends entities.
 */
class FriendsViewsData extends EntityViewsData {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    // Additional information for Views integration, such as table joins, can be
    // put here.

    return $data;
  }

}
